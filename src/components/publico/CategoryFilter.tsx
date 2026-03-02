import { ScrollView } from 'react-native'
import { XStack, YStack, Text } from 'tamagui'
import { mockCategories } from '../../mocks/categories'
import type { ShowCategory } from '../../features/shows/types'

interface CategoryFilterProps {
  selected?: ShowCategory
  onSelect: (category: ShowCategory | undefined) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        borderRadius={20}
        backgroundColor={!selected ? '$primary' : '$surface'}
        borderWidth={1}
        borderColor={!selected ? '$primary' : '$borderColor'}
        pressStyle={{ opacity: 0.8 }}
        onPress={() => onSelect(undefined)}
        cursor="pointer"
      >
        <Text
          fontSize={13}
          fontWeight="600"
          color={!selected ? 'white' : '$color'}
        >
          Todos
        </Text>
      </XStack>
      {mockCategories.map((cat) => (
        <XStack
          key={cat.id}
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderRadius={20}
          backgroundColor={selected === cat.id ? '$primary' : '$surface'}
          borderWidth={1}
          borderColor={selected === cat.id ? '$primary' : '$borderColor'}
          pressStyle={{ opacity: 0.8 }}
          onPress={() => onSelect(cat.id)}
          cursor="pointer"
          gap={6}
          alignItems="center"
        >
          <YStack
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={cat.color}
          />
          <Text
            fontSize={13}
            fontWeight="600"
            color={selected === cat.id ? 'white' : '$color'}
          >
            {cat.label}
          </Text>
        </XStack>
      ))}
    </ScrollView>
  )
}
