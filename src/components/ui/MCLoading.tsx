import { YStack, Text, Spinner } from 'tamagui'

interface MCLoadingProps {
  message?: string
}

export function MCLoading({ message = 'Carregando...' }: MCLoadingProps) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$3">
      <Spinner size="large" color="$primary" />
      <Text fontSize={14} color="$textMuted">
        {message}
      </Text>
    </YStack>
  )
}
