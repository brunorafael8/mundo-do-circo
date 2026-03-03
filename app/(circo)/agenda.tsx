import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Calendar } from '@tamagui/lucide-icons'
import { AgendaView } from '../../src/components/shared/AgendaView'

export default function CircoAgendaScreen() {
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} backgroundColor="$background">
      <XStack
        paddingTop={insets.top + 12}
        paddingHorizontal="$4"
        paddingBottom="$3"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <YStack>
          <Text fontSize={12} color="$circusRed" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
            Gerenciar
          </Text>
          <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
            Agenda de Shows
          </Text>
        </YStack>
        <YStack backgroundColor="#E6394622" padding="$2" borderRadius="$10">
          <Calendar size={22} color="$circusRed" />
        </YStack>
      </XStack>

      <AgendaView showRoute="/(circo)/(shows)/[id]" />
    </YStack>
  )
}
