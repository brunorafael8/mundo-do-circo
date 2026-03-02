import { useState, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Search as SearchIcon } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShows } from '../../src/features/shows/hooks'
import { SearchBar } from '../../src/components/publico/SearchBar'
import { CategoryFilter } from '../../src/components/publico/CategoryFilter'
import { ShowCard } from '../../src/components/publico/ShowCard'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../src/components/ui/MCEmptyState'
import type { ShowCategory, ShowFilters } from '../../src/features/shows/types'

export default function SearchScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ShowCategory | undefined>()

  const filters = useMemo<ShowFilters>(() => {
    const f: ShowFilters = {}
    if (query.trim()) f.query = query.trim()
    if (selectedCategory) f.category = selectedCategory
    return f
  }, [query, selectedCategory])

  const hasFilters = !!query.trim() || !!selectedCategory
  const { data: shows, isLoading } = useShows(hasFilters ? filters : undefined)

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top + 8}>
      <YStack gap="$3" paddingBottom="$3">
        <Text
          fontFamily="$heading"
          fontSize={24}
          fontWeight="700"
          paddingHorizontal="$4"
        >
          Buscar
        </Text>
        <SearchBar value={query} onChangeText={setQuery} />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </YStack>

      {isLoading ? (
        <MCLoading />
      ) : !shows || shows.length === 0 ? (
        <MCEmptyState
          icon={<SearchIcon size={48} color="$textMuted" />}
          title="Nenhum show encontrado"
          description={
            hasFilters
              ? 'Tente buscar com outros termos ou categorias'
              : 'Comece a buscar por shows, circos ou categorias'
          }
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        >
          <XStack
            flexWrap="wrap"
            paddingHorizontal="$4"
            gap="$3"
          >
            {shows.map((show) => (
              <YStack key={show.id} width="48%">
                <ShowCard
                  show={show}
                  compact
                  onPress={() =>
                    router.push(`/(publico)/(home)/show/${show.id}`)
                  }
                />
              </YStack>
            ))}
          </XStack>
        </ScrollView>
      )}
    </YStack>
  )
}
