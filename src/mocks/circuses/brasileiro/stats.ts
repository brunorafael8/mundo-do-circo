import type { CircusStats } from '../../../features/circus/types'

export const brasileiroStats: CircusStats = {
  totalRevenue: 5800,
  ticketsSold: 460,
  activeShows: 3,
  averageRating: 4.7,
  revenueChange: 16.8,
  ticketsChange: 12.4,
  showsChange: 0,
  ratingChange: 0.2,
  avgOccupancy: 86,
  totalCities: 3,
  revenueByCity: [
    { city: 'Barueri', state: 'SP', revenue: 5800, tickets: 460 },
    { city: 'Osasco', state: 'SP', revenue: 4800, tickets: 340 },
    { city: 'Santo André', state: 'SP', revenue: 2600, tickets: 180 },
  ],
  showPerformance: [
    { showTitle: 'Capoeira no Picadeiro', category: 'acrobacia', revenue: 2600, tickets: 200, avgOccupancy: 92 },
    { showTitle: 'Samba Circense', category: 'musical', revenue: 1900, tickets: 150, avgOccupancy: 84 },
    { showTitle: 'Raízes - Forró & Acrobacia', category: 'malabarismo', revenue: 1300, tickets: 110, avgOccupancy: 78 },
  ],
  weekdayOccupancy: [
    { day: 'Segunda', shortDay: 'Seg', occupancy: 0, shows: 0 },
    { day: 'Terça', shortDay: 'Ter', occupancy: 42, shows: 1 },
    { day: 'Quarta', shortDay: 'Qua', occupancy: 58, shows: 1 },
    { day: 'Quinta', shortDay: 'Qui', occupancy: 68, shows: 2 },
    { day: 'Sexta', shortDay: 'Sex', occupancy: 90, shows: 3 },
    { day: 'Sábado', shortDay: 'Sáb', occupancy: 98, shows: 3 },
    { day: 'Domingo', shortDay: 'Dom', occupancy: 94, shows: 2 },
  ],
  ticketTypeBreakdown: { pista: 310, vip: 108, camarote: 42 },
}
