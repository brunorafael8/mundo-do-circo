export type ShowCategory =
  | 'acrobacia'
  | 'palhaco'
  | 'magica'
  | 'aereo'
  | 'musical'
  | 'infantil'
  | 'malabarismo'
  | 'fogo'

export interface Show {
  id: string
  title: string
  circusName: string
  circusId: string
  description: string
  category: ShowCategory
  imageUrl: string
  rating: number
  reviewCount: number
  price: number
  dates: ShowDate[]
  location: string
  city: string
  duration: number // minutes
  ageRating: string
  isFeatured: boolean
  capacity: number
  soldCount: number
}

export interface ShowDate {
  id: string
  date: string // ISO date
  time: string // HH:mm
  available: number
}

export interface ShowFilters {
  category?: ShowCategory
  city?: string
  query?: string
  featured?: boolean
  minPrice?: number
  maxPrice?: number
}
