import type { CircusStats } from '../../../features/circus/types'

export const pipocaAlegriaStats: CircusStats = {
  totalRevenue: 4200,
  ticketsSold: 350,
  activeShows: 3,
  averageRating: 4.5,
  revenueChange: 10.2,
  ticketsChange: 7.5,
  showsChange: 0,
  ratingChange: 0.2,
  avgOccupancy: 78,
  totalCities: 3,
  revenueByCity: [
    { city: 'São Paulo', state: 'SP', revenue: 4200, tickets: 350 },
    { city: 'São Bernardo', state: 'SP', revenue: 3200, tickets: 280 },
    { city: 'Santo André', state: 'SP', revenue: 2800, tickets: 240 },
  ],
  showPerformance: [
    { showTitle: 'Cirquinho dos Sonhos', category: 'infantil', revenue: 1800, tickets: 160, avgOccupancy: 85 },
    { showTitle: 'Festival de Cores', category: 'musical', revenue: 1400, tickets: 110, avgOccupancy: 76 },
    { showTitle: 'Noite da Magia', category: 'magica', revenue: 1000, tickets: 80, avgOccupancy: 72 },
  ],
  weekdayOccupancy: [
    { day: 'Segunda', shortDay: 'Seg', occupancy: 0, shows: 0 },
    { day: 'Terça', shortDay: 'Ter', occupancy: 0, shows: 0 },
    { day: 'Quarta', shortDay: 'Qua', occupancy: 45, shows: 1 },
    { day: 'Quinta', shortDay: 'Qui', occupancy: 52, shows: 1 },
    { day: 'Sexta', shortDay: 'Sex', occupancy: 78, shows: 2 },
    { day: 'Sábado', shortDay: 'Sáb', occupancy: 95, shows: 3 },
    { day: 'Domingo', shortDay: 'Dom', occupancy: 92, shows: 3 },
  ],
  ticketTypeBreakdown: { pista: 240, vip: 80, camarote: 30 },
}
