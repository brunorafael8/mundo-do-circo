import { useState, useCallback, memo } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { ArrowLeft, Star, Clock, MapPin, Users, Calendar, Ticket, Info, Share } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShow } from '../../../../src/features/shows/hooks'
import { MCButton } from '../../../../src/components/ui/MCButton'
import { MCLoading } from '../../../../src/components/ui/MCLoading'
import { formatCurrency, formatFullDate } from '../../../../src/utils/formatters'

export default function ShowDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { data: show, isLoading } = useShow(id)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)

  const handleSelectDate = useCallback((dateId: string) => {
    setSelectedDateId(dateId)
  }, [])

  if (isLoading) {
    return <MCLoading />
  }

  if (!show) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
        <Text fontSize={16} color="$textMuted">
          Show não encontrado
        </Text>
      </YStack>
    )
  }

  const selectedDate = show.dates.find((d) => d.id === selectedDateId)
  const availableSeats = selectedDate?.available ?? 0

  return (
    <YStack flex={1} backgroundColor="$white">
      {/* Header */}
      <XStack
        paddingTop={insets.top + 8}
        paddingBottom={12}
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="rgba(227, 29, 26, 0.1)"
        backgroundColor="$white"
      >
        <XStack width={40} height={40} alignItems="center" justifyContent="center" borderRadius={20} pressStyle={{ backgroundColor: 'rgba(227, 29, 26, 0.1)' }} onPress={() => router.back()}>
          <ArrowLeft size={24} color="$circusRed" />
        </XStack>
        <Text fontFamily="$heading" fontSize={18} fontWeight="bold" textTransform="uppercase" letterSpacing={2} color="$darkNavy">
          Detalhes do Evento
        </Text>
        <XStack width={40} height={40} alignItems="center" justifyContent="center" borderRadius={20} pressStyle={{ backgroundColor: 'rgba(227, 29, 26, 0.1)' }}>
          <Share size={24} color="$circusRed" />
        </XStack>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$6" flex={1}>
          {/* Vintage framed image */}
          <YStack position="relative" alignSelf="center" width="100%">
            {/* the stars */}
            <Star size={36} color="$sunshineYellow" position="absolute" top={-12} left={-12} opacity={0.5} fill="$sunshineYellow" />
            <Star size={36} color="$sunshineYellow" position="absolute" bottom={-12} right={-12} opacity={0.5} fill="$sunshineYellow" />
            <YStack padding={8} backgroundColor="$white" borderRadius={12} elevation={5} shadowColor="rgba(0,0,0,0.2)" shadowRadius={10}>
              <YStack borderWidth={4} borderColor="$sunshineYellow" borderRadius={8} overflow="hidden">
                <Link.AppleZoomTarget>
                  <Image
                    source={show.imageUrl}
                    style={{ width: '100%', aspectRatio: 0.8 }}
                    contentFit="cover"
                  />
                </Link.AppleZoomTarget>
              </YStack>
            </YStack>
          </YStack>

          {/* Logo & Title */}
          <YStack alignItems="center" marginTop="$8" gap="$2">
            <XStack alignItems="center" gap={8} width="100%" justifyContent="center">
              <YStack height={1} width={32} backgroundColor="rgba(227, 29, 26, 0.3)" />
              <Image source={require('../../../../public/images/logo.png')} style={{ height: 32, width: 100 }} contentFit="contain" />
              <YStack height={1} width={32} backgroundColor="rgba(227, 29, 26, 0.3)" />
            </XStack>
            <Text fontSize={14} color="$circusRed" fontWeight="bold" textTransform="uppercase" letterSpacing={3} marginTop="$4" marginBottom={-4}>
              🎪 {show.circusName}
            </Text>
            <Text fontFamily="$heading" fontSize={32} fontWeight="900" color="$circusRed" textAlign="center">
              {show.title}
            </Text>
            <Text fontSize={18} fontWeight="500" color="$gray700" textAlign="center">
              {show.location}, {show.city}
            </Text>
          </YStack>

          {/* Info Grid */}
          <XStack flexWrap="wrap" justifyContent="space-between" marginTop="$8" gap={16}>
            <YStack width="46%" backgroundColor="rgba(0, 86, 179, 0.05)" padding="$4" borderRadius={16} alignItems="center" borderWidth={1} borderColor="rgba(0, 86, 179, 0.1)">
              <Clock size={28} color="$royalBlue" marginBottom="$1" />
              <Text fontSize={14} color="$gray500" fontWeight="500">Duração</Text>
              <Text fontSize={16} fontWeight="bold" color="$darkNavy" marginTop={4}>{show.duration} min</Text>
            </YStack>
            <YStack width="46%" backgroundColor="rgba(0, 86, 179, 0.05)" padding="$4" borderRadius={16} alignItems="center" borderWidth={1} borderColor="rgba(0, 86, 179, 0.1)">
              <Ticket size={28} color="$royalBlue" marginBottom="$1" />
              <Text fontSize={14} color="$gray500" fontWeight="500">Categoria</Text>
              <Text fontSize={16} fontWeight="bold" color="$darkNavy" marginTop={4} textAlign="center" numberOfLines={1}>{show.category}</Text>
            </YStack>
            <YStack width="46%" backgroundColor="rgba(0, 86, 179, 0.05)" padding="$4" borderRadius={16} alignItems="center" borderWidth={1} borderColor="rgba(0, 86, 179, 0.1)">
              <Info size={28} color="$royalBlue" marginBottom="$1" />
              <Text fontSize={14} color="$gray500" fontWeight="500">Classificação</Text>
              <Text fontSize={16} fontWeight="bold" color="$darkNavy" marginTop={4}>{show.ageRating}</Text>
            </YStack>
            <YStack width="46%" backgroundColor="rgba(0, 86, 179, 0.05)" padding="$4" borderRadius={16} alignItems="center" borderWidth={1} borderColor="rgba(0, 86, 179, 0.1)">
              <Star size={28} color="$royalBlue" marginBottom="$1" />
              <Text fontSize={14} color="$gray500" fontWeight="500">Avaliação</Text>
              <Text fontSize={16} fontWeight="bold" color="$darkNavy" marginTop={4}>{show.rating} / 5.0</Text>
            </YStack>
          </XStack>

          {/* Description */}
          <YStack marginTop="$8" gap="$4">
            <XStack alignItems="center" gap="$2">
              <Star size={20} color="$circusRed" fill="$circusRed" />
              <Text fontFamily="$heading" fontSize={20} fontWeight="bold" color="$darkNavy" textTransform="uppercase" letterSpacing={1}>
                Sobre o Espetáculo
              </Text>
            </XStack>
            <Text fontSize={16} lineHeight={26} color="$gray600">
              {show.description}
            </Text>
          </YStack>

          {/* Dates block */}
          <YStack marginTop="$8" gap="$4" paddingBottom="$4">
            <XStack alignItems="center" gap="$2" marginBottom="$2">
              <Ticket size={20} color="$circusRed" fill="$circusRed" />
              <Text fontFamily="$heading" fontSize={20} fontWeight="bold" color="$darkNavy" textTransform="uppercase" letterSpacing={1}>
                Datas Disponíveis
              </Text>
            </XStack>

            {show.dates.map((dateItem) => (
              <ShowDateItem
                key={dateItem.id}
                id={dateItem.id}
                date={dateItem.date}
                time={dateItem.time}
                available={dateItem.available}
                isSelected={selectedDateId === dateItem.id}
                onSelect={handleSelectDate}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      {/* Footer */}
      <YStack
        paddingHorizontal="$6"
        paddingTop="$4"
        paddingBottom={insets.bottom + 16}
        backgroundColor="$white"
        borderTopWidth={2}
        borderTopColor="rgba(253, 185, 19, 0.5)" // dashed-like effect by just being lightly colored
        elevation={10}
        shadowColor="rgba(0,0,0,0.1)"
        shadowRadius={10}
      >
        <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
          <YStack>
            <Text fontSize={14} color="$gray500" textTransform="uppercase" fontWeight="bold">
              A partir de
            </Text>
            <Text fontFamily="$heading" fontSize={28} fontWeight="900" color="$darkNavy">
              {formatCurrency(show.price)}
            </Text>
          </YStack>
          <YStack alignItems="flex-end">
            <Text fontSize={14} color="$gray500" fontWeight="500">
              Taxas não inclusas
            </Text>
          </YStack>
        </XStack>
        <MCButton
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedDateId}
          opacity={selectedDateId ? 1 : 0.5}
        >
          COMPRAR INGRESSOS
        </MCButton>
      </YStack>
    </YStack>
  )
}

interface DateItemProps {
  id: string
  date: string
  time: string
  available: number
  isSelected: boolean
  onSelect: (id: string) => void
}

const ShowDateItem = memo(function ShowDateItem({
  id,
  date,
  time,
  available,
  isSelected,
  onSelect,
}: DateItemProps) {
  const handlePress = useCallback(() => {
    onSelect(id)
  }, [id, onSelect])

  return (
    <XStack
      padding="$4"
      backgroundColor={isSelected ? "rgba(227, 29, 26, 0.05)" : "$white"}
      borderWidth={2}
      borderColor={isSelected ? "$circusRed" : "$sunshineYellow"}
      borderRadius={12}
      alignItems="center"
      justifyContent="space-between"
      onPress={handlePress}
      pressStyle={{ opacity: 0.7 }}
    >
      <YStack>
        <Text fontSize={16} fontWeight="bold" color="$darkNavy">
          {formatFullDate(date)}
        </Text>
        <Text fontSize={14} color="$gray500" marginTop={2}>
          {time} • {available} vagas restantes
        </Text>
      </YStack>
      <YStack
        width={24}
        height={24}
        borderRadius={12}
        borderWidth={2}
        borderColor={isSelected ? "$circusRed" : "$gray300"}
        alignItems="center"
        justifyContent="center"
      >
        {isSelected ? <YStack width={12} height={12} borderRadius={6} backgroundColor="$circusRed" /> : null}
      </YStack>
    </XStack>
  )
})
