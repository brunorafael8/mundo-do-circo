import { Tabs } from 'expo-router'
import { CircoTabBar } from '../../src/components/ui/CircoTabBar'

export default function CircoLayout() {
  return (
    <Tabs
      tabBar={(props) => <CircoTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="(shows)" />
      <Tabs.Screen name="agenda" />
      <Tabs.Screen name="sales" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}
