import { useCallback, useMemo, useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Plus, Clapperboard, Search, Users, Ticket, CalendarCheck, CalendarClock } from '@tamagui/lucide-icons'
import { useShows } from '../../../src/features/shows/hooks'
import { ShowListItem } from '../../../src/components/circo/ShowListItem'
import { MCLoading } from '../../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../../src/components/ui/MCEmptyState'
import type { Show } from '../../../src/features/shows/types'

type ShowFilter = 'upcoming' | 'past'

const keyExtractor = (item: Show) => item.id

export default function ShowsListScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: shows, isLoading } = useShows()
  const [filter, setFilter] = useState<ShowFilter>('upcoming')

  const handleShowPress = useCallback((id: string) => {
    router.push(`/(circo)/(shows)/${id}`)
  }, [router])

  const today = useMemo(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }, [])

  const { filteredShows, upcomingCount, pastCount } = useMemo(() => {
    if (!shows || shows.length === 0) return { filteredShows: [], upcomingCount: 0, pastCount: 0 }

    const upcoming: Show[] = []
    const past: Show[] = []

    for (const show of shows) {
      const lastDate = show.dates.length > 0
        ? show.dates[show.dates.length - 1].date
        : ''
      if (lastDate >= today) {
        upcoming.push(show)
      } else {
        past.push(show)
      }
    }

    return {
      filteredShows: filter === 'upcoming' ? upcoming : past,
      upcomingCount: upcoming.length,
      pastCount: past.length,
    }
  }, [shows, filter, today])

  const stats = useMemo(() => {
    if (filteredShows.length === 0) return null
    const totalSold = filteredShows.reduce((sum, s) => sum + s.soldCount, 0)
    const totalCapacity = filteredShows.reduce((sum, s) => sum + s.capacity, 0)
    const avgOccupancy = Math.round((totalSold / totalCapacity) * 100)
    return { totalSold, avgOccupancy, count: filteredShows.length }
  }, [filteredShows])

  const renderItem = useCallback(({ item, index }: { item: Show; index: number }) => (
    <Animated.View entering={FadeInUp.duration(280).delay(index * 70)}>
      <ShowListItem show={item} onPress={handleShowPress} />
    </Animated.View>
  ), [handleShowPress])

  if (isLoading) {
    return <MCLoading />
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        paddingTop={insets.top + 12}
        paddingHorizontal="$4"
        paddingBottom="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        backgroundColor="$background"
      >
        <YStack>
          <Text fontSize={12} color="$circusRed" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
            Gerenciar
          </Text>
          <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
            Espetáculos
          </Text>
        </YStack>
        <YStack backgroundColor="#E6394622" padding="$2" borderRadius="$10" pressStyle={{ opacity: 0.7 }}>
          <Search size={22} color="$circusRed" />
        </YStack>
      </XStack>

      {/* Filter Tabs */}
      <XStack paddingHorizontal="$4" paddingTop="$3" paddingBottom="$2" gap="$2" backgroundColor="$background">
        <Pressable style={{ flex: 1 }} onPress={() => setFilter('upcoming')}>
          <XStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap="$2"
            paddingVertical="$2"
            borderRadius="$3"
            backgroundColor={filter === 'upcoming' ? '$darkNavy' : '$surface'}
            borderWidth={1}
            borderColor={filter === 'upcoming' ? '$darkNavy' : '$borderColor'}
          >
            <CalendarClock size={14} color={filter === 'upcoming' ? 'white' : '$textMuted'} />
            <Text fontSize={13} fontWeight="700" color={filter === 'upcoming' ? 'white' : '$textMuted'}>
              Próximos
            </Text>
            <YStack
              backgroundColor={filter === 'upcoming' ? '#ffffff33' : '$borderColor'}
              paddingHorizontal={6}
              paddingVertical={1}
              borderRadius={8}
            >
              <Text fontSize={11} fontWeight="800" color={filter === 'upcoming' ? 'white' : '$textMuted'}>
                {upcomingCount}
              </Text>
            </YStack>
          </XStack>
        </Pressable>

        <Pressable style={{ flex: 1 }} onPress={() => setFilter('past')}>
          <XStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap="$2"
            paddingVertical="$2"
            borderRadius="$3"
            backgroundColor={filter === 'past' ? '$darkNavy' : '$surface'}
            borderWidth={1}
            borderColor={filter === 'past' ? '$darkNavy' : '$borderColor'}
          >
            <CalendarCheck size={14} color={filter === 'past' ? 'white' : '$textMuted'} />
            <Text fontSize={13} fontWeight="700" color={filter === 'past' ? 'white' : '$textMuted'}>
              Realizados
            </Text>
            <YStack
              backgroundColor={filter === 'past' ? '#ffffff33' : '$borderColor'}
              paddingHorizontal={6}
              paddingVertical={1}
              borderRadius={8}
            >
              <Text fontSize={11} fontWeight="800" color={filter === 'past' ? 'white' : '$textMuted'}>
                {pastCount}
              </Text>
            </YStack>
          </XStack>
        </Pressable>
      </XStack>

      {/* Shows List */}
      <YStack flex={1}>
        {filteredShows.length === 0 ? (
          <MCEmptyState
            icon={<Clapperboard size={48} color="$textMuted" />}
            title={filter === 'upcoming' ? 'Nenhum show programado' : 'Nenhum show realizado'}
            description={filter === 'upcoming' ? 'Crie seu primeiro show e comece a vender ingressos.' : 'Shows realizados aparecerão aqui.'}
          />
        ) : (
          <FlatList
            data={filteredShows}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, gap: 16, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              stats ? (
                <Animated.View entering={FadeInUp.duration(300)}>
                  <XStack
                    backgroundColor="$surface"
                    borderRadius="$4"
                    padding="$3"
                    marginTop="$1"
                    marginBottom="$1"
                    justifyContent="space-around"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <YStack alignItems="center">
                      <XStack alignItems="center" gap="$1" marginBottom={2}>
                        <Ticket size={10} color="$circusRed" />
                        <Text fontSize={9} fontWeight="700" color="$textMuted" textTransform="uppercase">Shows</Text>
                      </XStack>
                      <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color">
                        {stats.count}
                      </Text>
                    </YStack>

                    <YStack width={1} backgroundColor="$borderColor" />

                    <YStack alignItems="center">
                      <XStack alignItems="center" gap="$1" marginBottom={2}>
                        <Users size={10} color="$royalBlue" />
                        <Text fontSize={9} fontWeight="700" color="$textMuted" textTransform="uppercase">Vendidos</Text>
                      </XStack>
                      <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color">
                        {stats.totalSold.toLocaleString('pt-BR')}
                      </Text>
                    </YStack>

                    <YStack width={1} backgroundColor="$borderColor" />

                    <YStack alignItems="center">
                      <XStack alignItems="center" gap="$1" marginBottom={2}>
                        <Users size={10} color="#2EC4B6" />
                        <Text fontSize={9} fontWeight="700" color="$textMuted" textTransform="uppercase">Ocupação</Text>
                      </XStack>
                      <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color">
                        {stats.avgOccupancy}%
                      </Text>
                    </YStack>
                  </XStack>
                </Animated.View>
              ) : null
            }
          />
        )}
      </YStack>

      {/* FAB */}
      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 72 }]}
        onPress={() => router.push('/(circo)/(shows)/create')}
      >
        <Plus size={28} color="white" />
      </Pressable>
    </YStack>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
})
