import type { ShowFilters } from './types'

export const showKeys = {
  all: ['shows'] as const,
  lists: () => [...showKeys.all, 'list'] as const,
  list: (filters?: ShowFilters) => [...showKeys.lists(), filters] as const,
  details: () => [...showKeys.all, 'detail'] as const,
  detail: (id: string) => [...showKeys.details(), id] as const,
  featured: () => [...showKeys.all, 'featured'] as const,
}
