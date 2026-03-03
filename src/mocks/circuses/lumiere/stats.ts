import type { CircusStats } from '../../../features/circus/types'

export const lumiereStats: CircusStats = {
  totalRevenue: 12400,
  ticketsSold: 580,
  activeShows: 3,
  averageRating: 4.9,
  revenueChange: 18.5,
  ticketsChange: 15.2,
  showsChange: 0,
  ratingChange: 0.1,
  avgOccupancy: 89,
  totalCities: 3,
  revenueByCity: [
    { city: 'São Paulo', state: 'SP', revenue: 12400, tickets: 580 },
    { city: 'Santos', state: 'SP', revenue: 11200, tickets: 520 },
    { city: 'Curitiba', state: 'PR', revenue: 9800, tickets: 410 },
  ],
  showPerformance: [
    { showTitle: 'Voando Alto', category: 'aereo', revenue: 5200, tickets: 240, avgOccupancy: 94 },
    { showTitle: 'Corpos em Movimento', category: 'acrobacia', revenue: 4100, tickets: 200, avgOccupancy: 88 },
    { showTitle: 'Dança das Sombras', category: 'musical', revenue: 3100, tickets: 140, avgOccupancy: 82 },
  ],
  weekdayOccupancy: [
    { day: 'Segunda', shortDay: 'Seg', occupancy: 0, shows: 0 },
    { day: 'Terça', shortDay: 'Ter', occupancy: 0, shows: 0 },
    { day: 'Quarta', shortDay: 'Qua', occupancy: 72, shows: 1 },
    { day: 'Quinta', shortDay: 'Qui', occupancy: 78, shows: 2 },
    { day: 'Sexta', shortDay: 'Sex', occupancy: 92, shows: 3 },
    { day: 'Sábado', shortDay: 'Sáb', occupancy: 98, shows: 3 },
    { day: 'Domingo', shortDay: 'Dom', occupancy: 95, shows: 2 },
  ],
  ticketTypeBreakdown: { pista: 320, vip: 180, camarote: 80 },
}
