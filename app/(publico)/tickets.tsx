import { useState, useMemo } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Ticket, User, ArrowRight, Sparkles } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated'
import { useTickets } from '../../src/features/tickets/hooks'
import { TicketCard } from '../../src/components/publico/TicketCard'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { MCEmptyState } from '../../src/components/ui/MCEmptyState'
import { MCButton } from '../../src/components/ui/MCButton'
import { useRoleStore } from '../../src/contexts/RoleContext'

type TabKey = 'upcoming' | 'past'

function VisitorPrompt() {
  const router = useRouter()
  const login = useRoleStore((s) => s.login)

  const handleLogin = () => {
    login('usuario')
  }

  return (
    <Animated.View 
      entering={FadeInUp.duration(400)}
      style={{ flex: 1 }}
    >
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$4" gap="$4">
        {/* Decorative circle */}
        <YStack
          width={100}
          height={100}
          borderRadius={50}
          backgroundColor="$royalBlue"
          alignItems="center"
          justifyContent="center"
          marginBottom="$2"
        >
          <Ticket size={44} color="white" />
        </YStack>

        <YStack alignItems="center" gap="$2" paddingHorizontal="$4">
          <Text 
            fontFamily="$heading" 
            fontSize={22} 
            fontWeight="700" 
            color="$darkNavy"
            textAlign="center"
          >
            Adquira seus Ingressos
          </Text>
          <Text 
            fontSize={15} 
            color="$textMuted" 
            textAlign="center"
            lineHeight={22}
          >
            Faça login para comprar ingressos dos melhores shows de circo perto de você
          </Text>
        </YStack>

        {/* Benefits */}
        <YStack 
          gap="$2" 
          padding="$4" 
          backgroundColor="$surface" 
          borderRadius="$4" 
          borderWidth={1} 
          borderColor="$borderColor"
          width="100%"
        >
          <XStack alignItems="center" gap="$2">
            <Sparkles size={16} color="$circusRed" />
            <Text fontSize={14} color="$color">Descontos exclusivos</Text>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <Ticket size={16} color="$success" />
            <Text fontSize={14} color="$color">Compra rápida e segura</Text>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <ArrowRight size={16} color="$royalBlue" />
            <Text fontSize={14} color="$color">Acesso a shows especiais</Text>
          </XStack>
        </YStack>

        {/* CTA Buttons */}
        <YStack width="100%" gap="$2" marginTop="$2">
          <MCButton
            variant="filled"
            size="lg"
            fullWidth
            icon={<User size={18} />}
            onPress={handleLogin}
          >
            Entrar / Criar Conta
          </MCButton>
          <MCButton
            variant="outline"
            size="md"
            fullWidth
            onPress={() => router.push('/(publico)/(home)')}
          >
            Ver Shows Disponíveis
          </MCButton>
        </YStack>
      </YStack>
    </Animated.View>
  )
}

export default function TicketsScreen() {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<TabKey>('upcoming')
  const { data: tickets, isLoading } = useTickets()
  const role = useRoleStore((s) => s.role)

  const isVisitante = role === 'visitante'

  const filteredTickets = useMemo(() => {
    if (!tickets) return []
    if (activeTab === 'upcoming') {
      return tickets.filter((t) => t.status === 'upcoming')
    }
    return tickets.filter((t) => t.status === 'past' || t.status === 'cancelled')
  }, [tickets, activeTab])

  // Show visitor prompt if not logged in
  if (isVisitante) {
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

        <VisitorPrompt />
      </YStack>
    )
  }

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
      ) : (
        <Animated.View
          key={activeTab}
          entering={FadeIn.duration(220)}
          exiting={FadeOut.duration(150)}
          style={{ flex: 1 }}
        >
          {filteredTickets.length === 0 ? (
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
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: insets.bottom + 16,
                gap: 12,
              }}
              data={filteredTickets}
              keyExtractor={(ticket) => ticket.id}
              renderItem={({ item: ticket, index }) => (
                <Animated.View entering={FadeInUp.duration(280).delay(index * 70)}>
                  <TicketCard ticket={ticket} />
                </Animated.View>
              )}
            />
          )}
        </Animated.View>
      )}
    </YStack>
  )
}
