import { View, Pressable, StyleSheet } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue, withSpring, useAnimatedStyle,
} from 'react-native-reanimated'
import { Home, Calendar, Ticket, MapPin, User } from '@tamagui/lucide-icons'

const TABS = [
  { route: '(home)', label: 'INÍCIO', Icon: Home },
  { route: 'agenda', label: 'AGENDA', Icon: Calendar },
  { route: 'tickets', label: null, Icon: Ticket },
  { route: 'local', label: 'LOCAL', Icon: MapPin },
  { route: 'profile', label: 'PERFIL', Icon: User },
] as const

const RED = '#E63946'
const NAVY = '#1D3557'
const INACTIVE = '#ADB5BD'
const BG = '#FFF8F0'

function RegularTab({
  config, focused, onPress,
}: {
  config: typeof TABS[number]
  focused: boolean
  onPress: () => void
}) {
  const scale = useSharedValue(1)
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  const { Icon } = config

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.85) }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }) }}
      style={styles.tab}
    >
      <Animated.View style={[styles.tabInner, animStyle]}>
        <Icon size={22} color={focused ? RED : INACTIVE} />
        <Animated.Text style={[styles.label, { color: focused ? RED : INACTIVE }]}>
          {config.label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}

function CenterFAB({ focused, onPress }: { focused: boolean; onPress: () => void }) {
  const scale = useSharedValue(1)
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={styles.fabWrapper}>
      <Pressable
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.88) }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 10, stiffness: 220 }) }}
      >
        <Animated.View style={[styles.fabCircle, animStyle, focused && styles.fabCircleFocused]}>
          <Ticket size={26} color="white" />
        </Animated.View>
      </Pressable>
    </View>
  )
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {TABS.map((config, index) => {
        const route = state.routes[index]
        if (!route) return null
        const focused = state.index === index
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name)
        }

        if (config.route === 'tickets') {
          return <CenterFAB key={route.key} focused={focused} onPress={onPress} />
        }

        return (
          <RegularTab
            key={route.key}
            config={config}
            focused={focused}
            onPress={onPress}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 8,
    // overflow visible so FAB can float above
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabInner: {
    alignItems: 'center',
    gap: 3,
    paddingBottom: 2,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    // push up above the tab bar
    marginTop: -28,
    paddingBottom: 4,
  },
  fabCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
    // ring border matching tab bar bg
    borderWidth: 4,
    borderColor: BG,
    shadowColor: RED,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
  },
  fabCircleFocused: {
    backgroundColor: NAVY,
    shadowColor: NAVY,
  },
})
