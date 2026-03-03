import type { CircusStats } from '../../../features/circus/types'

export const fogoNegroStats: CircusStats = {
  totalRevenue: 7600,
  ticketsSold: 380,
  activeShows: 3,
  averageRating: 4.6,
  revenueChange: 22.1,
  ticketsChange: 18.6,
  showsChange: 50,
  ratingChange: 0.3,
  avgOccupancy: 81,
  totalCities: 3,
  revenueByCity: [
    { city: 'São Paulo', state: 'SP', revenue: 7600, tickets: 380 },
    { city: 'Guarulhos', state: 'SP', revenue: 6200, tickets: 320 },
    { city: 'São Bernardo do Campo', state: 'SP', revenue: 5400, tickets: 280 },
  ],
  showPerformance: [
    { showTitle: 'Fogo & Paixão', category: 'fogo', revenue: 3400, tickets: 160, avgOccupancy: 88 },
    { showTitle: 'Sombras do Circo', category: 'aereo', revenue: 2400, tickets: 120, avgOccupancy: 80 },
    { showTitle: 'Corpo Impossível', category: 'acrobacia', revenue: 1800, tickets: 100, avgOccupancy: 74 },
  ],
  weekdayOccupancy: [
    { day: 'Segunda', shortDay: 'Seg', occupancy: 0, shows: 0 },
    { day: 'Terça', shortDay: 'Ter', occupancy: 0, shows: 0 },
    { day: 'Quarta', shortDay: 'Qua', occupancy: 0, shows: 0 },
    { day: 'Quinta', shortDay: 'Qui', occupancy: 65, shows: 1 },
    { day: 'Sexta', shortDay: 'Sex', occupancy: 88, shows: 2 },
    { day: 'Sábado', shortDay: 'Sáb', occupancy: 96, shows: 3 },
    { day: 'Domingo', shortDay: 'Dom', occupancy: 78, shows: 1 },
  ],
  ticketTypeBreakdown: { pista: 220, vip: 110, camarote: 50 },
}
