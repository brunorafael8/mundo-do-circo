import type { TicketStatus } from './types'

export const ticketKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketKeys.all, 'list'] as const,
  list: (status?: TicketStatus) => [...ticketKeys.lists(), status] as const,
}
