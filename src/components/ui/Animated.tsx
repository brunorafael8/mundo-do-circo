import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'

// --- Reanimated: Animated Tamagui components (Cherry Studio pattern) ---
// Use with entering={FadeInDown} exiting={FadeOut} layout={LinearTransition}
export const AnimatedView = Animated.createAnimatedComponent(View)
export const AnimatedYStack = Animated.createAnimatedComponent(YStack)
export const AnimatedXStack = Animated.createAnimatedComponent(XStack)
export const AnimatedText = Animated.createAnimatedComponent(Text)

// --- Moti: Declarative animations (web + native) ---
// Use for state-driven animations, AnimatePresence, loops
export { MotiView, MotiText, MotiImage } from 'moti'
export { AnimatePresence } from 'moti'
