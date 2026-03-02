import { XStack, YStack, Text, type XStackProps } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface MCHeaderProps extends XStackProps {
  title: string
  subtitle?: string
  leftAction?: React.ReactNode
  rightAction?: React.ReactNode
}

export function MCHeader({
  title,
  subtitle,
  leftAction,
  rightAction,
  ...props
}: MCHeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <XStack
      paddingTop={insets.top + 8}
      paddingBottom={12}
      paddingHorizontal="$4"
      backgroundColor="$background"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      {leftAction ?? <XStack width={40} />}
      <YStack flex={1} alignItems="center" marginHorizontal="$2">
        <Text
          fontFamily="$heading"
          fontSize={18}
          fontWeight="700"
          color="$color"
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text fontSize={13} color="$textMuted" marginTop={2}>
            {subtitle}
          </Text>
        )}
      </YStack>
      {rightAction ?? <XStack width={40} />}
    </XStack>
  )
}
