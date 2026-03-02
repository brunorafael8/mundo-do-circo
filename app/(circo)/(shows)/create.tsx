import { Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { ShowForm, type ShowFormData } from '../../../src/components/circo/ShowForm'

export default function CreateShowScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const handleSubmit = (data: ShowFormData) => {
    console.log('Show criado:', data)
    Alert.alert('Sucesso', 'Show criado com sucesso!', [
      { text: 'OK', onPress: () => router.back() },
    ])
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        paddingTop={insets.top + 8}
        paddingBottom={12}
        paddingHorizontal="$4"
        alignItems="center"
        gap="$3"
      >
        <XStack
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor="$surface"
          alignItems="center"
          justifyContent="center"
          onPress={() => router.back()}
          cursor="pointer"
          pressStyle={{ opacity: 0.7 }}
        >
          <ChevronLeft size={24} color="$color" />
        </XStack>
        <Text fontFamily="$heading" fontSize={20} fontWeight="700" color="$color">
          Novo Show
        </Text>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ShowForm onSubmit={handleSubmit} />
      </ScrollView>
    </YStack>
  )
}
