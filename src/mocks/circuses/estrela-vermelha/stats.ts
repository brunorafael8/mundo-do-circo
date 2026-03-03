import type { CircusStats } from '../../../features/circus/types'

export const estrelaVermelhaStats: CircusStats = {
  totalRevenue: 6200,
  ticketsSold: 420,
  activeShows: 3,
  averageRating: 4.7,
  revenueChange: 12.5,
  ticketsChange: 8.3,
  showsChange: 0,
  ratingChange: 0.1,
  avgOccupancy: 84,
  totalCities: 3,
  revenueByCity: [
    { city: 'São Paulo', state: 'SP', revenue: 6200, tickets: 420 },
    { city: 'Guarulhos', state: 'SP', revenue: 5400, tickets: 310 },
    { city: 'Osasco', state: 'SP', revenue: 3800, tickets: 218 },
  ],
  showPerformance: [
    { showTitle: 'O Grande Espetáculo', category: 'acrobacia', revenue: 2800, tickets: 180, avgOccupancy: 92 },
    { showTitle: 'Palhaços em Cena', category: 'palhaco', revenue: 1900, tickets: 140, avgOccupancy: 82 },
    { showTitle: 'Malabaristas do Mundo', category: 'malabarismo', revenue: 1500, tickets: 100, avgOccupancy: 78 },
  ],
  weekdayOccupancy: [
    { day: 'Segunda', shortDay: 'Seg', occupancy: 0, shows: 0 },
    { day: 'Terça', shortDay: 'Ter', occupancy: 0, shows: 0 },
    { day: 'Quarta', shortDay: 'Qua', occupancy: 55, shows: 1 },
    { day: 'Quinta', shortDay: 'Qui', occupancy: 62, shows: 1 },
    { day: 'Sexta', shortDay: 'Sex', occupancy: 85, shows: 2 },
    { day: 'Sábado', shortDay: 'Sáb', occupancy: 96, shows: 3 },
    { day: 'Domingo', shortDay: 'Dom', occupancy: 92, shows: 2 },
  ],
  ticketTypeBreakdown: { pista: 280, vip: 98, camarote: 42 },
}
