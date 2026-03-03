import { useState, memo, useCallback } from 'react'
import { FlatList } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Filter, TrendingUp, DollarSign, Ticket, Calendar, Users, MapPin, Download } from '@tamagui/lucide-icons'
import { Alert } from 'react-native'
import { useSales, useCircusStats } from '../../src/features/circus/hooks'
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

const TICKET_TYPE_LABEL: Record<string, string> = {
  pista: 'Pista',
  vip: 'VIP',
  camarote: 'Camarote',
}

const TICKET_TYPE_COLOR: Record<string, string> = {
  pista: '$royalBlue',
  vip: '$circusRed',
  camarote: '$sunshineYellowDark',
}

const TransactionCard = memo(function TransactionCard({ item }: { item: Sale }) {
  return (
    <MCCard variant="bordered" padding="$3">
      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={2}>
          <Text fontSize={14} fontWeight="600" color="$color" numberOfLines={1}>
            {item.showTitle}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Text fontSize={12} color="$textMuted">
              {item.buyerName} · {item.quantity}x
            </Text>
            {item.ticketType && (
              <YStack
                backgroundColor={
                  item.ticketType === 'vip' ? '#E6394618' :
                  item.ticketType === 'camarote' ? '#FFB80018' : '#1D355718'
                }
                paddingHorizontal="$1"
                paddingVertical={1}
                borderRadius="$2"
              >
                <Text
                  fontSize={9}
                  fontWeight="800"
                  color={TICKET_TYPE_COLOR[item.ticketType] ?? '$textMuted'}
                  textTransform="uppercase"
                >
                  {TICKET_TYPE_LABEL[item.ticketType] ?? item.ticketType}
                </Text>
              </YStack>
            )}
          </XStack>
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
})

const renderTransaction = ({ item, index }: { item: Sale; index: number }) => (
  <Animated.View entering={FadeInUp.duration(260).delay(index * 60)}>
    <TransactionCard item={item} />
  </Animated.View>
)

export default function SalesScreen() {
  const insets = useSafeAreaInsets()
  const [period, setPeriod] = useState<SalesPeriod>('30d')
  const { data: sales, isLoading: salesLoading } = useSales(period)
  const { data: stats, isLoading: statsLoading } = useCircusStats()

  const keyExtractor = useCallback((item: Sale) => item.id, [])

  if (salesLoading || statsLoading) {
    return <MCLoading />
  }

  const maxCityRevenue = stats ? Math.max(...stats.revenueByCity.map((c) => c.revenue)) : 1

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        paddingTop={insets.top + 12}
        paddingHorizontal="$4"
        paddingBottom="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        backgroundColor="$background"
        zIndex={10}
      >
        <YStack>
          <Text fontSize={12} color="$circusRed" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
            Financeiro
          </Text>
          <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
            Visão de Vendas
          </Text>
        </YStack>
        <YStack backgroundColor="#E6394622" padding="$2" borderRadius="$10">
          <Filter size={22} color="$circusRed" />
        </YStack>
      </XStack>

      <FlatList
        data={sales ?? []}
        renderItem={renderTransaction}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <YStack height={12} />}
        ListHeaderComponent={
          <YStack gap="$4" marginBottom="$6" marginTop="$4">

            {/* Period Selector */}
            <XStack gap="$2">
              {PERIODS.map((p) => (
                <YStack
                  key={p.value}
                  flex={1}
                  paddingVertical="$2"
                  borderRadius="$3"
                  backgroundColor={period === p.value ? '$darkNavy' : '$surface'}
                  borderWidth={1}
                  borderColor={period === p.value ? '$darkNavy' : '$borderColor'}
                  alignItems="center"
                  pressStyle={{ opacity: 0.8 }}
                  onPress={() => setPeriod(p.value)}
                >
                  <Text
                    fontSize={13}
                    fontWeight="700"
                    color={period === p.value ? '$white' : '$textMuted'}
                  >
                    {p.label}
                  </Text>
                </YStack>
              ))}
            </XStack>

            {/* KPI Cards */}
            <Animated.View entering={FadeInUp.duration(380).delay(80)}>
            {stats && (
              <XStack gap="$3">
                <YStack flex={1} gap="$1" padding="$3" backgroundColor="$surface" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="center" gap="$2">
                    <YStack width={28} height={28} borderRadius={14} backgroundColor="#E6394618" alignItems="center" justifyContent="center">
                      <DollarSign size={14} color="$circusRed" />
                    </YStack>
                    <Text fontSize={11} fontWeight="600" color="$textMuted">Receita</Text>
                  </XStack>
                  <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                    {formatCurrency(stats.totalRevenue)}
                  </Text>
                  <XStack alignItems="center" gap="$1">
                    <TrendingUp size={10} color="$success" />
                    <Text fontSize={11} fontWeight="700" color="$success">+{stats.revenueChange}%</Text>
                  </XStack>
                </YStack>

                <YStack flex={1} gap="$1" padding="$3" backgroundColor="$surface" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="center" gap="$2">
                    <YStack width={28} height={28} borderRadius={14} backgroundColor="#1D355718" alignItems="center" justifyContent="center">
                      <Ticket size={14} color="$royalBlue" />
                    </YStack>
                    <Text fontSize={11} fontWeight="600" color="$textMuted">Ingressos</Text>
                  </XStack>
                  <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                    {stats.ticketsSold.toLocaleString('pt-BR')}
                  </Text>
                  <XStack alignItems="center" gap="$1">
                    <TrendingUp size={10} color="$success" />
                    <Text fontSize={11} fontWeight="700" color="$success">+{stats.ticketsChange}%</Text>
                  </XStack>
                </YStack>
              </XStack>
            )}
            </Animated.View>

            {/* Revenue by Location */}
            <Animated.View entering={FadeInUp.duration(380).delay(200)}>
            {stats && (
              <YStack backgroundColor="$surface" borderRadius="$4" padding="$4" borderWidth={1} borderColor="$borderColor">
                <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color">
                    Receita por Local
                  </Text>
                  <XStack alignItems="center" gap="$1">
                    <MapPin size={12} color="$textMuted" />
                    <Text fontSize={12} fontWeight="600" color="$textMuted">São Paulo</Text>
                  </XStack>
                </XStack>

                <YStack gap="$3">
                  {stats.revenueByCity.map((city, i) => {
                    const barWidth = Math.max((city.revenue / maxCityRevenue) * 100, 8)
                    const colors = ['$circusRed', '$royalBlue', '$sunshineYellowDark']
                    const bgColors = ['#E6394622', '#1D355722', '#FFB80022']
                    return (
                      <YStack key={city.city} gap="$1">
                        <XStack justifyContent="space-between" alignItems="center">
                          <Text fontSize={13} fontWeight="700" color="$color">{city.city}</Text>
                          <Text fontSize={13} fontWeight="800" color={colors[i] ?? '$color'}>
                            {formatCurrency(city.revenue)}
                          </Text>
                        </XStack>
                        <YStack width="100%" height={8} backgroundColor={bgColors[i] ?? '$borderColor'} borderRadius="$10" overflow="hidden">
                          <YStack height="100%" width={`${barWidth}%`} backgroundColor={colors[i] ?? '$circusRed'} borderRadius="$10" />
                        </YStack>
                        <Text fontSize={10} color="$textMuted" fontWeight="500">
                          {city.tickets.toLocaleString('pt-BR')} ingressos
                        </Text>
                      </YStack>
                    )
                  })}
                </YStack>
              </YStack>
            )}
            </Animated.View>

            {/* Daily Sales Chart */}
            <Animated.View entering={FadeInUp.duration(380).delay(300)}>
            {sales && sales.length > 0 && (() => {
              const dailyMap: Record<string, { revenue: number; count: number }> = {}
              const now = new Date()
              for (let d = 6; d >= 0; d--) {
                const date = new Date(now)
                date.setDate(date.getDate() - d)
                const key = date.toISOString().split('T')[0]
                dailyMap[key] = { revenue: 0, count: 0 }
              }
              for (const sale of sales) {
                const key = sale.date.split('T')[0]
                if (dailyMap[key]) {
                  dailyMap[key].revenue += sale.totalPrice
                  dailyMap[key].count += sale.quantity
                }
              }
              const days = Object.entries(dailyMap)
              const maxRevenue = Math.max(...days.map(([, v]) => v.revenue), 1)
              const totalWeek = days.reduce((sum, [, v]) => sum + v.revenue, 0)

              return (
                <YStack backgroundColor="$surface" borderRadius="$4" padding="$4" borderWidth={1} borderColor="$borderColor">
                  <XStack alignItems="center" justifyContent="space-between" marginBottom="$1">
                    <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color">
                      Vendas Diárias
                    </Text>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="900" color="$circusRed">
                      {formatCurrency(totalWeek)}
                    </Text>
                  </XStack>
                  <Text fontSize={11} color="$textMuted" marginBottom="$4">Últimos 7 dias</Text>

                  <XStack height={120} width="100%" alignItems="flex-end" justifyContent="space-between" gap="$2" paddingHorizontal="$1">
                    {days.map(([date, data], i) => {
                      const barHeight = data.revenue > 0 ? Math.max(Math.round((data.revenue / maxRevenue) * 100), 6) : 4
                      const isToday = i === days.length - 1
                      const dayLabel = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
                      return (
                        <YStack key={date} flex={1} alignItems="center" gap="$1">
                          {data.revenue > 0 && (
                            <Text fontSize={8} fontWeight="700" color={isToday ? '$circusRed' : '$textMuted'}>
                              {data.count}
                            </Text>
                          )}
                          <YStack
                            width="100%"
                            maxWidth={30}
                            height={barHeight}
                            backgroundColor={data.revenue > 0 ? (isToday ? '$circusRed' : '#E6394666') : '$borderColor'}
                            borderTopLeftRadius="$2"
                            borderTopRightRadius="$2"
                          />
                          <Text fontSize={9} fontWeight={isToday ? '800' : '600'} color={isToday ? '$circusRed' : '$textMuted'} textTransform="capitalize">
                            {dayLabel}
                          </Text>
                        </YStack>
                      )
                    })}
                  </XStack>

                  <XStack justifyContent="space-between" marginTop="$3" paddingTop="$3" borderTopWidth={1} borderTopColor="$borderColor">
                    <YStack alignItems="center" flex={1}>
                      <Text fontSize={10} color="$textMuted">Ticket Médio</Text>
                      <Text fontSize={14} fontWeight="800" color="$color">
                        {formatCurrency(totalWeek / Math.max(days.reduce((s, [, v]) => s + v.count, 0), 1))}
                      </Text>
                    </YStack>
                    <YStack width={1} backgroundColor="$borderColor" />
                    <YStack alignItems="center" flex={1}>
                      <Text fontSize={10} color="$textMuted">Ingressos</Text>
                      <Text fontSize={14} fontWeight="800" color="$color">
                        {days.reduce((s, [, v]) => s + v.count, 0)}
                      </Text>
                    </YStack>
                    <YStack width={1} backgroundColor="$borderColor" />
                    <YStack alignItems="center" flex={1}>
                      <Text fontSize={10} color="$textMuted">Melhor Dia</Text>
                      <Text fontSize={14} fontWeight="800" color="$circusRed">
                        {formatCurrency(maxRevenue)}
                      </Text>
                    </YStack>
                  </XStack>
                </YStack>
              )
            })()}
            </Animated.View>

            {/* Ticket Type Breakdown */}
            <Animated.View entering={FadeInUp.duration(380).delay(400)}>
            {stats && (() => {
              const total = stats.ticketTypeBreakdown.pista + stats.ticketTypeBreakdown.vip + stats.ticketTypeBreakdown.camarote
              const types = [
                { label: 'Pista', value: stats.ticketTypeBreakdown.pista, bgColor: '#1D3557' },
                { label: 'VIP', value: stats.ticketTypeBreakdown.vip, bgColor: '#E63946' },
                { label: 'Camarote', value: stats.ticketTypeBreakdown.camarote, bgColor: '#E5A600' },
              ]
              return (
                <YStack backgroundColor="$surface" borderRadius="$4" padding="$4" borderWidth={1} borderColor="$borderColor">
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color" marginBottom="$4">
                    Tipo de Ingresso
                  </Text>
                  <XStack height={12} borderRadius="$10" overflow="hidden" marginBottom="$3">
                    {types.map((t) => (
                      <YStack key={t.label} flex={t.value / total} backgroundColor={t.bgColor} />
                    ))}
                  </XStack>
                  <XStack justifyContent="space-between">
                    {types.map((t) => (
                      <YStack key={t.label} alignItems="center" gap={2}>
                        <XStack alignItems="center" gap="$1">
                          <YStack width={8} height={8} borderRadius={4} backgroundColor={t.bgColor} />
                          <Text fontSize={11} fontWeight="600" color="$textMuted">{t.label}</Text>
                        </XStack>
                        <Text fontSize={16} fontWeight="800" color="$color">
                          {t.value.toLocaleString('pt-BR')}
                        </Text>
                        <Text fontSize={10} color="$textMuted">
                          {((t.value / total) * 100).toFixed(0)}%
                        </Text>
                      </YStack>
                    ))}
                  </XStack>
                </YStack>
              )
            })()}
            </Animated.View>

            {/* Payout Info */}
            <Animated.View entering={FadeInUp.duration(380).delay(500)}>
            <YStack backgroundColor="#E6394611" borderRadius="$4" padding="$4" borderWidth={1} borderColor="#E6394633">
              <XStack justifyContent="space-between" alignItems="flex-start" marginBottom="$3">
                <YStack>
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$circusRed">
                    Próximo Repasse
                  </Text>
                  <Text fontSize={12} color="$textMuted">
                    Agendado para 08/03/2026
                  </Text>
                </YStack>
                <MCBadge label="Pendente" variant="warning" />
              </XStack>

              <XStack alignItems="baseline" gap="$1" marginBottom="$3">
                <Text fontSize={14} fontWeight="800" color="$color">R$</Text>
                <Text fontFamily="$heading" fontSize={28} fontWeight="900" color="$color">3.240,00</Text>
              </XStack>

              <YStack backgroundColor="$circusRed" paddingVertical="$3" borderRadius="$4" alignItems="center" pressStyle={{ opacity: 0.8 }}>
                <Text color="$white" fontSize={14} fontWeight="800" textTransform="uppercase" letterSpacing={1}>
                  Ver Detalhes
                </Text>
              </YStack>
            </YStack>
            </Animated.View>

            {/* Transactions Header */}
            <XStack alignItems="center" justifyContent="space-between" marginTop="$2">
              <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
                Transações Recentes
              </Text>
              <XStack
                alignItems="center"
                gap="$2"
                backgroundColor="$darkNavy"
                paddingHorizontal="$3"
                paddingVertical="$2"
                borderRadius="$3"
                pressStyle={{ opacity: 0.8 }}
                onPress={() => Alert.alert('Exportar Excel', 'Relatório de vendas exportado com sucesso!')}
              >
                <Download size={14} color="white" />
                <Text fontSize={12} fontWeight="700" color="white">Exportar</Text>
              </XStack>
            </XStack>
          </YStack>
        }
      />
    </YStack>
  )
}
