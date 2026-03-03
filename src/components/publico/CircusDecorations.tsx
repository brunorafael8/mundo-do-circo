import { useEffect, memo } from 'react'
import { View, StyleSheet, Text as RNText } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated'

interface FloatingDot {
  color: string
  size: number
  x: number
  y: number
  duration: number
  delay: number
  distance: number
  isStar?: boolean
}

const FLOATING_ITEMS: FloatingDot[] = [
  { color: '#E63946', size: 8, x: 6, y: 12, duration: 3200, delay: 0, distance: 14 },
  { color: '#FFB800', size: 16, x: 90, y: 8, duration: 2800, delay: 300, distance: 10, isStar: true },
  { color: '#FFB800', size: 6, x: 94, y: 48, duration: 2600, delay: 500, distance: 12 },
  { color: '#E63946', size: 14, x: 4, y: 58, duration: 3400, delay: 200, distance: 16, isStar: true },
  { color: '#1D3557', size: 7, x: 80, y: 68, duration: 3000, delay: 400, distance: 10 },
  { color: '#E63946', size: 5, x: 20, y: 76, duration: 2900, delay: 600, distance: 12 },
  { color: '#FFB800', size: 5, x: 52, y: 4, duration: 2400, delay: 100, distance: 8 },
  { color: '#1D3557', size: 6, x: 68, y: 32, duration: 3100, delay: 700, distance: 14 },
  { color: '#FFB800', size: 4, x: 38, y: 88, duration: 2700, delay: 350, distance: 10 },
  { color: '#E63946', size: 12, x: 96, y: 80, duration: 3300, delay: 150, distance: 11, isStar: true },
]

const FloatingItem = memo(function FloatingItem({ item }: { item: FloatingDot }) {
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0.15)
  const scale = useSharedValue(1)

  useEffect(() => {
    translateY.value = withDelay(
      item.delay,
      withRepeat(
        withSequence(
          withTiming(-item.distance, {
            duration: item.duration / 2,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(item.distance, {
            duration: item.duration / 2,
            easing: Easing.inOut(Easing.sin),
          })
        ),
        -1,
        true
      )
    )

    opacity.value = withDelay(
      item.delay,
      withRepeat(
        withSequence(
          withTiming(0.55, { duration: item.duration * 0.6, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.15, { duration: item.duration * 0.4, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    )

    scale.value = withDelay(
      item.delay,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: item.duration * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.7, { duration: item.duration * 0.5, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${item.x}%` as any,
          top: `${item.y}%` as any,
        },
        animatedStyle,
      ]}
    >
      {item.isStar ? (
        <RNText style={{ fontSize: item.size, color: item.color, lineHeight: item.size + 2 }}>
          {'\u2605'}
        </RNText>
      ) : (
        <View
          style={{
            width: item.size,
            height: item.size,
            borderRadius: item.size / 2,
            backgroundColor: item.color,
          }}
        />
      )}
    </Animated.View>
  )
})

export function CircusDecorations() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {FLOATING_ITEMS.map((item, index) => (
        <FloatingItem key={index} item={item} />
      ))}
    </View>
  )
}
