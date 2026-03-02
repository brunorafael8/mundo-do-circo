import { YStack, XStack, Text } from 'tamagui'
import { MCCard } from '../ui/MCCard'
import { TrendingUp, TrendingDown } from '@tamagui/lucide-icons'

interface KPICardProps {
  title: string
  value: string
  change?: number
  icon?: React.ReactNode
}

export function KPICard({ title, value, change, icon }: KPICardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <MCCard variant="elevated" flex={1} minWidth={150} gap="$2">
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontSize={12} color="$textMuted" fontWeight="500">
          {title}
        </Text>
        {icon}
      </XStack>
      <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$color">
        {value}
      </Text>
      {change !== undefined && (
        <XStack alignItems="center" gap={4}>
          {isPositive ? (
            <TrendingUp size={14} color="$success" />
          ) : (
            <TrendingDown size={14} color="$error" />
          )}
          <Text
            fontSize={12}
            fontWeight="600"
            color={isPositive ? '$success' : '$error'}
          >
            {isPositive ? '+' : ''}
            {change.toFixed(1)}%
          </Text>
        </XStack>
      )}
    </MCCard>
  )
}
