import { mockTickets } from '../../mocks/tickets'
import { delay } from '../../mocks/delay'
import type { Ticket, TicketStatus } from './types'

export async function fetchTickets(status?: TicketStatus): Promise<Ticket[]> {
  await delay()
  if (status) {
    return mockTickets.filter((t) => t.status === status)
  }
  return [...mockTickets]
}
