export interface ItineraryStop {
  id: string
  city: string
  state: string
  startDate: string // ISO date
  endDate: string // ISO date
  venue: string
  status: 'completed' | 'current' | 'upcoming'
  revenue?: number
  ticketsSold?: number
  capacity?: number
}

export interface CircusProfile {
  id: string
  name: string
  description: string
  logoUrl: string
  coverUrl: string
  city: string
  foundedYear: number
  rating: number
  reviewCount: number
  totalShows: number
  activeShows: number
  totalSales: number
  monthlyRevenue: number
  // Itinerary
  currentCity: string
  currentState: string
  daysInCurrentCity: number
  daysRemainingInCity: number
  nextCity: string
  nextState: string
  itinerary: ItineraryStop[]
}

export interface CityRevenue {
  city: string
  state: string
  revenue: number
  tickets: number
}

export interface ShowPerformance {
  showTitle: string
  category: string
  revenue: number
  tickets: number
  avgOccupancy: number
}

export interface WeekdayOccupancy {
  day: string
  shortDay: string
  occupancy: number
  shows: number
}

export interface CircusStats {
  totalRevenue: number
  ticketsSold: number
  activeShows: number
  averageRating: number
  revenueChange: number
  ticketsChange: number
  showsChange: number
  ratingChange: number
  // Extended analytics
  avgOccupancy: number
  totalCities: number
  revenueByCity: CityRevenue[]
  showPerformance: ShowPerformance[]
  weekdayOccupancy: WeekdayOccupancy[]
  ticketTypeBreakdown: {
    pista: number
    vip: number
    camarote: number
  }
}

export interface Sale {
  id: string
  showTitle: string
  buyerName: string
  quantity: number
  totalPrice: number
  date: string
  status: 'completed' | 'refunded' | 'pending'
  ticketType?: 'pista' | 'vip' | 'camarote'
  city?: string
}

export type SalesPeriod = '7d' | '30d' | '90d' | 'all'
