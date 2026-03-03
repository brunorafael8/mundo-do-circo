import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  DollarSign,
  Ticket,
  Bell,
  MapPin,
  ArrowRight,
  TrendingUp,
  Users,
  Calendar,
} from '@tamagui/lucide-icons'
import { useCircusStats, useCircusProfile } from '../../src/features/circus/hooks'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { formatCurrency } from '../../src/utils/formatters'
import type { ItineraryStop } from '../../src/features/circus/types'

const CATEGORY_EMOJI: Record<string, string> = {
  aereo: '🎭',
  palhaco: '🤡',
  fogo: '🔥',
  infantil: '🧸',
  magica: '🎩',
  acrobacia: '🤸',
  malabarismo: '🤹',
  musical: '🎵',
}

function ItineraryDot({ stop, isLast }: { stop: ItineraryStop; isLast: boolean }) {
  const isCurrent = stop.status === 'current'
  const isCompleted = stop.status === 'completed'

  return (
    <XStack gap="$3" alignItems="flex-start">
      {/* Timeline dot + line */}
      <YStack alignItems="center" width={20}>
        <YStack
          width={isCurrent ? 16 : 10}
          height={isCurrent ? 16 : 10}
          borderRadius={isCurrent ? 8 : 5}
          backgroundColor={isCurrent ? '$circusRed' : isCompleted ? '$success' : '$borderColor'}
          borderWidth={isCurrent ? 3 : 0}
          borderColor={isCurrent ? '#E6394644' : undefined}
        />
        {!isLast && (
          <YStack
            width={2}
            height={40}
            backgroundColor={isCompleted ? '$success' : '$borderColor'}
            opacity={0.4}
          />
        )}
      </YStack>

      {/* City info */}
      <YStack flex={1} marginTop={-4} paddingBottom={isLast ? 0 : 8}>
        <XStack alignItems="center" gap="$1">
          <Text
            fontSize={14}
            fontWeight={isCurrent ? '800' : '600'}
            color={isCurrent ? '$circusRed' : isCompleted ? '$color' : '$textMuted'}
          >
            {stop.city}
          </Text>
          <Text fontSize={12} color="$textMuted" fontWeight="500">
            {stop.state}
          </Text>
          {isCurrent && (
            <YStack backgroundColor="$circusRed" paddingHorizontal="$2" paddingVertical={1} borderRadius="$10" marginLeft="$1">
              <Text fontSize={9} fontWeight="800" color="$white" textTransform="uppercase">Agora</Text>
            </YStack>
          )}
        </XStack>
        <Text fontSize={11} color="$textMuted">
          {stop.venue}
        </Text>
        {stop.revenue !== undefined && (
          <Text fontSize={11} fontWeight="600" color={isCurrent ? '$circusRed' : '$success'} marginTop={2}>
            {formatCurrency(stop.revenue)} · {stop.ticketsSold?.toLocaleString('pt-BR')} ingressos
          </Text>
        )}
      </YStack>
    </XStack>
  )
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets()
  const { data: stats, isLoading: statsLoading } = useCircusStats()
  const { data: profile, isLoading: profileLoading } = useCircusProfile()

  if (statsLoading || profileLoading) {
    return <MCLoading />
  }

  if (!stats || !profile) return null

  const maxCityRevenue = Math.max(...stats.revenueByCity.map((c) => c.revenue))
  const maxShowRevenue = Math.max(...stats.showPerformance.map((s) => s.revenue))

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
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
        >
          <YStack>
            <Text fontSize={12} color="$circusRed" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
              Visão Geral
            </Text>
            <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
              Painel do Circo
            </Text>
          </YStack>
          <YStack backgroundColor="#E6394622" padding="$2" borderRadius="$10" pressStyle={{ opacity: 0.7 }}>
            <Bell size={22} color="$circusRed" />
          </YStack>
        </XStack>

        <YStack paddingBottom={insets.bottom + 100}>

          {/* ── Tour Status Banner ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(50)}>
            <YStack
              marginHorizontal="$4"
              marginTop="$4"
              backgroundColor="$darkNavy"
              borderRadius="$4"
              padding="$4"
              overflow="hidden"
            >
              {/* Decorative circles */}
              <YStack
                position="absolute"
                right={-20}
                top={-20}
                width={100}
                height={100}
                borderRadius={50}
                backgroundColor="$circusRed"
                opacity={0.12}
              />
              <YStack
                position="absolute"
                right={30}
                bottom={-30}
                width={70}
                height={70}
                borderRadius={35}
                backgroundColor="$sunshineYellow"
                opacity={0.08}
              />

              <XStack alignItems="center" gap="$2" marginBottom="$3">
                <MapPin size={14} color="#FF6B6B" />
                <Text fontSize={11} fontWeight="700" color="#FF6B6B" textTransform="uppercase" letterSpacing={1.2}>
                  Temporada em São Paulo
                </Text>
              </XStack>

              <XStack alignItems="center" justifyContent="space-between">
                <YStack flex={1}>
                  <Text fontFamily="$heading" fontSize={24} fontWeight="800" color="white">
                    {profile.currentCity}
                  </Text>
                  <Text fontSize={13} color="#ffffff88" fontWeight="500">
                    Dia {profile.daysInCurrentCity} de {profile.daysInCurrentCity + profile.daysRemainingInCity} · {profile.daysRemainingInCity} restantes
                  </Text>
                </YStack>

                <XStack alignItems="center" gap="$2" backgroundColor="#ffffff12" paddingHorizontal="$3" paddingVertical="$2" borderRadius="$3">
                  <ArrowRight size={14} color="#FFB800" />
                  <YStack>
                    <Text fontSize={11} color="#ffffff66" fontWeight="600">Próximo</Text>
                    <Text fontSize={14} fontWeight="700" color="#FFB800">
                      {profile.nextCity}
                    </Text>
                  </YStack>
                </XStack>
              </XStack>
            </YStack>
          </Animated.View>

          {/* ── KPI Grid (2x2) ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(150)}>
            <YStack padding="$4" gap="$3">
              <XStack gap="$3">
                {/* Revenue */}
                <YStack
                  flex={1}
                  gap="$1"
                  borderRadius="$4"
                  padding="$3"
                  backgroundColor="$surface"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
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

                {/* Tickets */}
                <YStack
                  flex={1}
                  gap="$1"
                  borderRadius="$4"
                  padding="$3"
                  backgroundColor="$surface"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
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

              <XStack gap="$3">
                {/* Occupancy */}
                <YStack
                  flex={1}
                  gap="$1"
                  borderRadius="$4"
                  padding="$3"
                  backgroundColor="$surface"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
                  <XStack alignItems="center" gap="$2">
                    <YStack width={28} height={28} borderRadius={14} backgroundColor="#FFB80018" alignItems="center" justifyContent="center">
                      <Users size={14} color="$sunshineYellowDark" />
                    </YStack>
                    <Text fontSize={11} fontWeight="600" color="$textMuted">Ocupação</Text>
                  </XStack>
                  <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                    {stats.avgOccupancy}%
                  </Text>
                  <YStack width="100%" height={4} backgroundColor="$borderColor" borderRadius="$10" overflow="hidden">
                    <YStack height="100%" width={`${stats.avgOccupancy}%`} backgroundColor="$sunshineYellow" borderRadius="$10" />
                  </YStack>
                </YStack>

                {/* Cities */}
                <YStack
                  flex={1}
                  gap="$1"
                  borderRadius="$4"
                  padding="$3"
                  backgroundColor="$surface"
                  borderWidth={1}
                  borderColor="$borderColor"
                >
                  <XStack alignItems="center" gap="$2">
                    <YStack width={28} height={28} borderRadius={14} backgroundColor="#2EC4B618" alignItems="center" justifyContent="center">
                      <MapPin size={14} color="$success" />
                    </YStack>
                    <Text fontSize={11} fontWeight="600" color="$textMuted">Locais</Text>
                  </XStack>
                  <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$color">
                    {stats.totalCities}
                  </Text>
                  <Text fontSize={11} fontWeight="600" color="$textMuted">na temporada</Text>
                </YStack>
              </XStack>
            </YStack>
          </Animated.View>

          {/* ── Revenue by City ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(250)}>
            <YStack paddingHorizontal="$4" marginBottom="$4">
              <YStack
                backgroundColor="$surface"
                borderRadius="$4"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color">
                    Receita por Local
                  </Text>
                  <Text fontSize={12} fontWeight="600" color="$textMuted">Temporada 2026</Text>
                </XStack>

                <YStack gap="$3">
                  {stats.revenueByCity.map((city, i) => {
                    const barWidth = Math.max((city.revenue / maxCityRevenue) * 100, 8)
                    const colors = ['$circusRed', '$royalBlue', '$sunshineYellowDark']
                    const bgColors = ['#E6394622', '#1D355722', '#FFB80022']
                    return (
                      <YStack key={city.city} gap="$1">
                        <XStack justifyContent="space-between" alignItems="center">
                          <XStack alignItems="center" gap="$2">
                            <Text fontSize={13} fontWeight="700" color="$color">{city.city}</Text>
                            <Text fontSize={11} color="$textMuted">{city.state}</Text>
                          </XStack>
                          <Text fontSize={13} fontWeight="800" color={colors[i] ?? '$color'}>
                            {formatCurrency(city.revenue)}
                          </Text>
                        </XStack>
                        <YStack width="100%" height={8} backgroundColor={bgColors[i] ?? '$borderColor'} borderRadius="$10" overflow="hidden">
                          <YStack height="100%" width={`${barWidth}%`} backgroundColor={colors[i] ?? '$circusRed'} borderRadius="$10" />
                        </YStack>
                        <Text fontSize={10} color="$textMuted" fontWeight="500">
                          {city.tickets.toLocaleString('pt-BR')} ingressos vendidos
                        </Text>
                      </YStack>
                    )
                  })}
                </YStack>
              </YStack>
            </YStack>
          </Animated.View>

          {/* ── Show Performance ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(350)}>
            <YStack paddingHorizontal="$4" marginBottom="$4">
              <YStack
                backgroundColor="$surface"
                borderRadius="$4"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color" marginBottom="$4">
                  Desempenho por Espetáculo
                </Text>

                <YStack gap="$3">
                  {stats.showPerformance.map((show) => {
                    const barWidth = Math.max((show.revenue / maxShowRevenue) * 100, 8)
                    return (
                      <YStack key={show.showTitle} gap="$1">
                        <XStack alignItems="center" justifyContent="space-between">
                          <XStack alignItems="center" gap="$2">
                            <Text fontSize={16}>{CATEGORY_EMOJI[show.category] ?? '🎪'}</Text>
                            <YStack>
                              <Text fontSize={13} fontWeight="700" color="$color">{show.showTitle}</Text>
                              <Text fontSize={10} color="$textMuted">{show.tickets.toLocaleString('pt-BR')} ingressos · {show.avgOccupancy}% ocup.</Text>
                            </YStack>
                          </XStack>
                          <Text fontSize={13} fontWeight="800" color="$color">
                            {formatCurrency(show.revenue)}
                          </Text>
                        </XStack>
                        <YStack width="100%" height={6} backgroundColor="#E6394612" borderRadius="$10" overflow="hidden">
                          <YStack
                            height="100%"
                            width={`${barWidth}%`}
                            backgroundColor="$circusRed"
                            borderRadius="$10"
                            opacity={0.6 + (barWidth / 100) * 0.4}
                          />
                        </YStack>
                      </YStack>
                    )
                  })}
                </YStack>
              </YStack>
            </YStack>
          </Animated.View>

          {/* ── Occupancy by Weekday ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(450)}>
            <YStack paddingHorizontal="$4" marginBottom="$4">
              <YStack
                backgroundColor="$surface"
                borderRadius="$4"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color">
                    Ocupação por Dia
                  </Text>
                  <XStack alignItems="center" gap="$1">
                    <Calendar size={12} color="$textMuted" />
                    <Text fontSize={12} fontWeight="600" color="$textMuted">Média semanal</Text>
                  </XStack>
                </XStack>

                <XStack height={140} width="100%" alignItems="flex-end" justifyContent="space-between" gap="$2" paddingHorizontal="$1">
                  {stats.weekdayOccupancy.map((day, i) => {
                    const isWeekend = i >= 4
                    const hasShows = day.shows > 0
                    const barColor = day.occupancy >= 90 ? '$circusRed' : day.occupancy >= 70 ? '$sunshineYellow' : '$royalBlueLight'
                    const barHeight = Math.round((day.occupancy / 100) * 110)
                    return (
                      <YStack key={day.shortDay} flex={1} alignItems="center" gap="$1">
                        {hasShows ? (
                          <>
                            <Text fontSize={9} fontWeight="800" color={isWeekend ? '$circusRed' : '$textMuted'}>
                              {day.occupancy}%
                            </Text>
                            <YStack
                              width="100%"
                              maxWidth={32}
                              height={barHeight}
                              backgroundColor={barColor}
                              borderTopLeftRadius="$2"
                              borderTopRightRadius="$2"
                              opacity={isWeekend ? 1 : 0.7}
                            />
                          </>
                        ) : (
                          <>
                            <Text fontSize={9} fontWeight="600" color="$borderColor">—</Text>
                            <YStack width="100%" maxWidth={32} height={4} backgroundColor="$borderColor" borderRadius="$2" />
                          </>
                        )}
                        <Text
                          fontSize={10}
                          fontWeight={isWeekend ? '800' : '600'}
                          color={hasShows ? (isWeekend ? '$circusRed' : '$textMuted') : '$borderColor'}
                          textTransform="uppercase"
                        >
                          {day.shortDay}
                        </Text>
                      </YStack>
                    )
                  })}
                </XStack>
              </YStack>
            </YStack>
          </Animated.View>

          {/* ── Itinerary Timeline ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(550)}>
            <YStack paddingHorizontal="$4" marginBottom="$4">
              <YStack
                backgroundColor="$surface"
                borderRadius="$4"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                  <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color">
                    Roteiro em São Paulo
                  </Text>
                  <YStack backgroundColor="#E6394618" paddingHorizontal="$2" paddingVertical={2} borderRadius="$10">
                    <Text fontSize={10} fontWeight="700" color="$circusRed" textTransform="uppercase">
                      {profile.itinerary.length} locais
                    </Text>
                  </YStack>
                </XStack>

                {profile.itinerary.map((stop, i) => (
                  <ItineraryDot key={stop.id} stop={stop} isLast={i === profile.itinerary.length - 1} />
                ))}
              </YStack>
            </YStack>
          </Animated.View>

          {/* ── Ticket Type Breakdown ── */}
          <Animated.View entering={FadeInUp.duration(400).delay(650)}>
            <YStack paddingHorizontal="$4" marginBottom="$4">
              <YStack
                backgroundColor="$surface"
                borderRadius="$4"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <Text fontFamily="$heading" fontSize={16} fontWeight="800" color="$color" marginBottom="$4">
                  Tipo de Ingresso
                </Text>

                {(() => {
                  const total = stats.ticketTypeBreakdown.pista + stats.ticketTypeBreakdown.vip + stats.ticketTypeBreakdown.camarote
                  const types = [
                    { label: 'Pista', value: stats.ticketTypeBreakdown.pista, color: '$royalBlue', bgColor: '#1D3557' },
                    { label: 'VIP', value: stats.ticketTypeBreakdown.vip, color: '$circusRed', bgColor: '#E63946' },
                    { label: 'Camarote', value: stats.ticketTypeBreakdown.camarote, color: '$sunshineYellowDark', bgColor: '#E5A600' },
                  ]
                  return (
                    <YStack gap="$3">
                      {/* Stacked bar */}
                      <XStack height={12} borderRadius="$10" overflow="hidden">
                        {types.map((t) => (
                          <YStack key={t.label} flex={t.value / total} backgroundColor={t.bgColor} />
                        ))}
                      </XStack>

                      {/* Legend */}
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
              </YStack>
            </YStack>
          </Animated.View>

        </YStack>
      </ScrollView>
    </YStack>
  )
}
