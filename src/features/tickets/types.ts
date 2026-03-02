export type TicketStatus = 'upcoming' | 'past' | 'cancelled'

export interface Ticket {
  id: string
  showId: string
  showTitle: string
  circusName: string
  imageUrl: string
  date: string
  time: string
  location: string
  quantity: number
  totalPrice: number
  status: TicketStatus
  qrCode: string
  purchasedAt: string
  seatSection?: string
}
