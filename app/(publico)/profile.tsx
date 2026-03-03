import { YStack, Text } from 'tamagui'
import { useRouter } from 'expo-router'
import { Bell, HelpCircle, Info, LogOut, LogIn, ArrowRightLeft } from '@tamagui/lucide-icons'
import { useRoleStore } from '../../src/contexts/RoleContext'
import { SettingsView } from '../../src/components/shared/SettingsView'
import { MCButton } from '../../src/components/ui/MCButton'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { Image } from 'expo-image'

const SETTINGS_ITEMS = [
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'help', label: 'Ajuda', icon: HelpCircle },
  { id: 'about', label: 'Sobre', icon: Info },
] as const

export default function ProfileScreen() {
  const router = useRouter()
  const role = useRoleStore((s) => s.role)
  const login = useRoleStore((s) => s.login)
  const logout = useRoleStore((s) => s.logout)

  const isVisitante = role === 'visitante'
  const isUsuario = role === 'usuario'

  function handleLoginUsuario() {
    login('usuario')
  }

  function handleLoginCirco() {
    login('circo')
    router.replace('/(circo)/dashboard')
  }

  function handleLogout() {
    logout()
  }

  // Render login buttons for visitors
  if (isVisitante) {
    return (
      <YStack flex={1} backgroundColor="$background" paddingTop={52} paddingHorizontal="$4">
        <Text fontFamily="$heading" fontSize={24} fontWeight="700" marginBottom="$4">
          Perfil
        </Text>

        <Animated.View entering={FadeInUp.duration(400)}>
          <YStack alignItems="center" gap="$3" marginBottom="$6">
            <Image
              source="https://picsum.photos/seed/avatar_guest/200/200"
              style={{ width: 80, height: 80, borderRadius: 40 }}
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
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(400).delay(100)}>
          <YStack gap="$3">
            <MCButton
              variant="outline"
              size="md"
              fullWidth
              icon={<LogIn size={18} />}
              onPress={handleLoginUsuario}
            >
              Entrar como Usuário
            </MCButton>
            <MCButton
              variant="outline"
              size="md"
              fullWidth
              icon={<ArrowRightLeft size={18} />}
              onPress={handleLoginCirco}
            >
              Entrar como Circo
            </MCButton>
          </YStack>
        </Animated.View>
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <YStack paddingTop={52} paddingHorizontal="$4" paddingBottom="$4">
        <Text fontFamily="$heading" fontSize={24} fontWeight="700">
          Perfil
        </Text>
      </YStack>

      <SettingsView
        profileSection={{
          title: 'Usuário Logado',
          subtitle: 'usuario@exemplo.com',
          imagePlaceholder: 'user',
        }}
        items={[
          ...SETTINGS_ITEMS,
          { id: 'logout', label: 'Sair', icon: LogOut, variant: 'danger' as const },
        ]}
        switchRoleLabel="Sair"
        onSwitchRole={handleLogout}
        onItemPress={(id) => {
          if (id === 'logout') {
            handleLogout()
          }
        }}
      />
    </YStack>
  )
}
