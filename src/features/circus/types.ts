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
}

export interface CircusStats {
  totalRevenue: number
  ticketsSold: number
  activeShows: number
  averageRating: number
  revenueChange: number // percentage
  ticketsChange: number
  showsChange: number
  ratingChange: number
}

export interface Sale {
  id: string
  showTitle: string
  buyerName: string
  quantity: number
  totalPrice: number
  date: string
  status: 'completed' | 'refunded' | 'pending'
}

export type SalesPeriod = '7d' | '30d' | '90d' | 'all'
