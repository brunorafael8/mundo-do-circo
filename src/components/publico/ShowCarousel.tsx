import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Image } from 'tamagui'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { Star } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowCarouselProps {
  shows: Show[]
  onShowPress?: (show: Show) => void
}

export function ShowCarousel({ shows, onShowPress }: ShowCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
    >
      {shows.map((show) => (
        <MCCard
          key={show.id}
          pressable
          onPress={() => onShowPress?.(show)}
          padding={0}
          overflow="hidden"
          width={280}
        >
          <Image
            source={{ uri: show.imageUrl }}
            width={280}
            height={160}
            resizeMode="cover"
          />
          <YStack padding="$3" gap="$2">
            <XStack alignItems="center" gap="$2">
              <MCBadge label={show.category} variant="secondary" />
              {show.ageRating !== 'Livre' && (
                <MCBadge label={show.ageRating} variant="accent" />
              )}
            </XStack>
            <Text fontFamily="$heading" fontSize={16} fontWeight="700" numberOfLines={1}>
              {show.title}
            </Text>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap={4}>
                <Star size={14} color="#FFB800" fill="#FFB800" />
                <Text fontSize={13} fontWeight="600">
                  {show.rating}
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="700" color="$primary">
                {formatCurrency(show.price)}
              </Text>
            </XStack>
          </YStack>
        </MCCard>
      ))}
    </ScrollView>
  )
}
