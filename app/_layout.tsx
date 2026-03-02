import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TamaguiProvider } from 'tamagui'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { queryClient } from '../src/lib/queryClient'
import config from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="light">
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
