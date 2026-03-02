import { ScrollView } from 'react-native'
import { YStack, XStack, Text, Image } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import {
  User,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  ArrowLeftRight,
} from '@tamagui/lucide-icons'
import { useCircusProfile } from '../../src/features/circus/hooks'
import { MCCard } from '../../src/components/ui/MCCard'
import { MCButton } from '../../src/components/ui/MCButton'
import { MCLoading } from '../../src/components/ui/MCLoading'
import { useRoleStore } from '../../src/contexts/RoleContext'

const SETTINGS_ITEMS = [
  { id: 'profile', label: 'Editar Perfil', icon: User },
  { id: 'notifications', label: 'Notificacoes', icon: Bell },
  { id: 'payments', label: 'Pagamentos', icon: CreditCard },
  { id: 'help', label: 'Ajuda', icon: HelpCircle },
  { id: 'logout', label: 'Sair', icon: LogOut },
] as const

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { data: profile, isLoading } = useCircusProfile()
  const setRole = useRoleStore((s) => s.setRole)

  const handleSwitchToPublic = () => {
    setRole('publico')
    router.replace('/(publico)/(home)')
  }

  if (isLoading) {
    return <MCLoading />
  }

  if (!profile) return null

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingTop={insets.top + 8} padding="$4" gap="$4">
          {/* Header */}
          <Text fontFamily="$heading" fontSize={24} fontWeight="800" color="$color">
            Configuracoes
          </Text>

          {/* Circus Profile */}
          <MCCard variant="elevated" gap="$3">
            <XStack alignItems="center" gap="$3">
              <Image
                source={{ uri: profile.logoUrl }}
                width={64}
                height={64}
                borderRadius={32}
                resizeMode="cover"
              />
              <YStack flex={1} gap={2}>
                <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
                  {profile.name}
                </Text>
                <Text fontSize={13} color="$textMuted" numberOfLines={2}>
                  {profile.description}
                </Text>
              </YStack>
            </XStack>
          </MCCard>

          {/* Switch Role */}
          <MCButton
            variant="secondary"
            size="md"
            fullWidth
            icon={<ArrowLeftRight size={18} color="$color" />}
            onPress={handleSwitchToPublic}
          >
            Trocar para Publico
          </MCButton>

          {/* Settings Items */}
          <MCCard variant="elevated" padding={0} overflow="hidden">
            {SETTINGS_ITEMS.map((item, index) => {
              const Icon = item.icon
              const isLast = index === SETTINGS_ITEMS.length - 1
              const isLogout = item.id === 'logout'

              return (
                <XStack
                  key={item.id}
                  alignItems="center"
                  justifyContent="space-between"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  borderBottomWidth={isLast ? 0 : 1}
                  borderBottomColor="$borderColor"
                  cursor="pointer"
                  pressStyle={{ backgroundColor: '$surfaceHover' }}
                >
                  <XStack alignItems="center" gap="$3">
                    <Icon size={20} color={isLogout ? '$error' : '$textSecondary'} />
                    <Text
                      fontSize={15}
                      fontWeight="500"
                      color={isLogout ? '$error' : '$color'}
                    >
                      {item.label}
                    </Text>
                  </XStack>
                  <ChevronRight size={18} color="$textMuted" />
                </XStack>
              )
            })}
          </MCCard>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
