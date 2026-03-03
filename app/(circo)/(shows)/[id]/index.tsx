import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  ChevronLeft,
  Edit3,
  Users,
  DollarSign,
  CalendarDays,
  Clock,
  Star,
  MapPin,
  Shield,
} from '@tamagui/lucide-icons'
import { useShow } from '../../../../src/features/shows/hooks'
import { MCButton } from '../../../../src/components/ui/MCButton'
import { MCLoading } from '../../../../src/components/ui/MCLoading'
import { formatCurrency, formatDate } from '../../../../src/utils/formatters'

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

const CATEGORY_LABEL: Record<string, string> = {
  aereo: 'Aéreo',
  palhaco: 'Palhaço',
  fogo: 'Fogo',
  infantil: 'Infantil',
  magica: 'Mágica',
  acrobacia: 'Acrobacia',
  malabarismo: 'Malabarismo',
  musical: 'Musical',
}

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
  const isSoldOut = show.soldCount >= show.capacity
  const isAlmostSoldOut = soldPercentage >= 85
  const barColor = isSoldOut ? '#E63946' : isAlmostSoldOut ? '#FFB800' : '#2EC4B6'

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <YStack height={260} position="relative">
          <Image
            source={show.imageUrl}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          {/* Gradient overlay */}
          <YStack position="absolute" bottom={0} left={0} right={0} height={140} backgroundColor="rgba(0,0,0,0.6)" />

          {/* Back button */}
          <XStack position="absolute" top={insets.top + 8} left={16}>
            <XStack
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor="rgba(0,0,0,0.5)"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.back()}
              pressStyle={{ opacity: 0.7 }}
            >
              <ChevronLeft size={24} color="white" />
            </XStack>
          </XStack>

          {/* Edit button */}
          <XStack position="absolute" top={insets.top + 8} right={16}>
            <XStack
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor="rgba(0,0,0,0.5)"
              alignItems="center"
              justifyContent="center"
              onPress={() => router.push(`/(circo)/(shows)/${id}/edit`)}
              pressStyle={{ opacity: 0.7 }}
            >
              <Edit3 size={18} color="white" />
            </XStack>
          </XStack>

          {/* Title over image */}
          <YStack position="absolute" bottom={16} left={16} right={16}>
            <XStack alignItems="center" gap="$2" marginBottom="$1">
              <Text fontSize={16}>{CATEGORY_EMOJI[show.category] ?? '🎪'}</Text>
              <Text fontSize={12} fontWeight="700" color="#FFB800" textTransform="uppercase">
                {CATEGORY_LABEL[show.category] ?? show.category}
              </Text>
            </XStack>
            <Text fontFamily="$heading" fontSize={26} fontWeight="800" color="white" numberOfLines={2}>
              {show.title}
            </Text>
            <XStack alignItems="center" gap="$2" marginTop="$1">
              <MapPin size={12} color="#ffffff99" />
              <Text fontSize={13} color="#ffffff99" fontWeight="500">
                {show.location}, {show.city}
              </Text>
            </XStack>
          </YStack>
        </YStack>

        <YStack padding="$4" gap="$4" paddingBottom={insets.bottom + 24}>

          {/* Stats Cards */}
          <Animated.View entering={FadeInUp.duration(300).delay(50)}>
            <XStack gap="$3">
              {/* Vendidos */}
              <YStack flex={1} backgroundColor="$surface" borderRadius="$4" padding="$3" borderWidth={1} borderColor="$borderColor" gap="$2">
                <XStack alignItems="center" gap="$2">
                  <YStack width={28} height={28} borderRadius={14} backgroundColor="#2EC4B618" alignItems="center" justifyContent="center">
                    <Users size={14} color="#2EC4B6" />
                  </YStack>
                  <Text fontSize={11} fontWeight="600" color="$textMuted">Vendidos</Text>
                </XStack>
                <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                  {show.soldCount}/{show.capacity}
                </Text>
                <YStack width="100%" height={6} backgroundColor="#E6394612" borderRadius={3} overflow="hidden">
                  <YStack height="100%" width={`${soldPercentage}%`} backgroundColor={barColor} borderRadius={3} />
                </YStack>
                <Text fontSize={11} fontWeight="700" color={barColor}>{soldPercentage}% ocupação</Text>
              </YStack>

              {/* Receita */}
              <YStack flex={1} backgroundColor="$surface" borderRadius="$4" padding="$3" borderWidth={1} borderColor="$borderColor" gap="$2">
                <XStack alignItems="center" gap="$2">
                  <YStack width={28} height={28} borderRadius={14} backgroundColor="#E6394618" alignItems="center" justifyContent="center">
                    <DollarSign size={14} color="$circusRed" />
                  </YStack>
                  <Text fontSize={11} fontWeight="600" color="$textMuted">Receita</Text>
                </XStack>
                <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                  {formatCurrency(revenue)}
                </Text>
                <Text fontSize={11} color="$textMuted">
                  {formatCurrency(show.price)} por ingresso
                </Text>
              </YStack>
            </XStack>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInUp.duration(300).delay(150)}>
            <YStack gap="$2">
              <Text fontFamily="$heading" fontSize={16} fontWeight="700" color="$color">
                Sobre o Espetáculo
              </Text>
              <Text fontSize={14} color="$textSecondary" lineHeight={22}>
                {show.description}
              </Text>
            </YStack>
          </Animated.View>

          {/* Show Info Grid */}
          <Animated.View entering={FadeInUp.duration(300).delay(250)}>
            <YStack backgroundColor="$surface" borderRadius="$4" padding="$4" borderWidth={1} borderColor="$borderColor" gap="$3">
              <Text fontFamily="$heading" fontSize={16} fontWeight="700" color="$color" marginBottom="$1">
                Informações
              </Text>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Clock size={14} color="$textMuted" />
                  <Text fontSize={13} color="$textMuted">Duração</Text>
                </XStack>
                <Text fontSize={14} fontWeight="700" color="$color">{show.duration} min</Text>
              </XStack>
              <YStack height={1} backgroundColor="$borderColor" />
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Shield size={14} color="$textMuted" />
                  <Text fontSize={13} color="$textMuted">Classificação</Text>
                </XStack>
                <Text fontSize={14} fontWeight="700" color="$color">{show.ageRating}</Text>
              </XStack>
              <YStack height={1} backgroundColor="$borderColor" />
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Star size={14} color="#FFB800" />
                  <Text fontSize={13} color="$textMuted">Avaliação</Text>
                </XStack>
                <XStack alignItems="center" gap="$1">
                  <Text fontSize={14} fontWeight="700" color="$color">{show.rating}</Text>
                  <Text fontSize={12} color="$textMuted">({show.reviewCount})</Text>
                </XStack>
              </XStack>
            </YStack>
          </Animated.View>

          {/* Dates */}
          <Animated.View entering={FadeInUp.duration(300).delay(350)}>
            <YStack gap="$3">
              <XStack alignItems="center" gap="$2">
                <CalendarDays size={18} color="$color" />
                <Text fontFamily="$heading" fontSize={16} fontWeight="700" color="$color">
                  Próximas Datas
                </Text>
                <YStack backgroundColor="#E6394618" paddingHorizontal="$2" paddingVertical={1} borderRadius="$10">
                  <Text fontSize={10} fontWeight="700" color="$circusRed">{show.dates.length}</Text>
                </YStack>
              </XStack>
              {show.dates.map((d) => {
                const isLow = d.available < 30
                const isMed = d.available < 80
                return (
                  <YStack
                    key={d.id}
                    backgroundColor="$surface"
                    borderRadius="$4"
                    padding="$3"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <XStack alignItems="center" justifyContent="space-between">
                      <YStack gap={2}>
                        <Text fontSize={15} fontWeight="700" color="$color">
                          {formatDate(d.date)}
                        </Text>
                        <Text fontSize={13} color="$textMuted" fontWeight="500">
                          {d.time} · {show.duration}min
                        </Text>
                      </YStack>
                      <YStack alignItems="flex-end" gap={2}>
                        <YStack
                          backgroundColor={isLow ? '#E6394618' : isMed ? '#FFB80018' : '#2EC4B618'}
                          paddingHorizontal="$2"
                          paddingVertical={3}
                          borderRadius="$3"
                        >
                          <Text
                            fontSize={12}
                            fontWeight="800"
                            color={isLow ? '$error' : isMed ? '$sunshineYellowDark' : '$success'}
                          >
                            {d.available} vagas
                          </Text>
                        </YStack>
                      </YStack>
                    </XStack>
                  </YStack>
                )
              })}
            </YStack>
          </Animated.View>

          {/* Edit Button */}
          <Animated.View entering={FadeInUp.duration(300).delay(450)}>
            <MCButton
              variant="primary"
              size="lg"
              fullWidth
              icon={<Edit3 size={18} color="white" />}
              onPress={() => router.push(`/(circo)/(shows)/${id}/edit`)}
            >
              Editar Espetáculo
            </MCButton>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
