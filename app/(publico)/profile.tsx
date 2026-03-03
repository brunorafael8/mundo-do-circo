import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import {
  User,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Ticket,
  Shield,
  FileText,
  ArrowLeftRight,
  Heart,
  History,
  Settings,
} from '@tamagui/lucide-icons'
import { useRoleStore } from '../../src/contexts/RoleContext'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { MCButton } from '../../src/components/ui/MCButton'
import { Info } from '@tamagui/lucide-icons'

interface MenuItem {
  id: string
  label: string
  subtitle?: string
  icon: React.ComponentType<{ size: number; color: string }>
  color?: string
  bgColor?: string
  action?: 'logout' | 'switch'
  variant?: 'default' | 'danger'
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { id: 'edit_profile', label: 'Editar Perfil', subtitle: 'Nome, foto, dados pessoais', icon: User, color: '$royalBlue', bgColor: '#1D355715' },
  { id: 'notifications', label: 'Notificações', subtitle: 'Alertas e avisos', icon: Bell, color: '$sunshineYellowDark', bgColor: '#FFB80015' },
]

const MY_STUFF_ITEMS: MenuItem[] = [
  { id: 'tickets', label: 'Meus Ingressos', subtitle: 'Shows comprados', icon: Ticket, color: '$success', bgColor: '#2EC4B615' },
  { id: 'favorites', label: 'Favoritos', subtitle: 'Circos e shows salvos', icon: Heart, color: '#E63946', bgColor: '#E6394615' },
  { id: 'history', label: 'Histórico', subtitle: 'Shows assistidos', icon: History, color: '$royalBlue', bgColor: '#1D355715' },
]

const SUPPORT_ITEMS: MenuItem[] = [
  { id: 'help', label: 'Central de Ajuda', subtitle: 'FAQ e suporte', icon: HelpCircle, color: '$royalBlueLight', bgColor: '#457B9D15' },
  { id: 'about', label: 'Sobre o App', subtitle: 'Versão e informações', icon: Info, color: '$textMuted', bgColor: '#ADB5BD15' },
]

function MenuGroup({ title, items, onPress }: { title: string; items: MenuItem[]; onPress: (item: MenuItem) => void }) {
  return (
    <YStack gap="$2">
      <Text fontSize={11} fontWeight="700" color="$textMuted" textTransform="uppercase" letterSpacing={1.2} paddingLeft="$1">
        {title}
      </Text>
      <YStack backgroundColor="$surface" borderRadius="$4" borderWidth={1} borderColor="$borderColor" overflow="hidden">
        {items.map((item, i) => {
          const Icon = item.icon
          const isLast = i === items.length - 1
          const isDanger = item.variant === 'danger' || item.action === 'logout'
          return (
            <XStack
              key={item.id}
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal="$4"
              paddingVertical="$3"
              borderBottomWidth={isLast ? 0 : 1}
              borderBottomColor="$borderColor"
              pressStyle={{ backgroundColor: '#00000008' }}
              onPress={() => onPress(item)}
            >
              <XStack alignItems="center" gap="$3" flex={1}>
                <YStack
                  width={36}
                  height={36}
                  borderRadius={10}
                  backgroundColor={item.bgColor ?? '$surfaceHover'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon size={18} color={item.color ?? '$color'} />
                </YStack>
                <YStack flex={1}>
                  <Text fontSize={15} fontWeight="600" color={isDanger ? '$error' : '$color'}>
                    {item.label}
                  </Text>
                  {item.subtitle && (
                    <Text fontSize={12} color="$textMuted" numberOfLines={1}>{item.subtitle}</Text>
                  )}
                </YStack>
              </XStack>
              <ChevronRight size={16} color="$textMuted" />
            </XStack>
          )
        })}
      </YStack>
    </YStack>
  )
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const role = useRoleStore((s) => s.role)
  const logout = useRoleStore((s) => s.logout)
  const login = useRoleStore((s) => s.login)

  const isVisitante = role === 'visitante'

  const handleLogout = () => {
    logout()
  }

  const handleLoginCirco = () => {
    login('circo')
    router.replace('/(circo)/dashboard')
  }

  const handleItemPress = (item: MenuItem) => {
    if (item.action === 'logout' || item.id === 'logout') {
      handleLogout()
    }
  }

  // Render login/visitante screen
  if (isVisitante) {
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
              <Text fontSize={12} color="$royalBlue" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
                Público
              </Text>
              <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
                Meu Perfil
              </Text>
            </YStack>
          </XStack>

          <YStack padding="$4" gap="$5" paddingBottom={insets.bottom + 100}>

            {/* Guest Card */}
            <Animated.View entering={FadeInUp.duration(400)}>
              <YStack backgroundColor="$royalBlue" borderRadius="$4" overflow="hidden">
                <YStack height={100} position="relative" alignItems="center" justifyContent="center">
                  <Image
                    source="https://images.unsplash.com/photo-1504196606672-aef5c9cefcce?w=800"
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    contentFit="cover"
                  />
                  <YStack position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(29, 53, 87, 0.6)" />
                  
                  <YStack alignItems="center" gap="$2" zIndex={1}>
                    <YStack
                      width={64}
                      height={64}
                      borderRadius={32}
                      borderWidth={3}
                      borderColor="white"
                      overflow="hidden"
                      backgroundColor="$surface"
                    >
                      <Image
                        source="https://picsum.photos/seed/avatar_guest/200/200"
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                      />
                    </YStack>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="white">
                      Visitante
                    </Text>
                  </YStack>
                </YStack>

                <YStack padding="$4" gap="$3">
                  <Text fontSize={14} color="#ffffffcc" textAlign="center">
                    Faça login para acessar seus ingressos, favoritos e histórico de shows
                  </Text>

                  <YStack gap="$2">
                    <MCButton
                      variant="outline"
                      size="md"
                      fullWidth
                      icon={<User size={18} />}
                      onPress={() => login('usuario')}
                      color="white"
                      borderColor="white"
                    >
                      Entrar como Usuário
                    </MCButton>
                    <MCButton
                      variant="outline"
                      size="md"
                      fullWidth
                      icon={<ArrowLeftRight size={18} />}
                      onPress={handleLoginCirco}
                      color="white"
                      borderColor="white"
                    >
                      Entrar como Circo
                    </MCButton>
                  </YStack>
                </YStack>
              </YStack>
            </Animated.View>

            {/* Version */}
            <YStack alignItems="center" gap="$1" paddingTop="$2">
              <Text fontSize={12} fontWeight="700" color="$textMuted">Mundo do Circo</Text>
              <Text fontSize={11} color="$borderColor">v1.0.0</Text>
            </YStack>

          </YStack>
        </ScrollView>
      </YStack>
    )
  }

  // Logged in user view - similar to circus settings
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
            <Text fontSize={12} color="$royalBlue" fontWeight="700" textTransform="uppercase" letterSpacing={1}>
              Público
            </Text>
            <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
              Meu Perfil
            </Text>
          </YStack>
        </XStack>

        <YStack padding="$4" gap="$5" paddingBottom={insets.bottom + 100}>

          {/* User Profile Card */}
          <Animated.View entering={FadeInUp.duration(400)}>
            <YStack backgroundColor="$darkNavy" borderRadius="$4" overflow="hidden">
              {/* Cover */}
              <YStack height={80} position="relative">
                <Image
                  source="https://images.unsplash.com/photo-1504196606672-aef5c9cefcce?w=800"
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
                <YStack position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(26,26,46,0.5)" />
              </YStack>

              {/* Profile info overlapping cover */}
              <YStack paddingHorizontal="$4" paddingBottom="$4" marginTop={-28}>
                <XStack alignItems="flex-end" gap="$3">
                  <YStack
                    width={56}
                    height={56}
                    borderRadius={16}
                    borderWidth={3}
                    borderColor="$darkNavy"
                    overflow="hidden"
                    backgroundColor="$surface"
                  >
                    <Image
                      source="https://picsum.photos/seed/avatar_user/200/200"
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </YStack>
                  <YStack flex={1} paddingBottom={4}>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="white">
                      João Silva
                    </Text>
                    <Text fontSize={12} color="#ffffff99">usuario@exemplo.com</Text>
                  </YStack>
                </XStack>

                {/* Stats row */}
                <XStack marginTop="$3" gap="$4">
                  <XStack alignItems="center" gap="$1">
                    <Ticket size={12} color="#2EC4B6" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">5 shows</Text>
                  </XStack>
                  <XStack alignItems="center" gap="$1">
                    <Heart size={12} color="#E63946" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">12 favoritos</Text>
                  </XStack>
                  <XStack alignItems="center" gap="$1">
                    <Star size={12} color="#FFB800" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">4.8</Text>
                  </XStack>
                </XStack>

                {/* Quick numbers */}
                <XStack marginTop="$3" gap="$3">
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">5</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Ingressos</Text>
                  </YStack>
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">12</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Favoritos</Text>
                  </YStack>
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">8</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Assistidos</Text>
                  </YStack>
                </XStack>
              </YStack>
            </YStack>
          </Animated.View>

          {/* Switch to Circus */}
          <Animated.View entering={FadeInUp.duration(400).delay(100)}>
            <XStack
              backgroundColor="$surface"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$borderColor"
              padding="$4"
              alignItems="center"
              justifyContent="space-between"
              pressStyle={{ backgroundColor: '#00000008' }}
              onPress={handleLoginCirco}
            >
              <XStack alignItems="center" gap="$3">
                <YStack width={36} height={36} borderRadius={10} backgroundColor="#1D355715" alignItems="center" justifyContent="center">
                  <ArrowLeftRight size={18} color="$royalBlue" />
                </YStack>
                <YStack>
                  <Text fontSize={15} fontWeight="600" color="$color">Modo Circo</Text>
                  <Text fontSize={12} color="$textMuted">Gerenciar meu circo</Text>
                </YStack>
              </XStack>
              <ChevronRight size={16} color="$textMuted" />
            </XStack>
          </Animated.View>

          {/* Menu Groups */}
          <Animated.View entering={FadeInUp.duration(400).delay(200)}>
            <MenuGroup title="Conta" items={ACCOUNT_ITEMS} onPress={handleItemPress} />
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(400).delay(300)}>
            <MenuGroup title="Minhas Atividades" items={MY_STUFF_ITEMS} onPress={handleItemPress} />
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(400).delay(400)}>
            <MenuGroup title="Suporte" items={SUPPORT_ITEMS} onPress={handleItemPress} />
          </Animated.View>

          {/* Logout */}
          <Animated.View entering={FadeInUp.duration(400).delay(500)}>
            <XStack
              backgroundColor="$surface"
              borderRadius="$4"
              borderWidth={1}
              borderColor="#E6394633"
              padding="$4"
              alignItems="center"
              justifyContent="center"
              gap="$2"
              pressStyle={{ backgroundColor: '#E6394608' }}
              onPress={handleLogout}
            >
              <LogOut size={18} color="$error" />
              <Text fontSize={15} fontWeight="700" color="$error">Sair da Conta</Text>
            </XStack>
          </Animated.View>

          {/* Version */}
          <YStack alignItems="center" gap="$1" paddingTop="$2">
            <XStack alignItems="center" gap="$1">
              <Ticket size={14} color="$textMuted" />
              <Text fontSize={12} fontWeight="700" color="$textMuted">Mundo do Circo</Text>
            </XStack>
            <Text fontSize={11} color="$borderColor">v1.0.0</Text>
          </YStack>

        </YStack>
      </ScrollView>
    </YStack>
  )
}
