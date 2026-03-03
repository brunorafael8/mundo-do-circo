import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { AgendaView } from '../../src/components/shared/AgendaView'

export default function AgendaScreen() {
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} backgroundColor="$background">
      <XStack
        paddingTop={insets.top + 8}
        paddingBottom={12}
        paddingHorizontal="$4"
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <YStack alignItems="center" justifyContent="center">
          <Image
            source={require('../../public/images/logo.png')}
            style={{ width: 140, height: 70 }}
            contentFit="contain"
          />
        </YStack>
      </XStack>

      <AgendaView showRoute="/(publico)/(home)/show/[id]" />
    </YStack>
  )
}
