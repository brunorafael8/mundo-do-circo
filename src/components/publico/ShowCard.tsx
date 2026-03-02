import { YStack, XStack, Text, Image } from 'tamagui'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { Star } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowCardProps {
  show: Show
  onPress?: () => void
  compact?: boolean
}

export function ShowCard({ show, onPress, compact }: ShowCardProps) {
  if (compact) {
    return (
      <MCCard
        pressable
        onPress={onPress}
        padding={0}
        overflow="hidden"
        width={180}
      >
        <Image
          source={{ uri: show.imageUrl }}
          width={180}
          height={120}
          resizeMode="cover"
        />
        <YStack padding="$2" gap="$1">
          <Text fontSize={13} fontWeight="600" numberOfLines={1}>
            {show.title}
          </Text>
          <Text fontSize={11} color="$textMuted" numberOfLines={1}>
            {show.circusName}
          </Text>
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap={4}>
              <Star size={12} color="#FFB800" fill="#FFB800" />
              <Text fontSize={11} fontWeight="600">
                {show.rating}
              </Text>
            </XStack>
            <Text fontSize={13} fontWeight="700" color="$primary">
              {formatCurrency(show.price)}
            </Text>
          </XStack>
        </YStack>
      </MCCard>
    )
  }

  return (
    <MCCard pressable onPress={onPress} padding={0} overflow="hidden">
      <Image
        source={{ uri: show.imageUrl }}
        width="100%"
        height={180}
        resizeMode="cover"
      />
      <YStack padding="$3" gap="$2">
        <XStack alignItems="center" justifyContent="space-between">
          <MCBadge label={show.category} variant="accent" />
          <Text fontSize={12} color="$textMuted">
            {show.duration} min
          </Text>
        </XStack>
        <Text fontFamily="$heading" fontSize={18} fontWeight="700">
          {show.title}
        </Text>
        <Text fontSize={14} color="$textSecondary">
          {show.circusName}
        </Text>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap={6}>
            <Star size={16} color="#FFB800" fill="#FFB800" />
            <Text fontSize={14} fontWeight="600">
              {show.rating}
            </Text>
            <Text fontSize={12} color="$textMuted">
              ({show.reviewCount})
            </Text>
          </XStack>
          <Text fontSize={18} fontWeight="700" color="$primary">
            {formatCurrency(show.price)}
          </Text>
        </XStack>
        <XStack alignItems="center" gap={4}>
          <Text fontSize={12} color="$textMuted">
            {show.location} - {show.city}
          </Text>
        </XStack>
      </YStack>
    </MCCard>
  )
}
