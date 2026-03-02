import { useState, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Ticket } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTickets } from '../../src/features/tickets/hooks'
import { TicketCard } from '../../src/components/publico/TicketCard'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../src/components/ui/MCEmptyState'

type TabKey = 'upcoming' | 'past'

export default function TicketsScreen() {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const { data: tickets, isLoading } = useTickets()

  const filteredTickets = useMemo(() => {
    if (!tickets) return []
    if (activeTab === 'upcoming') {
      return tickets.filter((t) => t.status === 'upcoming')
    }
    return tickets.filter((t) => t.status === 'past' || t.status === 'cancelled')
  }, [tickets, activeTab])

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top + 8}>
      <Text
        fontFamily="$heading"
        fontSize={24}
        fontWeight="700"
        paddingHorizontal="$4"
        marginBottom="$3"
      >
        Meus Ingressos
      </Text>

      <XStack paddingHorizontal="$4" gap="$2" marginBottom="$3">
        <XStack
          flex={1}
          paddingVertical="$2"
          borderRadius={12}
          backgroundColor={activeTab === 'upcoming' ? '$primary' : '$surface'}
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.8 }}
          onPress={() => setActiveTab('upcoming')}
          cursor="pointer"
        >
          <Text
            fontSize={14}
            fontWeight="600"
            color={activeTab === 'upcoming' ? 'white' : '$color'}
          >
            Proximos
          </Text>
        </XStack>
        <XStack
          flex={1}
          paddingVertical="$2"
          borderRadius={12}
          backgroundColor={activeTab === 'past' ? '$primary' : '$surface'}
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.8 }}
          onPress={() => setActiveTab('past')}
          cursor="pointer"
        >
          <Text
            fontSize={14}
            fontWeight="600"
            color={activeTab === 'past' ? 'white' : '$color'}
          >
            Anteriores
          </Text>
        </XStack>
      </XStack>

      {isLoading ? (
        <MCLoading />
      ) : filteredTickets.length === 0 ? (
        <MCEmptyState
          icon={<Ticket size={48} color="$textMuted" />}
          title={
            activeTab === 'upcoming'
              ? 'Nenhum ingresso proximo'
              : 'Nenhum ingresso anterior'
          }
          description={
            activeTab === 'upcoming'
              ? 'Explore os shows disponiveis e garanta seu ingresso!'
              : 'Seus ingressos passados aparecerão aqui'
          }
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 16,
            gap: 12,
          }}
        >
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </ScrollView>
      )}
    </YStack>
  )
}
