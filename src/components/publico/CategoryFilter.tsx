import { memo, useEffect } from 'react'
import { ScrollView, Pressable, Text as RNText } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolateColor,
} from 'react-native-reanimated'
import { YStack, Text } from 'tamagui'
import { mockCategories } from '../../mocks/categories'
import type { ShowCategory } from '../../features/shows/types'

const CATEGORY_EMOJI: Record<ShowCategory, string> = {
  acrobacia: '🤸',
  palhaco: '🤡',
  magica: '🎩',
  aereo: '🎭',
  musical: '🎵',
  infantil: '🧸',
  malabarismo: '🤹',
  fogo: '🔥',
}

interface CategoryFilterProps {
  selected?: ShowCategory
  onSelect: (category: ShowCategory | undefined) => void
}

const CategoryAllItem = memo(function CategoryAllItem({
  selected, onSelect,
}: { selected?: ShowCategory; onSelect: () => void }) {
  const isSelected = !selected
  const progress = useSharedValue(isSelected ? 1 : 0)
  const scale = useSharedValue(1)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 220 })
  }, [isSelected])

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#FFFFFF', '#E63946']),
    borderColor: interpolateColor(progress.value, [0, 1], ['#1D3557', '#E63946']),
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  } as any))

  return (
    <YStack alignItems="center" gap={6} width={72}>
      <Pressable
        onPress={onSelect}
        onPressIn={() => { scale.value = withSpring(0.88) }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }) }}
      >
        <Animated.View style={circleStyle}>
          <RNText style={{ fontSize: 28 }}>⭐</RNText>
        </Animated.View>
      </Pressable>
      <Text fontSize={9} fontWeight="700" textTransform="uppercase" letterSpacing={1} color="$gray700">
        TODOS
      </Text>
    </YStack>
  )
})

const CategoryItem = memo(function CategoryItem({
  cat, selected, onSelect,
}: {
  cat: typeof mockCategories[0]
  selected?: ShowCategory
  onSelect: (id: ShowCategory) => void
}) {
  const isSelected = selected === cat.id
  const progress = useSharedValue(isSelected ? 1 : 0)
  const scale = useSharedValue(1)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: 220 })
  }, [isSelected])

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#FFFFFF', '#E63946']),
    borderColor: interpolateColor(progress.value, [0, 1], ['#1D3557', '#E63946']),
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  } as any))

  return (
    <YStack alignItems="center" gap={6} width={72}>
      <Pressable
        onPress={() => onSelect(cat.id)}
        onPressIn={() => { scale.value = withSpring(0.88) }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }) }}
      >
        <Animated.View style={circleStyle}>
          <RNText style={{ fontSize: 28 }}>
            {CATEGORY_EMOJI[cat.id]}
          </RNText>
        </Animated.View>
      </Pressable>
      <Text fontSize={9} fontWeight="700" textTransform="uppercase" letterSpacing={1} color="$gray700">
        {cat.label}
      </Text>
    </YStack>
  )
})

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
    >
      <CategoryAllItem selected={selected} onSelect={() => onSelect(undefined)} />
      {mockCategories.map((cat) => (
        <CategoryItem key={cat.id} cat={cat} selected={selected} onSelect={onSelect} />
      ))}
    </ScrollView>
  )
}
