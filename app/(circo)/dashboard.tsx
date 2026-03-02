import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Image } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DollarSign, Ticket, Star, ThumbsUp } from '@tamagui/lucide-icons'
import { useCircusStats, useCircusProfile, useSales } from '../../src/features/circus/hooks'
import { KPICard } from '../../src/components/circo/KPICard'
import { MCCard } from '../../src/components/ui/MCCard'
import { MCButton } from '../../src/components/ui/MCButton'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { formatCurrency, formatDateTime } from '../../src/utils/formatters'
import { MCBadge } from '../../src/components/ui/MCBadge'

export default function DashboardScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: stats, isLoading: statsLoading } = useCircusStats()
  const { data: profile, isLoading: profileLoading } = useCircusProfile()
  const { data: sales, isLoading: salesLoading } = useSales()

  if (statsLoading || profileLoading) {
    return <MCLoading />
  }

  if (!stats || !profile) return null

  const recentSales = (sales ?? []).slice(0, 5)

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingTop={insets.top + 8} padding="$4" gap="$4">
          {/* Header */}
          <XStack alignItems="center" gap="$3">
            <Image
              source={{ uri: profile.logoUrl }}
              width={48}
              height={48}
              borderRadius={24}
              resizeMode="cover"
            />
            <YStack flex={1}>
              <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$color">
                {profile.name}
              </Text>
              <Text fontSize={13} color="$textMuted">
                {profile.city}
              </Text>
            </YStack>
          </XStack>

          {/* KPI Grid */}
          <YStack gap="$3">
            <XStack gap="$3">
              <KPICard
                title="Receita"
                value={formatCurrency(stats.totalRevenue)}
                change={stats.revenueChange}
                icon={<DollarSign size={16} color="$textMuted" />}
              />
              <KPICard
                title="Ingressos"
                value={stats.ticketsSold.toString()}
                change={stats.ticketsChange}
                icon={<Ticket size={16} color="$textMuted" />}
              />
            </XStack>
            <XStack gap="$3">
              <KPICard
                title="Shows Ativos"
                value={stats.activeShows.toString()}
                change={stats.showsChange}
                icon={<Star size={16} color="$textMuted" />}
              />
              <KPICard
                title="Avaliacao"
                value={stats.averageRating.toFixed(1)}
                change={stats.ratingChange}
                icon={<ThumbsUp size={16} color="$textMuted" />}
              />
            </XStack>
          </YStack>

          {/* Recent Sales */}
          <YStack gap="$3">
            <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
              Vendas Recentes
            </Text>
            {salesLoading ? (
              <MCLoading message="Carregando vendas..." />
            ) : (
              <MCCard variant="elevated" gap="$2" padding="$3">
                {recentSales.map((sale, index) => (
                  <YStack key={sale.id}>
                    <XStack alignItems="center" justifyContent="space-between" paddingVertical="$2">
                      <YStack flex={1} gap={2}>
                        <Text fontSize={14} fontWeight="600" color="$color" numberOfLines={1}>
                          {sale.showTitle}
                        </Text>
                        <Text fontSize={12} color="$textMuted">
                          {sale.buyerName} - {sale.quantity}x
                        </Text>
                      </YStack>
                      <YStack alignItems="flex-end" gap={2}>
                        <Text fontSize={14} fontWeight="700" color="$primary">
                          {formatCurrency(sale.totalPrice)}
                        </Text>
                        <MCBadge
                          label={sale.status === 'completed' ? 'Pago' : sale.status === 'pending' ? 'Pendente' : 'Reembolso'}
                          variant={sale.status === 'completed' ? 'success' : sale.status === 'pending' ? 'warning' : 'error'}
                        />
                      </YStack>
                    </XStack>
                    {index < recentSales.length - 1 && (
                      <YStack height={1} backgroundColor="$borderColor" />
                    )}
                  </YStack>
                ))}
              </MCCard>
            )}
          </YStack>

          {/* Quick Actions */}
          <YStack gap="$3">
            <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
              Acoes Rapidas
            </Text>
            <XStack gap="$3">
              <MCButton
                variant="primary"
                size="md"
                flex={1}
                onPress={() => router.push('/(circo)/(shows)/create')}
              >
                Criar Show
              </MCButton>
              <MCButton
                variant="outline"
                size="md"
                flex={1}
                onPress={() => router.push('/(circo)/sales')}
              >
                Ver Vendas
              </MCButton>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
