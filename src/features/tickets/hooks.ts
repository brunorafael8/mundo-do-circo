import { useQuery } from '@tanstack/react-query'
import { fetchTickets } from './api'
import { ticketKeys } from './keys'
import type { TicketStatus } from './types'

export function useTickets(status?: TicketStatus) {
  return useQuery({
    queryKey: ticketKeys.list(status),
    queryFn: () => fetchTickets(status),
    placeholderData: [],
  })
}
