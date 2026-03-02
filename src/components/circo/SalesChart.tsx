import { YStack, XStack, Text } from 'tamagui'
import { MCCard } from '../ui/MCCard'
import { formatCurrency } from '../../utils/formatters'
import type { Sale } from '../../features/circus/types'

interface SalesChartProps {
  sales: Sale[]
}

export function SalesChart({ sales }: SalesChartProps) {
  // Group sales by day for simple bar chart
  const dailySales = sales.reduce<Record<string, number>>((acc, sale) => {
    const day = sale.date.split('T')[0]
    acc[day] = (acc[day] || 0) + sale.totalPrice
    return acc
  }, {})

  const entries = Object.entries(dailySales).sort(([a], [b]) => a.localeCompare(b))
  const maxValue = Math.max(...entries.map(([, v]) => v), 1)
  const total = entries.reduce((sum, [, v]) => sum + v, 0)

  return (
    <MCCard variant="elevated" gap="$3">
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontFamily="$heading" fontSize={16} fontWeight="700">
          Vendas
        </Text>
        <Text fontSize={14} fontWeight="600" color="$primary">
          {formatCurrency(total)}
        </Text>
      </XStack>

      <XStack gap="$2" alignItems="flex-end" height={120}>
        {entries.map(([day, value]) => {
          const height = Math.max((value / maxValue) * 100, 4)
          const dayLabel = day.split('-')[2]
          return (
            <YStack key={day} flex={1} alignItems="center" gap="$1">
              <YStack
                height={height}
                width="100%"
                maxWidth={32}
                backgroundColor="$primary"
                borderRadius={6}
                opacity={0.85}
              />
              <Text fontSize={10} color="$textMuted">
                {dayLabel}
              </Text>
            </YStack>
          )
        })}
      </XStack>
    </MCCard>
  )
}
