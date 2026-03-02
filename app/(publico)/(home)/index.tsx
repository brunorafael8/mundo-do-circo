import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Bell } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFeaturedShows, useShows } from '../../../src/features/shows/hooks'
import { ShowCarousel } from '../../../src/components/publico/ShowCarousel'
import { CategoryFilter } from '../../../src/components/publico/CategoryFilter'
import { ShowCard } from '../../../src/components/publico/ShowCard'
import { MCLoading } from '../../../src/components/ui/MCLoading'
import type { ShowCategory } from '../../../src/features/shows/types'

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
        justifyContent="space-between"
        backgroundColor="$background"
      >
        <YStack>
          <Text fontFamily="$heading" fontSize={24} fontWeight="700" color="$primary">
            Mundo do Circo
          </Text>
          <Text fontSize={13} color="$textMuted">
            Descubra shows incriveis
          </Text>
        </YStack>
        <XStack
          width={44}
          height={44}
          borderRadius={22}
          backgroundColor="$surface"
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.7 }}
        >
          <Bell size={22} color="$color" />
        </XStack>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {featuredShows && featuredShows.length > 0 && (
          <YStack gap="$3" marginBottom="$4">
            <Text
              fontFamily="$heading"
              fontSize={18}
              fontWeight="700"
              paddingHorizontal="$4"
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
        )}

        <YStack paddingHorizontal="$4" gap="$3" paddingBottom="$4">
          <Text fontFamily="$heading" fontSize={18} fontWeight="700">
            Em Cartaz
          </Text>
        </YStack>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <YStack padding="$4" gap="$3" paddingBottom={insets.bottom + 16}>
          {shows?.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onPress={() =>
                router.push(`/(publico)/(home)/show/${show.id}`)
              }
            />
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
