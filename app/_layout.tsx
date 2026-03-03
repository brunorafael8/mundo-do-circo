import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TamaguiProvider } from 'tamagui'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { queryClient } from '../src/lib/queryClient'
import { MCUpdateBanner } from '../src/components/ui/MCUpdateBanner'
import config from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

function hideWebSplash() {
  if (Platform.OS === 'web') {
    // Clear the safety timeout since app loaded normally
    if (typeof window !== 'undefined' && (window as any).__clearSplashTimer) {
      (window as any).__clearSplashTimer()
    }
    const splash = document.getElementById('web-splash')
    if (splash) {
      splash.classList.add('hide')
      setTimeout(() => splash.remove(), 300)
    }
  }
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    ...require('@expo-google-fonts/kavoon'),
  })

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Allow app to render even if fonts fail to load
    // This prevents the splash screen from getting stuck
    const timer = setTimeout(() => {
      setIsReady(true)
      SplashScreen.hideAsync()
      hideWebSplash()
    }, 1000) // Give fonts 1 second to load, then proceed anyway

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsReady(true)
      SplashScreen.hideAsync()
      hideWebSplash()
    }
  }, [fontsLoaded, fontError])

  // Show minimal loading while fonts are loading (max 1 second)
  if (!isReady) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="light">
        <Stack screenOptions={{ headerShown: false }} />
        <MCUpdateBanner />
        <StatusBar style="dark" />
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
