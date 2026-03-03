import { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react'
import { View, ScrollView, Pressable, FlatList, StyleSheet, Text as RNText } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated'
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight } from '@tamagui/lucide-icons'
import { useShows } from '../../features/shows/hooks'
import { MCLoading } from '../ui/MCLoading'
import { MCEmptyState } from '../ui/MCEmptyState'
import { Image } from 'expo-image'
import type { Show, ShowCategory } from '../../features/shows/types'

const DAY_WIDTH = 52
const DAY_GAP = 6
const DAYS_TO_SHOW = 14

// Each circus gets a distinct accent color so users can tell them apart
const CIRCUS_COLORS: Record<string, { bg: string; text: string }> = {
  'circus-1': { bg: '#E6394618', text: '#E63946' },   // Mundo Mágico → red
  'circus-2': { bg: '#FFB80020', text: '#CC9200' },   // Alegria → yellow
  'circus-3': { bg: '#1D355714', text: '#1D3557' },   // Encantado → navy
  'circus-4': { bg: '#8B5CF614', text: '#7C3AED' },   // Harmonia → purple
  'circus-5': { bg: '#0891B214', text: '#0891B2' },   // Internacional → teal
}
const DEFAULT_CIRCUS_COLOR = { bg: '#E6394612', text: '#E63946' }

const CATEGORY_EMOJI: Record<string, string> = {
  acrobacia: '\u{1F938}',
  palhaco: '\u{1F921}',
  magica: '\u{1F3A9}',
  aereo: '\u{1F3AD}',
  musical: '\u{1F3B5}',
  infantil: '\u{1F9F8}',
  malabarismo: '\u{1F939}',
  fogo: '\u{1F525}',
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const MONTH_LONG = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

const MONTH_SHORT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

export const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export function formatHeaderDate(dateISO: string): string {
  const d = new Date(dateISO + 'T12:00:00')
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const todayKey = toDateKey(today)

  if (dateISO === todayKey) return 'Hoje'

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (dateISO === toDateKey(tomorrow)) return 'Amanhã'

  return `${d.getDate()} de ${MONTH_LONG[d.getMonth()]}`
}

function generateDays(days: number): Date[] {
  const result: Date[] = []
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    result.push(d)
  }
  return result
}

// ─── Day Strip ───────────────────────────────────────────────

interface DayItemProps {
  day: Date
  dateKey: string
  isSelected: boolean
  isToday: boolean
  hasShows: boolean
  onPress: (dateISO: string) => void
}

const DayItem = memo(function DayItem({ day, dateKey, isSelected, isToday, hasShows, onPress }: DayItemProps) {
  const weekday = WEEKDAYS[day.getDay()]
  const dayNum = day.getDate()

  return (
    <Pressable
      onPress={() => onPress(dateKey)}
      style={{
        width: DAY_WIDTH,
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <RNText
        style={{
          fontSize: 9,
          fontWeight: '800',
          letterSpacing: 1,
          color: isSelected ? '#E63946' : '#1D355760',
          marginBottom: 6,
        }}
      >
        {weekday}
      </RNText>

      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? '#E63946' : 'transparent',
          borderWidth: isToday && !isSelected ? 2 : 0,
          borderColor: '#E6394630',
        }}
      >
        <RNText
          style={{
            fontSize: 17,
            fontWeight: isSelected ? '800' : '600',
            color: isSelected ? '#FFF' : isToday ? '#E63946' : '#1D3557',
          }}
        >
          {dayNum}
        </RNText>
      </View>

      {/* Show indicator dot */}
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          backgroundColor: hasShows ? (isSelected ? '#FFB800' : '#FFB800') : 'transparent',
          marginTop: 5,
        }}
      />
    </Pressable>
  )
})

interface DayStripProps {
  selectedDate: string
  onSelectDate: (dateISO: string) => void
  showDates: Set<string>
}

function DayStrip({ selectedDate, onSelectDate, showDates }: DayStripProps) {
  const scrollRef = useRef<ScrollView>(null)
  const days = useMemo(() => generateDays(DAYS_TO_SHOW), [])

  useEffect(() => {
    const idx = days.findIndex((d) => toDateKey(d) === selectedDate)
    if (idx > 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ x: idx * (DAY_WIDTH + DAY_GAP) - 20, animated: true })
    }
  }, [days, selectedDate])

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, gap: DAY_GAP, paddingVertical: 4 }}
    >
      {days.map((day) => {
        const key = toDateKey(day)
        return (
          <DayItem
            key={key}
            day={day}
            dateKey={key}
            isSelected={key === selectedDate}
            isToday={key === toDateKey(new Date())}
            hasShows={showDates.has(key)}
            onPress={onSelectDate}
          />
        )
      })}
    </ScrollView>
  )
}

// ─── Show Card (ticket-stub) ─────────────────────────────────

interface ShowCardProps {
  show: Show
  onPress: () => void
}

const ShowCard = memo(function ShowCard({ show, onPress }: ShowCardProps) {
  const emoji = CATEGORY_EMOJI[show.category] ?? '\u{1F3AA}'
  const time = show.dates?.[0]?.time ?? '--:--'
  const available = show.capacity - show.soldCount
  const almostFull = available < show.capacity * 0.15
  const circusColor = CIRCUS_COLORS[show.circusId] ?? DEFAULT_CIRCUS_COLOR

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}>
      <View style={cardStyles.container}>
        {/* Image */}
        <View style={cardStyles.imageWrapper}>
          <Image
            source={{ uri: show.imageUrl }}
            style={cardStyles.image}
            contentFit="cover"
          />
          {/* Time badge overlay */}
          <View style={cardStyles.timeBadge}>
            <Clock size={10} color="#FFF" />
            <RNText style={cardStyles.timeText}>{time}</RNText>
          </View>
          {/* Category emoji overlay */}
          <View style={cardStyles.categoryBadge}>
            <RNText style={{ fontSize: 14 }}>{emoji}</RNText>
          </View>
        </View>

        {/* Perforation */}
        <View style={cardStyles.perfColumn}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={cardStyles.perfDot} />
          ))}
        </View>
        <View style={cardStyles.perfLine} />

        {/* Content */}
        <View style={cardStyles.content}>
          <View style={cardStyles.topRow}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <RNText style={cardStyles.title} numberOfLines={1}>{show.title}</RNText>
              {/* Circus badge with distinct color per circus */}
              <View style={[cardStyles.circusBadge, { backgroundColor: circusColor.bg }]}>
                <RNText style={{ fontSize: 11 }}>{'\u{1F3AA}'}</RNText>
                <RNText style={[cardStyles.circusName, { color: circusColor.text }]}>
                  {show.circusName}
                </RNText>
              </View>
            </View>
            <View style={cardStyles.priceBox}>
              <RNText style={cardStyles.priceLabel}>R$</RNText>
              <RNText style={cardStyles.priceValue}>{show.price}</RNText>
            </View>
          </View>

          <View style={cardStyles.bottomRow}>
            <View style={cardStyles.infoChip}>
              <MapPin size={11} color="#6B7280" />
              <RNText style={cardStyles.infoText}>{show.location}</RNText>
            </View>
            <View style={[
              cardStyles.availBadge,
              almostFull && { backgroundColor: '#E6394618' },
            ]}>
              <RNText style={[
                cardStyles.availText,
                almostFull && { color: '#E63946' },
              ]}>
                {almostFull ? `${available} restantes` : `${available} vagas`}
              </RNText>
            </View>
          </View>

          {/* Arrow hint */}
          <View style={cardStyles.arrowHint}>
            <ChevronRight size={16} color="#D1D5DB" />
          </View>
        </View>
      </View>
    </Pressable>
  )
})

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#1D3557',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#1D355708',
  },
  imageWrapper: {
    width: 90,
    position: 'relative',
  },
  image: {
    width: 90,
    height: '100%',
    minHeight: 110,
  },
  timeBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E63946',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  perfColumn: {
    position: 'absolute',
    left: 83,
    top: 0,
    bottom: 0,
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    zIndex: 10,
  },
  perfDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFF8F0',
  },
  perfLine: {
    position: 'absolute',
    left: 90,
    top: 0,
    bottom: 0,
    width: 1,
    borderLeftWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#1D355710',
    zIndex: 5,
  },
  content: {
    flex: 1,
    padding: 12,
    paddingLeft: 14,
    justifyContent: 'space-between',
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D3557',
    marginBottom: 4,
  },
  categoryBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,248,240,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 2,
  },
  circusName: {
    fontSize: 11,
    fontWeight: '700',
  },
  priceBox: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  priceLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#E63946',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#E63946',
    marginTop: -2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  infoText: {
    fontSize: 11,
    color: '#1D355780',
    fontWeight: '500',
  },
  availBadge: {
    backgroundColor: '#FFB80018',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    flexShrink: 0,
  },
  availText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFB800',
  },
  arrowHint: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -8,
  },
})

// ─── Main AgendaView ─────────────────────────────────────────

interface AgendaViewProps {
  showRoute: string
}

export function AgendaView({ showRoute }: AgendaViewProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))

  const { data: shows, isLoading } = useShows()

  const headerLabel = formatHeaderDate(selectedDate)

  // Collect all dates that have shows
  const showDates = useMemo(() => {
    const dates = new Set<string>()
    if (shows) {
      for (const show of shows) {
        for (const d of show.dates) {
          dates.add(d.date)
        }
      }
    }
    return dates
  }, [shows])

  const handleDateSelect = useCallback((dateISO: string) => {
    setSelectedDate(dateISO)
  }, [])

  const handleShowPress = useCallback((showId: string) => {
    router.push(showRoute.replace('[id]', showId) as any)
  }, [router, showRoute])

  // Filter shows that have the selected date in ANY of their dates
  const filteredShows = useMemo(() => {
    if (!shows) return []
    return shows.filter((show) =>
      show.dates.some((d) => d.date === selectedDate)
    )
  }, [shows, selectedDate])

  const renderItem = useCallback(({ item, index }: { item: Show; index: number }) => (
    <Animated.View entering={FadeInUp.duration(280).delay(index * 70)}>
      <ShowCard show={item} onPress={() => handleShowPress(item.id)} />
    </Animated.View>
  ), [handleShowPress])

  const keyExtractor = useCallback((item: Show) => item.id, [])

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Day strip */}
      <YStack
        backgroundColor="$surface"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <DayStrip
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          showDates={showDates}
        />
      </YStack>

      {/* Section header */}
      <Animated.View
        key={selectedDate + '-header'}
        entering={FadeIn.duration(200)}
      >
        <XStack
          paddingHorizontal="$4"
          alignItems="baseline"
          justifyContent="space-between"
          marginTop="$4"
          marginBottom="$3"
        >
          <XStack alignItems="baseline" gap="$2">
            <Text fontFamily="$circus" fontSize={26} color="$circusRed">
              {headerLabel}
            </Text>
            <Text fontSize={13} color="$textMuted" fontWeight="500">
              {filteredShows.length > 0
                ? `${filteredShows.length} espetáculo${filteredShows.length !== 1 ? 's' : ''}`
                : ''}
            </Text>
          </XStack>
          <XStack width={40} height={3} borderRadius={2} backgroundColor="$sunshineYellow" />
        </XStack>
      </Animated.View>

      {/* Events list */}
      <Animated.View
        key={selectedDate}
        entering={FadeIn.duration(200)}
        style={{ flex: 1, paddingHorizontal: 16 }}
      >
        {isLoading ? (
          <YStack gap="$3" paddingTop="$4">
            <MCLoading />
          </YStack>
        ) : filteredShows.length > 0 ? (
          <FlatList
            data={filteredShows}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <YStack paddingTop="$8">
            <MCEmptyState
              icon={<CalendarIcon size={48} color="$textMuted" />}
              title="Picadeiro vazio"
              description={`Nenhum espetáculo agendado para ${headerLabel.toLowerCase()}.`}
            />
          </YStack>
        )}
      </Animated.View>
    </YStack>
  )
}
