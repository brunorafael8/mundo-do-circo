import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Image } from 'tamagui'
import { ArrowLeft, Star, Clock, MapPin, Users } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShow } from '../../../../src/features/shows/hooks'
import { MCButton } from '../../../../src/components/ui/MCButton'
import { MCBadge } from '../../../../src/components/ui/MCBadge'
import { MCLoading } from '../../../../src/components/ui/MCLoading'
import { formatCurrency, formatFullDate } from '../../../../src/utils/formatters'

export default function ShowDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { data: show, isLoading } = useShow(id)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)

  if (isLoading) {
    return <MCLoading />
  }

  if (!show) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <Text fontSize={16} color="$textMuted">
          Show nao encontrado
        </Text>
      </YStack>
    )
  }

  const selectedDate = show.dates.find((d) => d.id === selectedDateId)
  const availableSeats = selectedDate?.available ?? 0

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack>
          <Image
            source={{ uri: show.imageUrl }}
            width="100%"
            height={280}
            resizeMode="cover"
          />
          <XStack
            position="absolute"
            top={insets.top + 8}
            left={16}
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor="rgba(0,0,0,0.4)"
            alignItems="center"
            justifyContent="center"
            pressStyle={{ opacity: 0.7 }}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color="white" />
          </XStack>
        </YStack>

        <YStack padding="$4" gap="$4">
          <YStack gap="$2">
            <XStack alignItems="center" gap="$2">
              <MCBadge label={show.category} variant="secondary" />
              {show.ageRating !== 'Livre' && (
                <MCBadge label={show.ageRating} variant="accent" />
              )}
              {show.ageRating === 'Livre' && (
                <MCBadge label="Livre" variant="success" />
              )}
            </XStack>
            <Text fontFamily="$heading" fontSize={24} fontWeight="700">
              {show.title}
            </Text>
            <Text fontSize={16} color="$textSecondary">
              {show.circusName}
            </Text>
            <XStack alignItems="center" gap={6}>
              <Star size={18} color="#FFB800" fill="#FFB800" />
              <Text fontSize={16} fontWeight="700">
                {show.rating}
              </Text>
              <Text fontSize={14} color="$textMuted">
                ({show.reviewCount} avaliacoes)
              </Text>
            </XStack>
          </YStack>

          <XStack gap="$4">
            <XStack alignItems="center" gap={6}>
              <Clock size={16} color="$textMuted" />
              <Text fontSize={14} color="$textMuted">
                {show.duration} min
              </Text>
            </XStack>
            <XStack alignItems="center" gap={6}>
              <MapPin size={16} color="$textMuted" />
              <Text fontSize={14} color="$textMuted">
                {show.location}, {show.city}
              </Text>
            </XStack>
          </XStack>

          <YStack gap="$2">
            <Text fontFamily="$heading" fontSize={16} fontWeight="700">
              Sobre o show
            </Text>
            <Text fontSize={15} color="$textSecondary" lineHeight={22}>
              {show.description}
            </Text>
          </YStack>

          <YStack gap="$3">
            <Text fontFamily="$heading" fontSize={16} fontWeight="700">
              Escolha a data
            </Text>
            {show.dates.map((dateItem) => (
              <XStack
                key={dateItem.id}
                padding="$3"
                borderRadius={12}
                backgroundColor={
                  selectedDateId === dateItem.id ? '$primary' : '$surface'
                }
                borderWidth={1}
                borderColor={
                  selectedDateId === dateItem.id ? '$primary' : '$borderColor'
                }
                alignItems="center"
                justifyContent="space-between"
                pressStyle={{ opacity: 0.8 }}
                onPress={() => setSelectedDateId(dateItem.id)}
                cursor="pointer"
              >
                <YStack gap={2}>
                  <Text
                    fontSize={15}
                    fontWeight="600"
                    color={selectedDateId === dateItem.id ? 'white' : '$color'}
                  >
                    {formatFullDate(dateItem.date)}
                  </Text>
                  <Text
                    fontSize={13}
                    color={
                      selectedDateId === dateItem.id
                        ? 'rgba(255,255,255,0.8)'
                        : '$textMuted'
                    }
                  >
                    {dateItem.time}
                  </Text>
                </YStack>
                <XStack alignItems="center" gap={4}>
                  <Users
                    size={14}
                    color={
                      selectedDateId === dateItem.id ? 'white' : '$textMuted'
                    }
                  />
                  <Text
                    fontSize={13}
                    fontWeight="500"
                    color={
                      selectedDateId === dateItem.id
                        ? 'rgba(255,255,255,0.8)'
                        : '$textMuted'
                    }
                  >
                    {dateItem.available} vagas
                  </Text>
                </XStack>
              </XStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      <YStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom={insets.bottom + 12}
        backgroundColor="$background"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
          <YStack>
            <Text fontSize={13} color="$textMuted">
              A partir de
            </Text>
            <Text fontSize={24} fontWeight="700" color="$primary">
              {formatCurrency(show.price)}
            </Text>
          </YStack>
          {selectedDate && (
            <Text fontSize={13} color="$success" fontWeight="600">
              {availableSeats} vagas disponiveis
            </Text>
          )}
        </XStack>
        <MCButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedDateId}
          opacity={selectedDateId ? 1 : 0.5}
        >
          Comprar Ingresso
        </MCButton>
      </YStack>
    </YStack>
  )
}
