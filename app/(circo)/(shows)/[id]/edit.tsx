import { Alert } from 'react-native'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useShow } from '../../../../src/features/shows/hooks'
import { ShowForm, type ShowFormData } from '../../../../src/components/circo/ShowForm'
import { MCLoading } from '../../../../src/components/ui/MCLoading'

export default function EditShowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: show, isLoading } = useShow(id ?? '')

  if (isLoading) {
    return <MCLoading />
  }

  if (!show) return null

  const handleSubmit = (data: ShowFormData) => {
    console.log('Show atualizado:', { id, ...data })
    Alert.alert('Sucesso', 'Show atualizado com sucesso!', [
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
          Editar Show
        </Text>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ShowForm
          initialData={{
            title: show.title,
            description: show.description,
            category: show.category,
            date: show.dates[0]?.date ?? '',
            time: show.dates[0]?.time ?? '',
            price: show.price.toString(),
            capacity: show.capacity.toString(),
            location: show.location,
            ageRating: show.ageRating,
          }}
          onSubmit={handleSubmit}
          submitLabel="Salvar Alteracoes"
        />
      </ScrollView>
    </YStack>
  )
}
