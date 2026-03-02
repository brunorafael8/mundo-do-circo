import { YStack, Text } from 'tamagui'

export default function AdminLayout() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <Text fontFamily="$heading" fontSize={24} fontWeight="700">
        Admin
      </Text>
      <Text fontSize={14} color="$textMuted" marginTop="$2">
        Em desenvolvimento
      </Text>
    </YStack>
  )
}
