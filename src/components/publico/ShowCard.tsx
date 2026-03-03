import { useEffect, memo } from 'react'
import { Pressable, View as RNView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { MCCard } from '../ui/MCCard'
import { Star } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated'

interface ShowCardProps {
  show: Show
  onPress?: () => void
  compact?: boolean
}

const MiniPulsingButton = memo(function MiniPulsingButton() {
  const scale = useSharedValue(1)

  useEffect(() => {
    scale.value = withDelay(
      Math.random() * 500,
      withRepeat(
        withSequence(
          withTiming(1.06, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#E63946',
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderRadius: 6,
          alignItems: 'center',
          shadowColor: '#E63946',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 3,
        },
        animatedStyle,
      ]}
    >
      <Text color="$white" fontSize={10} fontWeight="bold" textTransform="uppercase" letterSpacing={1}>
        Comprar
      </Text>
    </Animated.View>
  )
})

function CardConfettiMini() {
  return (
    <>
      <RNView style={{ position: 'absolute', top: 6, right: 8, width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#FFB800', opacity: 0.25 }} />
      <RNView style={{ position: 'absolute', bottom: 8, right: 20, width: 2, height: 2, borderRadius: 1, backgroundColor: '#E63946', opacity: 0.2 }} />
      <RNView style={{ position: 'absolute', top: 18, right: 40, width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#1D3557', opacity: 0.12 }} />
    </>
  )
}


export function ShowCard({ show, onPress, compact }: ShowCardProps) {
  if (compact) {
    return (
      <Link href={`/(publico)/(home)/show/${show.id}`} asChild>
        <Pressable>
          <Link.AppleZoom>
            <MCCard
              pressable
              onPress={onPress}
              padding={0}
              overflow="hidden"
              width={180}
            >
              <Image
                source={show.imageUrl}
                style={{ width: 180, height: 120 }}
                contentFit="cover"
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
          </Link.AppleZoom>
        </Pressable>
      </Link>
    )
  }

  return (
    <Link href={`/(publico)/(home)/show/${show.id}`} asChild>
      <Pressable>
        <Link.AppleZoom>
          <MCCard
            pressable
            onPress={onPress}
            padding={0}
            overflow="hidden"
            backgroundColor="$white"
            borderRadius={12}
            marginBottom="$2"
            elevation={3}
            shadowColor="rgba(0,0,0,0.1)"
            shadowRadius={8}
            borderWidth={1.5}
            borderColor="$sunshineYellowLight"
          >
            <XStack height={136}>
              {/* Image Area with gradient overlay */}
              <YStack width="35%" position="relative">
                <Image
                  source={show.imageUrl}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
                {/* Rating badge on image */}
                <XStack
                  position="absolute"
                  bottom={6}
                  left={6}
                  backgroundColor="rgba(0,0,0,0.65)"
                  borderRadius={10}
                  paddingHorizontal={6}
                  paddingVertical={2}
                  alignItems="center"
                  gap={3}
                >
                  <Star size={10} color="#FFB800" fill="#FFB800" />
                  <Text color="white" fontSize={10} fontWeight="bold">
                    {show.rating}
                  </Text>
                </XStack>
              </YStack>

              {/* Details Area */}
              <XStack flex={1} position="relative" alignItems="center">
                {/* Ticket effect cutouts on the left edge */}
                <YStack position="absolute" left={0} top={0} bottom={0} justifyContent="space-around" paddingVertical={8} zIndex={10}>
                  <YStack width={16} height={16} borderRadius={8} backgroundColor="$background" marginLeft={-8} />
                  <YStack width={16} height={16} borderRadius={8} backgroundColor="$background" marginLeft={-8} />
                </YStack>

                <CardConfettiMini />

                <YStack flex={1} paddingLeft={16} paddingRight={12} paddingVertical={12} justifyContent="space-between" height="100%">
                  <YStack>
                    <Text fontSize={10} color="$circusRed" fontWeight="bold" textTransform="uppercase" letterSpacing={1} marginBottom={2} numberOfLines={1}>
                      {'\uD83C\uDFAA'} {show.circusName}
                    </Text>
                    <Text fontFamily="$heading" fontSize={17} fontWeight="700" color="$royalBlue" numberOfLines={1}>
                      {show.title}
                    </Text>
                    <Text fontSize={10} color="$gray500" fontWeight="bold" textTransform="uppercase" marginTop={4}>
                      {'\uD83D\uDCC5'} {show.dates?.[0]?.date || '18 Out'} {'\u2022'} {show.dates?.[0]?.time || '21:00'}
                    </Text>
                  </YStack>

                  <XStack alignItems="center" justifyContent="space-between" marginTop={8}>
                    <YStack>
                      <Text fontSize={10} color="$gray500" textTransform="uppercase" letterSpacing={0.5}>
                        a partir de
                      </Text>
                      <Text fontSize={16} fontWeight="bold" color="$darkNavy">
                        {formatCurrency(show.price)}
                      </Text>
                    </YStack>
                    <MiniPulsingButton />
                  </XStack>
                </YStack>
              </XStack>
            </XStack>
          </MCCard>
        </Link.AppleZoom>
      </Pressable>
    </Link>
  )
}
