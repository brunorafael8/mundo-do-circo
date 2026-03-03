import {
  allCircusProfiles,
  allCircusStats,
  allCircusSales,
  estrelaVermelhaProfile,
  estrelaVermelhaStats,
  estrelaVermelhaSales,
} from '../../mocks/circuses'
import { delay } from '../../mocks/delay'
import type { CircusProfile, CircusStats, Sale, SalesPeriod } from './types'

export async function fetchCircusProfile(circusId?: string): Promise<CircusProfile> {
  await delay()
  if (circusId) {
    return allCircusProfiles.find((c) => c.id === circusId) ?? estrelaVermelhaProfile
  }
  return estrelaVermelhaProfile
}

export async function fetchAllCircuses(): Promise<CircusProfile[]> {
  await delay()
  return allCircusProfiles
}

export async function fetchCircusStats(circusId?: string): Promise<CircusStats> {
  await delay()
  if (circusId && allCircusStats[circusId]) {
    return allCircusStats[circusId]
  }
  return estrelaVermelhaStats
}

export async function fetchSales(period?: SalesPeriod, circusId?: string): Promise<Sale[]> {
  await delay()
  const sales = circusId && allCircusSales[circusId]
    ? [...allCircusSales[circusId]]
    : [...estrelaVermelhaSales]

  const now = new Date()

  if (!period || period === 'all') return sales

  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  return sales.filter((s) => new Date(s.date) >= cutoff)
}
