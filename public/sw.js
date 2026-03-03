/**
 * Service Worker - Mundo do Circo PWA
 *
 * Strategies:
 * - Navigation: Network-first + Navigation Preload (always fresh HTML)
 * - Hash-versioned JS/CSS: Cache-first (hash = version, safe to cache forever)
 * - Non-versioned JS/CSS: Network-first with cache fallback
 * - Static assets (images/fonts): Cache-first with size limit
 * - Update: Client-controlled skipWaiting (no race condition)
 * - Offline: Dedicated fallback page
 */

const SW_VERSION = 'v4'
const PRECACHE = `mc-precache-${SW_VERSION}`
const RUNTIME_CACHE = `mc-runtime-${SW_VERSION}`
const IMAGE_CACHE = 'mc-images-v1' // separate lifecycle — survives SW updates
const CURRENT_CACHES = new Set([PRECACHE, RUNTIME_CACHE, IMAGE_CACHE])

const MAX_IMAGE_CACHE_ENTRIES = 100

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
]

// ─── Install ────────────────────────────────────────────────────────
// Pre-cache essential assets. Do NOT call skipWaiting() here to avoid
// version mismatch between old HTML and new SW assets.
self.addEventListener('install', (event) => {
  console.log('[SW] Installing:', SW_VERSION)
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  )
})

// ─── Activate ───────────────────────────────────────────────────────
// Clean old caches, enable Navigation Preload, claim clients.
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating:', SW_VERSION)
  event.waitUntil(
    (async () => {
      // Clean caches from previous versions
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter((name) => !CURRENT_CACHES.has(name))
          .map((name) => {
            console.log('[SW] Deleting old cache:', name)
            return caches.delete(name)
          })
      )

      // Enable Navigation Preload (Chrome, Edge, Firefox 99+)
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable()
      }

      await self.clients.claim()
    })()
  )
})

// ─── Fetch ──────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET
  if (request.method !== 'GET') return

  // Skip cross-origin
  if (url.origin !== self.location.origin) return

  // Skip Metro dev server requests
  if (
    url.pathname.includes('entry.bundle') ||
    url.pathname.startsWith('/node_modules') ||
    url.pathname.includes('hot-update') ||
    url.pathname.includes('symbolicate')
  ) return

  // Skip API calls
  if (url.pathname.startsWith('/api')) return

  // ── Navigation: Network-first + Navigation Preload ──
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Use preloaded response if available (saves SW boot latency)
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            // Cache the fresh response for offline
            const clone = preloadResponse.clone()
            caches.open(PRECACHE).then((c) => c.put('/index.html', clone))
            return preloadResponse
          }

          const response = await fetch(request)
          const clone = response.clone()
          caches.open(PRECACHE).then((c) => c.put('/index.html', clone))
          return response
        } catch {
          // Offline — serve cached shell or offline page
          const cached = await caches.match('/index.html')
          return cached || (await caches.match('/offline.html')) || new Response('Offline', { status: 503 })
        }
      })()
    )
    return
  }

  // ── Hash-versioned JS/CSS: Cache-first (hash IS the version) ──
  if (/\.[a-f0-9]{8,}\.(js|css)$/.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request)
        if (cached) return cached
        const response = await fetch(request)
        if (response.ok) {
          const clone = response.clone()
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone))
        }
        return response
      })()
    )
    return
  }

  // ── Non-versioned JS/CSS: Network-first ──
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request)
          if (response.ok) {
            const clone = response.clone()
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone))
          }
          return response
        } catch {
          return (await caches.match(request)) || new Response('', { status: 503 })
        }
      })()
    )
    return
  }

  // ── Static assets (images, fonts): Cache-first with LRU trim ──
  if (url.pathname.match(/\.(woff2?|ttf|eot|png|jpg|jpeg|svg|gif|ico|webp|otf|avif)$/)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request)
        if (cached) return cached

        try {
          const response = await fetch(request)
          if (response.ok) {
            const clone = response.clone()
            const cache = await caches.open(IMAGE_CACHE)
            await cache.put(request, clone)
            // LRU trim — delete oldest if over limit
            trimCache(IMAGE_CACHE, MAX_IMAGE_CACHE_ENTRIES)
          }
          return response
        } catch {
          return new Response('', { status: 503 })
        }
      })()
    )
    return
  }

  // Default: Network-only
})

// ─── Message handler ────────────────────────────────────────────────
// Client-controlled update: only skipWaiting when the client says so.
self.addEventListener('message', (event) => {
  const message = event.data

  if (message === 'SKIP_WAITING' || message?.type === 'SKIP_WAITING') {
    console.log('[SW] Client requested skipWaiting')
    self.skipWaiting()
  }

  if (message === 'GET_VERSION' || message?.type === 'GET_VERSION') {
    event.source?.postMessage({ type: 'SW_VERSION', version: SW_VERSION })
  }
})

// ─── Helpers ────────────────────────────────────────────────────────
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  if (keys.length > maxItems) {
    // Delete oldest entries (first in = first out)
    const toDelete = keys.length - maxItems
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i])
    }
  }
}
