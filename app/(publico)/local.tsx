import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useShows } from '../../src/features/shows/hooks'
import { CircusMap } from '../../src/components/publico/CircusMap'
import { MCLoading } from '../../src/components/ui/MCLoading'

export default function LocalScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: shows, isLoading } = useShows()

  return (
    <YStack flex={1} backgroundColor="$background">
      <XStack
        paddingTop={insets.top + 8}
        paddingHorizontal="$4"
        paddingBottom="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        backgroundColor="$background"
      >
        <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
          Perto de Voce
        </Text>
        <Text fontSize={13} color="$textMuted">
          {shows?.length ?? 0} espetaculos
        </Text>
      </XStack>

      <YStack flex={1} padding="$3">
        {isLoading ? (
          <MCLoading />
        ) : (
          <Animated.View entering={FadeInUp.duration(400)} style={{ flex: 1 }}>
            <CircusMap
              shows={shows ?? []}
              onShowPress={(show) =>
                router.push(`/(publico)/(home)/show/${show.id}`)
              }
            />
          </Animated.View>
        )}
      </YStack>
    </YStack>
  )
}
