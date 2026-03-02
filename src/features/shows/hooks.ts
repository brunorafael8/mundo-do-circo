import { useQuery } from '@tanstack/react-query'
import { fetchShows, fetchShow, fetchFeaturedShows } from './api'
import { showKeys } from './keys'
import type { ShowFilters } from './types'

export function useShows(filters?: ShowFilters) {
  return useQuery({
    queryKey: showKeys.list(filters),
    queryFn: () => fetchShows(filters),
    placeholderData: [],
  })
}

export function useShow(id: string) {
  return useQuery({
    queryKey: showKeys.detail(id),
    queryFn: () => fetchShow(id),
    enabled: !!id,
  })
}

export function useFeaturedShows() {
  return useQuery({
    queryKey: showKeys.featured(),
    queryFn: fetchFeaturedShows,
    placeholderData: [],
  })
}
