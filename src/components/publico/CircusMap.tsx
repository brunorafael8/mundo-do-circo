import { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { YStack } from 'tamagui'
import { MapPin } from '@tamagui/lucide-icons'
import { MCEmptyState } from '../ui/MCEmptyState'
import type { Show } from '../../features/shows/types'

interface CircusMapProps {
  shows: Show[]
  onShowPress?: (show: Show) => void
}

const CATEGORY_EMOJI: Record<string, string> = {
  acrobacia: '\u{1F938}',
  palhaco: '\u{1F921}',
  magica: '\u{1F3A9}',
  aereo: '\u{1F3AD}',
  musical: '\u{1F3B5}',
  infantil: '\u{1F9F8}',
  malabarismo: '\u{1F939}',
  fogo: '\u{1F525}',
}

const CATEGORY_LABEL: Record<string, string> = {
  acrobacia: 'Acrobacia',
  palhaco: 'Palhaço',
  magica: 'Mágica',
  aereo: 'Aéreo',
  musical: 'Musical',
  infantil: 'Infantil',
  malabarismo: 'Malabarismo',
  fogo: 'Fogo',
}

const DEFAULT_CENTER: [number, number] = [-23.548, -46.655]

function formatNextDate(show: Show): string {
  if (!show.dates || show.dates.length === 0) return ''
  const next = show.dates[0]
  const [y, m, d] = next.date.split('-')
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${d} ${months[Number(m) - 1]} · ${next.time}`
}

function CircusMapWeb({ shows, onShowPress }: CircusMapProps) {
  const L = require('leaflet') as typeof import('leaflet')
  const { MapContainer, TileLayer, Marker, Circle, useMap } = require('react-leaflet')

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => {},
      { enableHighAccuracy: false, timeout: 8000 }
    )
  }, [])

  const center = userLocation ?? DEFAULT_CENTER
  const zoom = userLocation ? 15 : 13

  const validShows = shows.filter(
    (s) => typeof s.latitude === 'number' && typeof s.longitude === 'number'
  )

  const handleMarkerClick = useCallback((show: Show) => {
    setSelectedShow((prev) => (prev?.id === show.id ? null : show))
  }, [])

  const dismissSheet = useCallback(() => setSelectedShow(null), [])

  // Smaller markers: 32px
  const createIcon = (category: string, isSelected: boolean) =>
    L.divIcon({
      className: 'circus-marker',
      html: `<div style="
        width:${isSelected ? 44 : 32}px;
        height:${isSelected ? 44 : 32}px;
        border-radius:50%;
        background:${isSelected ? '#1D3557' : '#E63946'};
        border:${isSelected ? '3px solid #FFB800' : '2.5px solid #fff'};
        display:flex;align-items:center;justify-content:center;
        font-size:${isSelected ? 22 : 15}px;
        box-shadow:${isSelected ? '0 0 0 4px rgba(255,184,0,0.3),' : ''} 0 2px 8px rgba(0,0,0,0.25);
        cursor:pointer;
        transition:all 0.2s ease;
      ">${CATEGORY_EMOJI[category] ?? '\u{1F3AA}'}</div>`,
      iconSize: [isSelected ? 44 : 32, isSelected ? 44 : 32],
      iconAnchor: [isSelected ? 22 : 16, isSelected ? 44 : 32],
    })

  const userIcon = L.divIcon({
    className: 'user-marker',
    html: `<div style="
      width:16px;height:16px;border-radius:50%;
      background:#1D3557;border:3px solid #fff;
      box-shadow:0 0 0 3px rgba(29,53,87,0.25), 0 2px 6px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })

  function FlyToUser({ position }: { position: [number, number] }) {
    const map = useMap()
    useEffect(() => {
      map.flyTo(position, 15, { duration: 1.5 })
    }, [map, position])
    return null
  }

  return (
    <YStack flex={1} overflow="hidden" borderRadius="$4" position="relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {userLocation && (
          <>
            <FlyToUser position={userLocation} />
            <Circle
              center={userLocation}
              radius={600}
              pathOptions={{
                color: '#1D3557',
                fillColor: '#1D3557',
                fillOpacity: 0.06,
                weight: 1,
                dashArray: '4 4',
              }}
            />
            <Marker position={userLocation} icon={userIcon} />
          </>
        )}

        {validShows.map((show) => (
          <Marker
            key={show.id}
            position={[show.latitude, show.longitude]}
            icon={createIcon(show.category, selectedShow?.id === show.id)}
            eventHandlers={{ click: () => handleMarkerClick(show) }}
          />
        ))}
      </MapContainer>

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: selectedShow ? 'translateY(0)' : 'translateY(110%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          pointerEvents: selectedShow ? 'auto' : 'none',
        }}
      >
        {/* Dismiss overlay */}
        {selectedShow && (
          <div
            onClick={dismissSheet}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
            }}
          />
        )}

        <div style={{
          margin: '0 12px 12px',
          background: '#FFF8F0',
          borderRadius: 16,
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          {/* Drag handle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 4,
          }}>
            <div style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: 'rgba(0,0,0,0.12)',
            }} />
          </div>

          {selectedShow && (
            <div style={{ padding: '4px 16px 16px' }}>
              {/* Header row */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}>
                {/* Emoji badge */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: '#E6394612',
                  border: '1.5px solid #E6394625',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  flexShrink: 0,
                }}>
                  {CATEGORY_EMOJI[selectedShow.category] ?? '\u{1F3AA}'}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'Kavoon, cursive',
                    fontSize: 17,
                    fontWeight: 400,
                    color: '#1D3557',
                    lineHeight: '22px',
                    marginBottom: 2,
                  }}>
                    {selectedShow.title}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: '#666',
                    marginBottom: 4,
                  }}>
                    {selectedShow.circusName}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#E63946',
                      background: '#E6394612',
                      padding: '2px 8px',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                      {CATEGORY_LABEL[selectedShow.category] ?? selectedShow.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#999' }}>
                      {'\u2B50'} {selectedShow.rating}
                    </span>
                    <span style={{ fontSize: 12, color: '#999' }}>
                      {selectedShow.duration} min
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div style={{
                  textAlign: 'right',
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontSize: 11,
                    color: '#999',
                    marginBottom: 2,
                  }}>
                    a partir de
                  </div>
                  <div style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#1D3557',
                  }}>
                    R${selectedShow.price}
                  </div>
                </div>
              </div>

              {/* Details row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 14,
                padding: '10px 12px',
                background: '#fff',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{'\u{1F4CD}'}</span>
                  <span style={{ fontSize: 12, color: '#555' }}>
                    {selectedShow.location}
                  </span>
                </div>
                <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.08)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{'\u{1F4C5}'}</span>
                  <span style={{ fontSize: 12, color: '#555' }}>
                    {formatNextDate(selectedShow)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onShowPress?.(selectedShow)}
                style={{
                  width: '100%',
                  marginTop: 14,
                  padding: '14px 0',
                  background: '#E63946',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  fontFamily: 'system-ui, sans-serif',
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#c62f3b' }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#E63946' }}
              >
                Ver Espetáculo
              </button>
            </div>
          )}
        </div>
      </div>
    </YStack>
  )
}

export function CircusMap(props: CircusMapProps) {
  if (Platform.OS !== 'web') {
    return (
      <MCEmptyState
        icon={<MapPin size={48} color="$textMuted" />}
        title="Mapa disponível na versão web"
        description="No app nativo, usaremos expo-maps"
      />
    )
  }

  return <CircusMapWeb {...props} />
}
