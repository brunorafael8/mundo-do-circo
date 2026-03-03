import { XStack, YStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'
import type { Ticket } from '../../features/tickets/types'

interface TicketCardProps {
  ticket: Ticket
  onPress?: () => void
}

const statusConfig = {
  upcoming: { label: 'Proximo', variant: 'success' as const },
  past: { label: 'Realizado', variant: 'accent' as const },
  cancelled: { label: 'Cancelado', variant: 'error' as const },
}

export function TicketCard({ ticket, onPress }: TicketCardProps) {
  const status = statusConfig[ticket.status]

  return (
    <MCCard pressable onPress={onPress} padding={0} overflow="hidden">
      <XStack>
        <Image
          source={ticket.imageUrl}
          style={{ width: 100, height: 120 }}
          contentFit="cover"
        />
        <YStack flex={1} padding="$3" gap="$1" justifyContent="center">
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontFamily="$heading" fontSize={15} fontWeight="700" flex={1} numberOfLines={1}>
              {ticket.showTitle}
            </Text>
            <MCBadge label={status.label} variant={status.variant} />
          </XStack>
          <Text fontSize={13} color="$textMuted">
            {ticket.circusName}
          </Text>
          <XStack alignItems="center" gap="$2" marginTop="$1">
            <Text fontSize={13} fontWeight="600" color="$accent">
              {formatDate(ticket.date)} - {ticket.time}
            </Text>
          </XStack>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={12} color="$textMuted">
              {ticket.quantity}x ingresso
            </Text>
            <Text fontSize={15} fontWeight="700" color="$primary">
              {formatCurrency(ticket.totalPrice)}
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </MCCard>
  )
}
