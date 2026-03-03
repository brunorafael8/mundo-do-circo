import { useEffect, memo } from 'react'
import { ScrollView, Pressable, View as RNView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { MCCard } from '../ui/MCCard'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated'

interface ShowCarouselProps {
  shows: Show[]
  onShowPress?: (show: Show) => void
}

const PulsingCTA = memo(function PulsingCTA() {
  const scale = useSharedValue(1)
  const shadowOpacity = useSharedValue(0.2)

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )
    shadowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.15, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }))

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#E63946',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          shadowColor: '#E63946',
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          elevation: 4,
        },
        animatedStyle,
      ]}
    >
      <Text color="$white" fontWeight="bold" fontSize={14} textTransform="uppercase" letterSpacing={2}>
        Garantir Ingresso
      </Text>
    </Animated.View>
  )
})

const AnimatedBadge = memo(function AnimatedBadge() {
  const scale = useSharedValue(1)
  const rotate = useSharedValue(0)

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )
    rotate.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(-2, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 12,
          right: 12,
          backgroundColor: '#E5A600',
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 16,
          shadowColor: '#FFB800',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 3,
        },
        animatedStyle,
      ]}
    >
      <Text color="$white" fontSize={10} fontWeight="bold" textTransform="uppercase" letterSpacing={2}>
        {'\u2605'} Destaque
      </Text>
    </Animated.View>
  )
})

function CardConfetti() {
  return (
    <>
      <RNView style={{ position: 'absolute', top: 8, left: 8, width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFB800', opacity: 0.3 }} />
      <RNView style={{ position: 'absolute', bottom: 12, right: 16, width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#E63946', opacity: 0.25 }} />
      <RNView style={{ position: 'absolute', top: 20, right: 24, width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#1D3557', opacity: 0.15 }} />
      <RNView style={{ position: 'absolute', bottom: 30, left: 12, width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#FFB800', opacity: 0.2 }} />
    </>
  )
}

export function ShowCarousel({ shows, onShowPress }: ShowCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      snapToInterval={336}
      decelerationRate="fast"
    >
      {shows.map((show) => (
        <Link
          key={show.id}
          href={`/(publico)/(home)/show/${show.id}`}
          asChild
        >
          <Pressable>
            <Link.AppleZoom>
              <MCCard
                pressable
                padding={0}
                overflow="hidden"
                width={320}
                backgroundColor="$white"
                borderRadius={12}
                marginBottom={24}
                borderWidth={2}
                borderColor="$sunshineYellowLight"
              >
                {/* Image Area */}
                <YStack height={192} width="100%" position="relative">
                  <Image
                    source={show.imageUrl}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                  <AnimatedBadge />
                </YStack>

                {/* Details Area */}
                <YStack padding={20} position="relative" backgroundColor="$white">
                  <CardConfetti />

                  {/* Cutouts for ticket effect */}
                  <XStack position="absolute" top={-12} left={0} right={0} justifyContent="space-between" paddingHorizontal={16} zIndex={10}>
                    <YStack width={24} height={24} borderRadius={12} backgroundColor="$background" marginLeft={-28} />
                    <YStack width={24} height={24} borderRadius={12} backgroundColor="$background" marginRight={-28} />
                  </XStack>

                  <YStack borderTopWidth={2} borderStyle="dashed" borderColor="$sunshineYellow" paddingTop={16}>
                    <Text fontSize={12} color="$circusRed" fontWeight="bold" textTransform="uppercase" letterSpacing={2} marginBottom={4} numberOfLines={1}>
                      {'\uD83C\uDFAA'} {show.circusName}
                    </Text>
                    <Text fontFamily="$heading" fontSize={24} fontWeight="700" color="$royalBlue" marginBottom={4}>
                      {show.title}
                    </Text>

                    <Text fontSize={14} color="$gray600" marginBottom={16}>
                      {'\uD83D\uDCC5'} {show.dates?.[0]?.date || '15 de Outubro'} {'\u2022'} {show.dates?.[0]?.time || '19:30'}
                    </Text>

                    <PulsingCTA />
                  </YStack>
                </YStack>
              </MCCard>
            </Link.AppleZoom>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  )
}
