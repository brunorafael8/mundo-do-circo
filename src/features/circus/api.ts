import { mockCircusProfile, mockCircusStats, mockSales } from '../../mocks/circus'
import { delay } from '../../mocks/delay'
import type { CircusProfile, CircusStats, Sale, SalesPeriod } from './types'

export async function fetchCircusProfile(): Promise<CircusProfile> {
  await delay()
  return mockCircusProfile
}

export async function fetchCircusStats(): Promise<CircusStats> {
  await delay()
  return mockCircusStats
}

export async function fetchSales(period?: SalesPeriod): Promise<Sale[]> {
  await delay()
  // Simple mock filtering by period
  const now = new Date()
  const sales = [...mockSales]

  if (!period || period === 'all') return sales

  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  return sales.filter((s) => new Date(s.date) >= cutoff)
}
