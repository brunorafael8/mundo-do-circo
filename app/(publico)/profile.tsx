import { YStack, XStack, Text, Image } from 'tamagui'
import {
  ArrowRightLeft,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoleStore } from '../../src/contexts/RoleContext'
import { MCCard } from '../../src/components/ui/MCCard'
import { MCButton } from '../../src/components/ui/MCButton'

const settingsItems = [
  { id: 'notifications', label: 'Notificacoes', icon: Bell },
  { id: 'help', label: 'Ajuda', icon: HelpCircle },
  { id: 'about', label: 'Sobre', icon: Info },
  { id: 'logout', label: 'Sair', icon: LogOut },
] as const

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const setRole = useRoleStore((s) => s.setRole)

  function handleSwitchToCirco() {
    setRole('circo')
    router.replace('/(circo)/dashboard')
  }

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      paddingTop={insets.top + 8}
      paddingHorizontal="$4"
    >
      <Text
        fontFamily="$heading"
        fontSize={24}
        fontWeight="700"
        marginBottom="$4"
      >
        Perfil
      </Text>

      <YStack alignItems="center" gap="$3" marginBottom="$6">
        <Image
          source={{ uri: 'https://picsum.photos/seed/avatar/200/200' }}
          width={80}
          height={80}
          borderRadius={40}
        />
        <YStack alignItems="center" gap={4}>
          <Text fontFamily="$heading" fontSize={20} fontWeight="700">
            Visitante
          </Text>
          <Text fontSize={14} color="$textMuted">
            Bem-vindo ao Mundo do Circo
          </Text>
        </YStack>
      </YStack>

      <MCButton
        variant="outline"
        size="md"
        fullWidth
        icon={<ArrowRightLeft size={18} />}
        marginBottom="$4"
        onPress={handleSwitchToCirco}
      >
        Trocar para Circo
      </MCButton>

      <YStack gap="$3">
        {settingsItems.map((item) => {
          const Icon = item.icon
          return (
            <MCCard
              key={item.id}
              pressable
              padding="$3"
              onPress={() => {}}
            >
              <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap="$3">
                  <XStack
                    width={40}
                    height={40}
                    borderRadius={10}
                    backgroundColor={
                      item.id === 'logout' ? '#E6394615' : '$surfaceHover'
                    }
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      size={20}
                      color={item.id === 'logout' ? '$error' : '$color'}
                    />
                  </XStack>
                  <Text
                    fontSize={16}
                    fontWeight="500"
                    color={item.id === 'logout' ? '$error' : '$color'}
                  >
                    {item.label}
                  </Text>
                </XStack>
                <ChevronRight size={18} color="$textMuted" />
              </XStack>
            </MCCard>
          )
        })}
      </YStack>
    </YStack>
  )
}
