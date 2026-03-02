import { useQuery } from '@tanstack/react-query'
import { fetchCircusProfile, fetchCircusStats, fetchSales } from './api'
import { circusKeys } from './keys'
import type { SalesPeriod } from './types'

export function useCircusProfile() {
  return useQuery({
    queryKey: circusKeys.profile(),
    queryFn: fetchCircusProfile,
  })
}

export function useCircusStats() {
  return useQuery({
    queryKey: circusKeys.stats(),
    queryFn: fetchCircusStats,
  })
}

export function useSales(period?: SalesPeriod) {
  return useQuery({
    queryKey: circusKeys.sales(period),
    queryFn: () => fetchSales(period),
    placeholderData: [],
  })
}
