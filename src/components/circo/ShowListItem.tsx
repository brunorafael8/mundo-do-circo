import { XStack, YStack, Text, Image } from 'tamagui'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowListItemProps {
  show: Show
  onPress?: () => void
}

export function ShowListItem({ show, onPress }: ShowListItemProps) {
  const soldPercentage = Math.round((show.soldCount / show.capacity) * 100)

  return (
    <MCCard pressable onPress={onPress} padding="$3">
      <XStack gap="$3" alignItems="center">
        <Image
          source={{ uri: show.imageUrl }}
          width={60}
          height={60}
          borderRadius={12}
          resizeMode="cover"
        />
        <YStack flex={1} gap="$1">
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontFamily="$heading" fontSize={15} fontWeight="700" flex={1} numberOfLines={1}>
              {show.title}
            </Text>
            <MCBadge
              label={`${soldPercentage}%`}
              variant={soldPercentage > 80 ? 'success' : soldPercentage > 50 ? 'warning' : 'accent'}
            />
          </XStack>
          <Text fontSize={13} color="$textMuted">
            {show.category} - {show.location}
          </Text>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={12} color="$textMuted">
              {show.soldCount}/{show.capacity} vendidos
            </Text>
            <Text fontSize={14} fontWeight="700" color="$primary">
              {formatCurrency(show.price)}
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </MCCard>
  )
}
