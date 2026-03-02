import { YStack, Text } from 'tamagui'

interface MCEmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function MCEmptyState({
  icon,
  title,
  description,
  action,
}: MCEmptyStateProps) {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$6"
      gap="$3"
    >
      {icon}
      <Text
        fontFamily="$heading"
        fontSize={20}
        fontWeight="700"
        color="$color"
        textAlign="center"
      >
        {title}
      </Text>
      {description && (
        <Text
          fontSize={15}
          color="$textMuted"
          textAlign="center"
          maxWidth={280}
        >
          {description}
        </Text>
      )}
      {action}
    </YStack>
  )
}
