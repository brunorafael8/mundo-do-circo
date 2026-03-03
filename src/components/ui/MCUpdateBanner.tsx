import { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { XStack, Text } from 'tamagui'
import { RefreshCw } from '@tamagui/lucide-icons'

export function MCUpdateBanner() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (Platform.OS !== 'web') return

    function onUpdate() {
      setUpdateAvailable(true)
    }

    window.addEventListener('sw-update-available', onUpdate)
    return () => window.removeEventListener('sw-update-available', onUpdate)
  }, [])

  if (!updateAvailable) return null

  function handleUpdate() {
    if (typeof window !== 'undefined' && (window as any).__activateNewSW) {
      (window as any).__activateNewSW()
    }
  }

  return (
    <XStack
      position="absolute"
      bottom={100}
      left={16}
      right={16}
      backgroundColor="$royalBlue"
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderRadius={12}
      alignItems="center"
      justifyContent="space-between"
      zIndex={9999}
      elevation={5}
      shadowColor="rgba(0,0,0,0.2)"
      shadowRadius={8}
      pressStyle={{ opacity: 0.9 }}
      onPress={handleUpdate}
      cursor="pointer"
    >
      <Text fontSize={14} fontWeight="600" color="white" flex={1}>
        Nova versao disponivel
      </Text>
      <XStack alignItems="center" gap={6}>
        <Text fontSize={14} fontWeight="700" color="white">
          Atualizar
        </Text>
        <RefreshCw size={16} color="white" />
      </XStack>
    </XStack>
  )
}
