import { mockShows } from '../../mocks/shows'
import { delay } from '../../mocks/delay'
import type { Show, ShowFilters } from './types'

export async function fetchShows(filters?: ShowFilters): Promise<Show[]> {
  await delay()
  let results = [...mockShows]

  if (filters?.category) {
    results = results.filter((s) => s.category === filters.category)
  }
  if (filters?.city) {
    results = results.filter((s) =>
      s.city.toLowerCase().includes(filters.city!.toLowerCase())
    )
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.circusName.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    )
  }
  if (filters?.featured) {
    results = results.filter((s) => s.isFeatured)
  }

  return results
}

export async function fetchShow(id: string): Promise<Show | undefined> {
  await delay()
  return mockShows.find((s) => s.id === id)
}

export async function fetchFeaturedShows(): Promise<Show[]> {
  await delay()
  return mockShows.filter((s) => s.isFeatured)
}
