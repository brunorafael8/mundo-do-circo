import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Image } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronLeft, Edit3, Users, DollarSign, CalendarDays } from '@tamagui/lucide-icons'
import { useShow } from '../../../../src/features/shows/hooks'
import { MCCard } from '../../../../src/components/ui/MCCard'
import { MCButton } from '../../../../src/components/ui/MCButton'
import { MCLoading } from '../../../../src/components/ui/MCLoading'
import { MCBadge } from '../../../../src/components/ui/MCBadge'
import { formatCurrency, formatDate } from '../../../../src/utils/formatters'

export default function ShowDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: show, isLoading } = useShow(id ?? '')

  if (isLoading) {
    return <MCLoading />
  }

  if (!show) return null

  const soldPercentage = Math.round((show.soldCount / show.capacity) * 100)
  const revenue = show.soldCount * show.price

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <YStack>
          <Image
            source={{ uri: show.imageUrl }}
            width="100%"
            height={220}
            resizeMode="cover"
          />
          {/* Back button overlay */}
          <XStack
            position="absolute"
            top={insets.top + 8}
            left={16}
          >
            <XStack
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor="rgba(0,0,0,0.4)"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.back()}
              cursor="pointer"
              pressStyle={{ opacity: 0.7 }}
            >
              <ChevronLeft size={24} color="white" />
            </XStack>
          </XStack>
        </YStack>

        <YStack padding="$4" gap="$4">
          {/* Title & Category */}
          <YStack gap="$2">
            <XStack alignItems="center" justifyContent="space-between">
              <Text
                fontFamily="$heading"
                fontSize={24}
                fontWeight="800"
                color="$color"
                flex={1}
                numberOfLines={2}
              >
                {show.title}
              </Text>
              <MCBadge label={show.category} variant="accent" />
            </XStack>
            <Text fontSize={14} color="$textMuted">
              {show.location} - {show.city}
            </Text>
          </YStack>

          {/* Stats Cards */}
          <XStack gap="$3">
            <MCCard variant="elevated" flex={1} alignItems="center" gap="$1" padding="$3">
              <Users size={20} color="$primary" />
              <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
                {show.soldCount}/{show.capacity}
              </Text>
              <Text fontSize={11} color="$textMuted">
                Vendidos ({soldPercentage}%)
              </Text>
            </MCCard>

            <MCCard variant="elevated" flex={1} alignItems="center" gap="$1" padding="$3">
              <DollarSign size={20} color="$primary" />
              <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
                {formatCurrency(revenue)}
              </Text>
              <Text fontSize={11} color="$textMuted">
                Receita
              </Text>
            </MCCard>
          </XStack>

          {/* Edit Button */}
          <MCButton
            variant="outline"
            size="md"
            fullWidth
            icon={<Edit3 size={18} color="$primary" />}
            onPress={() => router.push(`/(circo)/(shows)/${id}/edit`)}
          >
            Editar Show
          </MCButton>

          {/* Description */}
          <YStack gap="$2">
            <Text fontFamily="$heading" fontSize={16} fontWeight="700" color="$color">
              Descricao
            </Text>
            <Text fontSize={14} color="$textSecondary" lineHeight={22}>
              {show.description}
            </Text>
          </YStack>

          {/* Show Info */}
          <MCCard variant="bordered" gap="$2">
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={13} color="$textMuted">Preco</Text>
              <Text fontSize={14} fontWeight="600" color="$color">{formatCurrency(show.price)}</Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={13} color="$textMuted">Duracao</Text>
              <Text fontSize={14} fontWeight="600" color="$color">{show.duration} min</Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={13} color="$textMuted">Classificacao</Text>
              <Text fontSize={14} fontWeight="600" color="$color">{show.ageRating}</Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize={13} color="$textMuted">Avaliacao</Text>
              <Text fontSize={14} fontWeight="600" color="$color">{show.rating} ({show.reviewCount})</Text>
            </XStack>
          </MCCard>

          {/* Dates */}
          <YStack gap="$3">
            <XStack alignItems="center" gap="$2">
              <CalendarDays size={18} color="$color" />
              <Text fontFamily="$heading" fontSize={16} fontWeight="700" color="$color">
                Datas Disponiveis
              </Text>
            </XStack>
            {show.dates.map((d) => (
              <MCCard key={d.id} variant="bordered" padding="$3">
                <XStack alignItems="center" justifyContent="space-between">
                  <YStack gap={2}>
                    <Text fontSize={15} fontWeight="600" color="$color">
                      {formatDate(d.date)}
                    </Text>
                    <Text fontSize={13} color="$textMuted">
                      {d.time}
                    </Text>
                  </YStack>
                  <MCBadge
                    label={`${d.available} vagas`}
                    variant={d.available < 30 ? 'error' : d.available < 80 ? 'warning' : 'success'}
                  />
                </XStack>
              </MCCard>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
