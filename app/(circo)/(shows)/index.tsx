import { YStack, Text } from 'tamagui'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Plus, Clapperboard } from '@tamagui/lucide-icons'
import { useShows } from '../../../src/features/shows/hooks'
import { ShowListItem } from '../../../src/components/circo/ShowListItem'
import { MCLoading } from '../../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../../src/components/ui/MCEmptyState'
import type { Show } from '../../../src/features/shows/types'

export default function ShowsListScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: shows, isLoading } = useShows()

  const renderItem = ({ item }: { item: Show }) => (
    <ShowListItem
      show={item}
      onPress={() => router.push(`/(circo)/(shows)/${item.id}`)}
    />
  )

  if (isLoading) {
    return <MCLoading />
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <YStack paddingTop={insets.top + 8} paddingHorizontal="$4" paddingBottom="$3">
        <Text fontFamily="$heading" fontSize={24} fontWeight="800" color="$color">
          Meus Shows
        </Text>
      </YStack>

      {/* Shows List */}
      {!shows || shows.length === 0 ? (
        <MCEmptyState
          icon={<Clapperboard size={48} color="$textMuted" />}
          title="Nenhum show cadastrado"
          description="Crie seu primeiro show e comece a vender ingressos."
        />
      ) : (
        <FlatList
          data={shows}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <Pressable
        style={[styles.fab, { bottom: 24 }]}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
})
