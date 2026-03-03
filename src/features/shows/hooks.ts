import { useQuery } from '@tanstack/react-query'
import { fetchShows, fetchShow, fetchFeaturedShows } from './api'
import { showKeys } from './keys'
import type { ShowFilters } from './types'

// Cache config: 5 minutos stale, 10 minutos garbage collection
const CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
}

export function useShows(filters?: ShowFilters) {
  return useQuery({
    queryKey: showKeys.list(filters),
    queryFn: () => fetchShows(filters),
    placeholderData: [],
    ...CACHE_CONFIG,
  })
}

export function useShow(id: string) {
  return useQuery({
    queryKey: showKeys.detail(id),
    queryFn: () => fetchShow(id),
    enabled: !!id,
    ...CACHE_CONFIG,
  })
}

export function useFeaturedShows() {
  return useQuery({
    queryKey: showKeys.featured(),
    queryFn: fetchFeaturedShows,
    placeholderData: [],
    ...CACHE_CONFIG,
  })
}
