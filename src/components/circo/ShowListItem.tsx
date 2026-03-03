import { memo } from 'react'
import { Pressable } from 'react-native'
import { XStack, YStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Calendar, Users, MapPin, Star, Clock } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowListItemProps {
  show: Show
  onPress?: (id: string) => void
}

const CATEGORY_EMOJI: Record<string, string> = {
  aereo: '🎭',
  palhaco: '🤡',
  fogo: '🔥',
  infantil: '🧸',
  magica: '🎩',
  acrobacia: '🤸',
  malabarismo: '🤹',
  musical: '🎵',
}

export const ShowListItem = memo(function ShowListItem({ show, onPress }: ShowListItemProps) {
  const soldPercentage = Math.round((show.soldCount / show.capacity) * 100)
  const isSoldOut = show.soldCount >= show.capacity
  const isAlmostSoldOut = soldPercentage >= 85
  const nextDate = show.dates?.[0]

  const barColor = isSoldOut
    ? '#E63946'
    : isAlmostSoldOut
    ? '#FFB800'
    : '#2EC4B6'

  return (
    <Pressable onPress={() => onPress?.(show.id)}>
      <YStack
        backgroundColor="$surface"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        overflow="hidden"
      >
        {/* Top: Image + overlay info */}
        <YStack height={140} position="relative">
          <Image
            source={show.imageUrl}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          {/* Dark gradient overlay */}
          <YStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height={80}
            backgroundColor="rgba(0,0,0,0.55)"
          />

          {/* Category badge */}
          <YStack position="absolute" top={10} left={10} backgroundColor="rgba(0,0,0,0.6)" paddingHorizontal={8} paddingVertical={4} borderRadius={8}>
            <Text fontSize={14}>{CATEGORY_EMOJI[show.category] ?? '🎪'}</Text>
          </YStack>

          {/* Status badge */}
          <YStack
            position="absolute"
            top={10}
            right={10}
            backgroundColor={isSoldOut ? '#E63946' : isAlmostSoldOut ? '#FFB800' : '#2EC4B6'}
            paddingHorizontal={8}
            paddingVertical={3}
            borderRadius={8}
          >
            <Text fontSize={10} fontWeight="800" color="white" textTransform="uppercase">
              {isSoldOut ? 'Esgotado' : isAlmostSoldOut ? 'Esgotando' : 'Ativo'}
            </Text>
          </YStack>

          {/* Title + price over image */}
          <YStack position="absolute" bottom={10} left={12} right={12}>
            <XStack alignItems="flex-end" justifyContent="space-between">
              <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="white" numberOfLines={1} flex={1} paddingRight={8}>
                {show.title}
              </Text>
              <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="#FFB800">
                {formatCurrency(show.price)}
              </Text>
            </XStack>
          </YStack>
        </YStack>

        {/* Bottom: Info grid */}
        <YStack padding="$3" gap="$3">
          {/* Info row */}
          <XStack gap="$4" flexWrap="wrap">
            {nextDate && (
              <XStack alignItems="center" gap="$1">
                <Calendar size={12} color="$textMuted" />
                <Text fontSize={12} color="$textMuted" fontWeight="500">
                  {new Date(nextDate.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {nextDate.time}
                </Text>
              </XStack>
            )}
            <XStack alignItems="center" gap="$1">
              <Clock size={12} color="$textMuted" />
              <Text fontSize={12} color="$textMuted" fontWeight="500">{show.duration}min</Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Star size={12} color="#FFB800" />
              <Text fontSize={12} color="$textMuted" fontWeight="600">{show.rating}</Text>
            </XStack>
          </XStack>

          {/* Occupancy bar */}
          <YStack gap="$1">
            <XStack justifyContent="space-between" alignItems="center">
              <XStack alignItems="center" gap="$1">
                <Users size={12} color="$textMuted" />
                <Text fontSize={11} color="$textMuted" fontWeight="500">
                  {show.soldCount}/{show.capacity} vendidos
                </Text>
              </XStack>
              <Text fontSize={12} fontWeight="800" color={barColor}>
                {soldPercentage}%
              </Text>
            </XStack>
            <YStack width="100%" height={6} backgroundColor="#E6394612" borderRadius={3} overflow="hidden">
              <YStack height="100%" width={`${soldPercentage}%`} backgroundColor={barColor} borderRadius={3} />
            </YStack>
          </YStack>

          {/* Location */}
          <XStack alignItems="center" gap="$1">
            <MapPin size={11} color="$textMuted" />
            <Text fontSize={11} color="$textMuted" fontWeight="500" numberOfLines={1}>
              {show.location}, {show.city}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Pressable>
  )
})
