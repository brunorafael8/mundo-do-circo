import { useState } from 'react'
import { FlatList } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSales } from '../../src/features/circus/hooks'
import { SalesChart } from '../../src/components/circo/SalesChart'
import { MCCard } from '../../src/components/ui/MCCard'
import { MCBadge } from '../../src/components/ui/MCBadge'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { formatCurrency, formatDateTime } from '../../src/utils/formatters'
import type { SalesPeriod, Sale } from '../../src/features/circus/types'

const PERIODS: { label: string; value: SalesPeriod }[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: 'Tudo', value: 'all' },
]

export default function SalesScreen() {
  const insets = useSafeAreaInsets()
  const [period, setPeriod] = useState<SalesPeriod>('30d')
  const { data: sales, isLoading } = useSales(period)

  const renderTransaction = ({ item, index }: { item: Sale; index: number }) => (
    <MCCard variant="bordered" padding="$3" marginBottom={index === (sales?.length ?? 0) - 1 ? 0 : 12}>
      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={2}>
          <Text fontSize={14} fontWeight="600" color="$color" numberOfLines={1}>
            {item.showTitle}
          </Text>
          <Text fontSize={12} color="$textMuted">
            {item.buyerName} - {item.quantity}x
          </Text>
          <Text fontSize={11} color="$textMuted">
            {formatDateTime(item.date)}
          </Text>
        </YStack>
        <YStack alignItems="flex-end" gap="$1">
          <Text fontSize={15} fontWeight="700" color="$primary">
            {formatCurrency(item.totalPrice)}
          </Text>
          <MCBadge
            label={item.status === 'completed' ? 'Pago' : item.status === 'pending' ? 'Pendente' : 'Reembolso'}
            variant={item.status === 'completed' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
          />
        </YStack>
      </XStack>
    </MCCard>
  )

  if (isLoading) {
    return <MCLoading />
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <YStack paddingTop={insets.top + 8} paddingHorizontal="$4" paddingBottom="$3">
        <Text fontFamily="$heading" fontSize={24} fontWeight="800" color="$color">
          Vendas
        </Text>
      </YStack>

      <FlatList
        data={sales ?? []}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <YStack gap="$4" marginBottom="$4">
            {/* Period Filter */}
            <XStack gap="$2">
              {PERIODS.map((p) => (
                <XStack
                  key={p.value}
                  flex={1}
                  paddingVertical="$2"
                  borderRadius={12}
                  backgroundColor={period === p.value ? '$primary' : '$surface'}
                  borderWidth={1}
                  borderColor={period === p.value ? '$primary' : '$borderColor'}
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => setPeriod(p.value)}
                  cursor="pointer"
                  pressStyle={{ opacity: 0.8 }}
                >
                  <Text
                    fontSize={14}
                    fontWeight="600"
                    color={period === p.value ? 'white' : '$color'}
                  >
                    {p.label}
                  </Text>
                </XStack>
              ))}
            </XStack>

            {/* Chart */}
            <SalesChart sales={sales ?? []} />

            {/* Transactions Header */}
            <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
              Transacoes
            </Text>
          </YStack>
        }
      />
    </YStack>
  )
}
