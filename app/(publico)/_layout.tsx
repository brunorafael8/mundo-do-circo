import { Tabs } from 'expo-router'
import { TabBar } from '../../src/components/ui/TabBar'

export default function PublicoLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="agenda" />
      <Tabs.Screen name="tickets" />
      <Tabs.Screen name="local" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}
