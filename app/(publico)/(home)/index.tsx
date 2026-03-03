import { useState, useEffect } from 'react'
import { ScrollView, View as RNView } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useFeaturedShows, useShows } from '../../../src/features/shows/hooks'
import { ShowCarousel } from '../../../src/components/publico/ShowCarousel'
import { CategoryFilter } from '../../../src/components/publico/CategoryFilter'
import { ShowCard } from '../../../src/components/publico/ShowCard'
import { MCLoading } from '../../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../../src/components/ui/MCEmptyState'
import { CircusDecorations } from '../../../src/components/publico/CircusDecorations'
import { Search } from '@tamagui/lucide-icons'
import type { ShowCategory } from '../../../src/features/shows/types'
import { Image } from 'expo-image'

function TentStripeDivider() {
  return (
    <XStack marginVertical="$3" marginHorizontal="$6" overflow="hidden" borderRadius={3} height={5}>
      {Array.from({ length: 10 }).map((_, i) => (
        <RNView key={i} style={{ flex: 1, backgroundColor: i % 2 === 0 ? '#E63946' : '#FFB800' }} />
      ))}
    </XStack>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <XStack alignItems="center" gap={10} paddingHorizontal="$4" marginBottom="$3">
      <XStack flex={1} height={2} backgroundColor="$sunshineYellow" borderRadius={1} />
      <Text fontFamily="$circus" fontSize={18} color="$royalBlue">
        {title}
      </Text>
      <XStack flex={1} height={2} backgroundColor="$sunshineYellow" borderRadius={1} />
    </XStack>
  )
}

function BreathingTitle() {
  const scale = useSharedValue(1)

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Text fontFamily="$circus" fontSize={38} color="$color" textAlign="center" lineHeight={48}>
        Respeitável Público!
      </Text>
    </Animated.View>
  )
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<ShowCategory | undefined>()

  const { data: featuredShows, isLoading: loadingFeatured } = useFeaturedShows()
  const { data: shows, isLoading: loadingShows } = useShows(
    selectedCategory ? { category: selectedCategory } : undefined
  )

  if (loadingFeatured && loadingShows) {
    return <MCLoading />
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <XStack
        paddingTop={insets.top + 8}
        paddingBottom={12}
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <YStack alignItems="center" justifyContent="center">
          <Image
            source={require('../../../public/images/logo.png')}
            style={{ width: 160, height: 80 }}
            contentFit="contain"
          />
        </YStack>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Welcome Section with floating decorations */}
        <RNView style={{ position: 'relative', overflow: 'hidden' }}>
          <LinearGradient
            colors={['#FFF8F0', '#FFF0E0', '#FFEBD4', '#FFF0E0', '#FFF8F0']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <CircusDecorations />

          <Animated.View entering={BounceInDown.duration(800).delay(100)}>
            <YStack paddingHorizontal="$4" paddingTop="$6" paddingBottom="$4" alignItems="center">
              <Text fontFamily="$heading" fontStyle="italic" fontSize={18} color="$circusRed" marginBottom="$1">
                Sejam bem-vindos!
              </Text>
              <BreathingTitle />
            </YStack>
          </Animated.View>

          <TentStripeDivider />
        </RNView>

        {featuredShows && featuredShows.length > 0 ? (
          <Animated.View entering={FadeInUp.springify().damping(14).delay(200)}>
            <YStack gap="$3" marginBottom="$4" marginTop="$4">
              <SectionHeader title="Destaques" />
              <ShowCarousel
                shows={featuredShows}
                onShowPress={(show) =>
                  router.push(`/(publico)/(home)/show/${show.id}`)
                }
              />
            </YStack>
          </Animated.View>
        ) : null}

        <TentStripeDivider />

        <Animated.View entering={FadeInUp.springify().damping(14).delay(300)}>
          <YStack paddingBottom="$3" marginTop="$2">
            <SectionHeader title="Explorar Categorias" />
          </YStack>
        </Animated.View>

        <Animated.View entering={FadeInUp.springify().damping(14).delay(400)}>
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </Animated.View>

        <TentStripeDivider />

        <Animated.View entering={FadeInUp.springify().damping(14).delay(500)}>
          <YStack paddingBottom="$2" marginTop="$2">
            <SectionHeader title="Mais Espetáculos" />
          </YStack>
        </Animated.View>

        {loadingShows ? (
          <YStack padding="$6">
            <MCLoading />
          </YStack>
        ) : !shows || shows.length === 0 ? (
          <Animated.View entering={FadeIn.duration(250)}>
            <YStack paddingVertical="$6" paddingBottom={insets.bottom + 16}>
              <MCEmptyState
                icon={<Search size={40} color="$textMuted" />}
                title="Nenhum espetáculo nesta categoria"
                description="Explore outras categorias ou volte para ver todos os shows"
              />
            </YStack>
          </Animated.View>
        ) : (
          <YStack padding="$4" gap="$3" paddingBottom={insets.bottom + 16}>
            {shows.map((show, index) => (
              <Animated.View
                key={show.id + (selectedCategory ?? 'all')}
                entering={FadeInUp.springify().damping(12).delay(index * 80)}
              >
                <ShowCard
                  show={show}
                  onPress={() =>
                    router.push(`/(publico)/(home)/show/${show.id}`)
                  }
                />
              </Animated.View>
            ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  )
}
