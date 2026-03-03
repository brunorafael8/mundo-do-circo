import { useState, useMemo } from 'react'
import { ScrollView, Pressable, FlatList } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated'
import { Search as SearchIcon, Star, Ticket, MapPin, Clock } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useShows } from '../../src/features/shows/hooks'
import { SearchBar } from '../../src/components/publico/SearchBar'
import { CategoryFilter } from '../../src/components/publico/CategoryFilter'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../src/components/ui/MCEmptyState'
import type { ShowCategory, ShowFilters, Show } from '../../src/features/shows/types'

const MONTHS_PT = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']

function formatMonth(dateString: string) {
  if (!dateString) return 'MÊS'
  const parts = dateString.split('-')
  const month = parseInt(parts[1], 10)
  return MONTHS_PT[month - 1] ?? 'MÊS'
}

function formatDay(dateString: string) {
  if (!dateString) return '00'
  const parts = dateString.split('-')
  return parts[2] ?? '00'
}

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
      {/* Header */}
      <XStack alignItems="center" justifyContent="center" paddingVertical="$4" position="relative">
        <Star size={32} color="$circusRed" fill="$circusRed" position="absolute" left={24} />
        <Image
          source={require('../../public/images/logo.png')}
          style={{ width: 140, height: 50 }}
          contentFit="contain"
        />
        <Star size={32} color="$circusRed" fill="$circusRed" position="absolute" right={24} />
      </XStack>

      <YStack paddingHorizontal="$4" gap="$2" marginBottom="$4">
        {/* Wrap SearchBar to add the border styles without changing the core component everywhere */}
        <YStack
          backgroundColor="$white"
          borderRadius={12}
          borderWidth={2}
          borderColor="$sunshineYellow"
          paddingVertical={4}
          shadowColor="rgba(0,0,0,0.05)"
          shadowRadius={4}
          elevation={1}
        >
          <SearchBar value={query} onChangeText={setQuery} placeholder="Encontre espetáculos de circo..." />
        </YStack>
      </YStack>

      {/* Categories */}
      <YStack paddingBottom="$4">
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="bold"
          color="$darkNavy"
          textTransform="uppercase"
          letterSpacing={2}
          paddingBottom="$2"
          borderBottomWidth={2}
          borderBottomColor="rgba(179, 42, 38, 0.3)" // primary/30
          marginHorizontal="$4"
          alignSelf="flex-start"
          marginBottom="$4"
        >
          Categorias
        </Text>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </YStack>

      {/* Results */}
      <YStack flex={1} paddingHorizontal="$4" paddingTop="$2">
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="bold"
          color="$darkNavy"
          textTransform="uppercase"
          letterSpacing={2}
          paddingBottom="$2"
          borderBottomWidth={2}
          borderBottomColor="rgba(179, 42, 38, 0.3)"
          alignSelf="flex-start"
          marginBottom="$4"
        >
          Resultados
        </Text>

        {isLoading ? (
          <MCLoading />
        ) : (
          <Animated.View
            key={query + (selectedCategory ?? '')}
            entering={FadeIn.duration(220)}
            exiting={FadeOut.duration(150)}
            style={{ flex: 1 }}
          >
          {!shows || shows.length === 0 ? (
            <MCEmptyState
              icon={<SearchIcon size={48} color="$textMuted" />}
              title="Nenhum espetáculo encontrado"
              description={
                hasFilters
                  ? 'Tente buscar com outros termos ou categorias'
                  : 'Comece a buscar por espetáculos, circos ou categorias'
              }
            />
          ) : (
            <FlatList
              data={shows}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: insets.bottom + 16, gap: 16 }}
              renderItem={({ item: show, index }) => {
              const stubColor = index % 2 === 0 ? '#1D3557' : '#E63946'
              const firstDate = show.dates?.[0]

              return (
                <Animated.View entering={FadeInUp.duration(300).delay(index * 65)}>
                  <Pressable onPress={() => router.push(`/(publico)/(home)/show/${show.id}`)}>
                    <XStack
                      backgroundColor="$white"
                      borderWidth={1.5}
                      borderColor="$sunshineYellow"
                      borderRadius={10}
                      overflow="hidden"
                      height={104}
                      shadowColor="rgba(29,53,87,0.12)"
                      shadowOffset={{ width: 0, height: 3 }}
                      shadowOpacity={1}
                      shadowRadius={8}
                      elevation={4}
                    >
                      {/* Image — fills full card height */}
                      <YStack width={100} position="relative">
                        <Image
                          source={{ uri: show.imageUrl }}
                          style={{ width: 100, height: 104 }}
                          contentFit="cover"
                        />
                        {/* Price badge */}
                        <YStack
                          position="absolute"
                          bottom={6}
                          left={6}
                          backgroundColor="rgba(0,0,0,0.65)"
                          paddingHorizontal={6}
                          paddingVertical={2}
                          borderRadius={4}
                        >
                          <Text fontSize={11} fontWeight="800" color="white" letterSpacing={0.3}>
                            R${show.price}
                          </Text>
                        </YStack>
                      </YStack>

                      {/* Details */}
                      <YStack flex={1} paddingHorizontal={12} paddingVertical={10} justifyContent="space-between">
                        <YStack gap={2}>
                          <Text fontSize={9} color="$circusRed" fontWeight="800" textTransform="uppercase" letterSpacing={1.2} numberOfLines={1}>
                            🎪 {show.circusName}
                          </Text>
                          <Text fontFamily="$heading" fontWeight="700" fontSize={15} color="$darkNavy" lineHeight={19} numberOfLines={2}>
                            {show.title}
                          </Text>
                        </YStack>

                        <YStack gap={3}>
                          <XStack alignItems="center" gap={4}>
                            <MapPin size={10} color="#6C757D" />
                            <Text fontSize={11} color="$gray600" numberOfLines={1} flex={1}>
                              {show.location}
                            </Text>
                          </XStack>
                          {firstDate && (
                            <XStack alignItems="center" gap={4}>
                              <Clock size={10} color="#1D3557" />
                              <Text fontSize={11} color="$royalBlue" fontWeight="600">
                                {formatDay(firstDate.date)} {formatMonth(firstDate.date)} · {firstDate.time}
                              </Text>
                            </XStack>
                          )}
                        </YStack>
                      </YStack>

                      {/* Ticket Stub */}
                      <YStack
                        width={68}
                        backgroundColor={stubColor}
                        alignItems="center"
                        justifyContent="center"
                        gap={4}
                        position="relative"
                      >
                        {/* Perforations */}
                        <YStack position="absolute" left={-7} top={0} bottom={0} justifyContent="space-between" paddingVertical={6}>
                          {[0, 1, 2, 3].map((i) => (
                            <YStack key={i} width={14} height={14} borderRadius={7} backgroundColor="$background" />
                          ))}
                        </YStack>
                        <Ticket size={20} color="white" />
                        <Text fontSize={8} fontWeight="900" textTransform="uppercase" color="white" letterSpacing={0.5}>
                          Entrar
                        </Text>
                      </YStack>
                    </XStack>
                  </Pressable>
                </Animated.View>
              )
            }}
          />
          )}
          </Animated.View>
        )}
      </YStack>
    </YStack>
  )
}
