import type { SalesPeriod } from './types'

export const circusKeys = {
  all: ['circus'] as const,
  profile: () => [...circusKeys.all, 'profile'] as const,
  stats: () => [...circusKeys.all, 'stats'] as const,
  sales: (period?: SalesPeriod) => [...circusKeys.all, 'sales', period] as const,
}
