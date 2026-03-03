import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text, View } from 'tamagui'
import { Bell } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { useFeaturedShows, useShows } from '../../../src/features/shows/hooks'
import { ShowCarousel } from '../../../src/components/publico/ShowCarousel'
import { CategoryFilter } from '../../../src/components/publico/CategoryFilter'
import { ShowCard } from '../../../src/components/publico/ShowCard'
import { MCLoading } from '../../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../../src/components/ui/MCEmptyState'
import { Search } from '@tamagui/lucide-icons'
import type { ShowCategory } from '../../../src/features/shows/types'
import { Image } from 'expo-image'

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
        {/* <XStack
          width={40}
          height={40}
          borderRadius={20}
          borderWidth={2}
          borderColor="$sunshineYellow"
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.7 }}
        >
          <Bell size={20} color="$royalBlue" />
        </XStack> */}
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(400)}>
          <YStack paddingHorizontal="$4" paddingVertical="$6" alignItems="center">
            <Text fontFamily="$heading" fontStyle="italic" fontSize={18} color="$circusRed" marginBottom="$1">
              Sejam bem-vindos!
            </Text>
            <Text fontFamily="$circus" fontSize={38} color="$color" textAlign="center" lineHeight={48} marginTop="$2">
              Respeitável Público!
            </Text>
            <XStack width={96} height={4} borderRadius={2} backgroundColor="$circusRed" marginTop="$4" />
          </YStack>
        </Animated.View>

        {featuredShows && featuredShows.length > 0 ? (
          <Animated.View entering={FadeInUp.duration(400).delay(100)}>
            <YStack gap="$3" marginBottom="$4">
              <Text
                fontFamily="$heading"
                fontSize={20}
                fontWeight="bold"
                color="$darkNavy"
                paddingHorizontal="$4"
                paddingBottom="$2"
                borderBottomWidth={2}
                borderBottomColor="$sunshineYellow"
                marginHorizontal="$4"
              >
                Destaques
              </Text>
              <ShowCarousel
                shows={featuredShows}
                onShowPress={(show) =>
                  router.push(`/(publico)/(home)/show/${show.id}`)
                }
              />
            </YStack>
          </Animated.View>
        ) : null}

        <YStack paddingHorizontal="$4" gap="$3" paddingBottom="$4" marginTop="$6">
          <Text
            fontFamily="$heading"
            fontSize={20}
            fontWeight="bold"
            color="$darkNavy"
            paddingBottom="$2"
            borderBottomWidth={2}
            borderBottomColor="$sunshineYellow"
          >
            Explorar Categorias
          </Text>
        </YStack>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <YStack paddingHorizontal="$4" gap="$3" paddingBottom="$4" marginTop="$6">
          <Text
            fontFamily="$heading"
            fontSize={20}
            fontWeight="bold"
            color="$darkNavy"
            paddingBottom="$2"
            borderBottomWidth={2}
            borderBottomColor="$sunshineYellow"
          >
            Mais Espetáculos
          </Text>
        </YStack>

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
                entering={FadeInUp.duration(300).delay(index * 60)}
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
