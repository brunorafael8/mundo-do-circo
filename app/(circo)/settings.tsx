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
  Tent,
  Shield,
  FileText,
  ArrowLeftRight,
} from '@tamagui/lucide-icons'
import { useCircusProfile } from '../../src/features/circus/hooks'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { useRoleStore } from '../../src/contexts/RoleContext'

interface MenuItem {
  id: string
  label: string
  subtitle?: string
  icon: React.ComponentType<{ size: number; color: string }>
  color?: string
  bgColor?: string
  action?: 'logout' | 'switch'
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { id: 'profile', label: 'Editar Perfil', subtitle: 'Nome, descrição, logo', icon: User, color: '$royalBlue', bgColor: '#1D355715' },
  { id: 'notifications', label: 'Notificações', subtitle: 'Alertas e avisos', icon: Bell, color: '$sunshineYellowDark', bgColor: '#FFB80015' },
]

const BUSINESS_ITEMS: MenuItem[] = [
  { id: 'payments', label: 'Pagamentos', subtitle: 'Repasses e conta bancária', icon: CreditCard, color: '$success', bgColor: '#2EC4B615' },
  { id: 'terms', label: 'Termos de Uso', subtitle: 'Contrato e políticas', icon: FileText, color: '$textMuted', bgColor: '#ADB5BD15' },
]

const SUPPORT_ITEMS: MenuItem[] = [
  { id: 'help', label: 'Central de Ajuda', subtitle: 'FAQ e suporte', icon: HelpCircle, color: '$royalBlueLight', bgColor: '#457B9D15' },
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
                  <Text fontSize={15} fontWeight="600" color={item.action === 'logout' ? '$error' : '$color'}>
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

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: profile, isLoading } = useCircusProfile()
  const logout = useRoleStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    router.replace('/(publico)/(home)')
  }

  const handleItemPress = (item: MenuItem) => {
    if (item.action === 'logout' || item.id === 'logout') {
      handleLogout()
    }
  }

  if (isLoading) {
    return <MCLoading />
  }

  if (!profile) return null

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
              Meu Circo
            </Text>
            <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy" marginTop={-2}>
              Configurações
            </Text>
          </YStack>
        </XStack>

        <YStack padding="$4" gap="$5" paddingBottom={insets.bottom + 100}>

          {/* Circus Profile Card */}
          <Animated.View entering={FadeInUp.duration(400)}>
            <YStack backgroundColor="$darkNavy" borderRadius="$4" overflow="hidden">
              {/* Cover */}
              <YStack height={80} position="relative">
                <Image
                  source={profile.coverUrl}
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
                      source={profile.logoUrl}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </YStack>
                  <YStack flex={1} paddingBottom={4}>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="white">
                      {profile.name}
                    </Text>
                  </YStack>
                </XStack>

                <Text fontSize={13} color="#ffffff99" marginTop="$2" numberOfLines={2} lineHeight={18}>
                  {profile.description}
                </Text>

                {/* Stats row */}
                <XStack marginTop="$3" gap="$4">
                  <XStack alignItems="center" gap="$1">
                    <MapPin size={12} color="#FF6B6B" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">{profile.currentCity}</Text>
                  </XStack>
                  <XStack alignItems="center" gap="$1">
                    <Calendar size={12} color="#FFB800" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">Desde {profile.foundedYear}</Text>
                  </XStack>
                  <XStack alignItems="center" gap="$1">
                    <Star size={12} color="#FFB800" />
                    <Text fontSize={12} fontWeight="600" color="#ffffffcc">{profile.rating}</Text>
                  </XStack>
                </XStack>

                {/* Quick numbers */}
                <XStack marginTop="$3" gap="$3">
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">{profile.activeShows}</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Shows ativos</Text>
                  </YStack>
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">{profile.totalShows}</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Total shows</Text>
                  </YStack>
                  <YStack flex={1} backgroundColor="#ffffff12" borderRadius="$3" padding="$2" alignItems="center">
                    <Text fontSize={16} fontWeight="800" color="white">{profile.reviewCount.toLocaleString('pt-BR')}</Text>
                    <Text fontSize={10} color="#ffffff88" fontWeight="600">Avaliações</Text>
                  </YStack>
                </XStack>
              </YStack>
            </YStack>
          </Animated.View>

          {/* Switch to Public */}
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
              onPress={handleLogout}
            >
              <XStack alignItems="center" gap="$3">
                <YStack width={36} height={36} borderRadius={10} backgroundColor="#1D355715" alignItems="center" justifyContent="center">
                  <ArrowLeftRight size={18} color="$royalBlue" />
                </YStack>
                <YStack>
                  <Text fontSize={15} fontWeight="600" color="$color">Modo Público</Text>
                  <Text fontSize={12} color="$textMuted">Trocar para visão do espectador</Text>
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
            <MenuGroup title="Negócio" items={BUSINESS_ITEMS} onPress={handleItemPress} />
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
              <Tent size={14} color="$textMuted" />
              <Text fontSize={12} fontWeight="700" color="$textMuted">Mundo do Circo</Text>
            </XStack>
            <Text fontSize={11} color="$borderColor">v1.0.0</Text>
          </YStack>

        </YStack>
      </ScrollView>
    </YStack>
  )
}
