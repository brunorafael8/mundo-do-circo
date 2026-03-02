import { YStack, Text, Image } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { MCButton } from '../../src/components/ui/MCButton'

export default function LoginScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingTop={insets.top + 40}
      paddingHorizontal="$6"
      alignItems="center"
      justifyContent="center"
      gap="$6"
    >
      <YStack alignItems="center" gap="$3">
        <Text fontFamily="$heading" fontSize={36} fontWeight="800" color="$primary">
          Mundo do Circo
        </Text>
        <Text fontSize={16} color="$textMuted" textAlign="center">
          Descubra os melhores espetaculos de circo perto de voce
        </Text>
      </YStack>

      <YStack gap="$3" width="100%">
        <MCButton
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.replace('/(publico)/(home)')}
        >
          Entrar como Publico
        </MCButton>
        <MCButton
          variant="outline"
          size="lg"
          fullWidth
          onPress={() => router.replace('/(circo)/dashboard')}
        >
          Entrar como Circo
        </MCButton>
      </YStack>

      <Text fontSize={12} color="$textMuted" marginTop="$4">
        Login com Clerk sera implementado em breve
      </Text>
    </YStack>
  )
}
