import { Tabs } from 'expo-router'
import { LayoutDashboard, Clapperboard, Receipt, Settings } from '@tamagui/lucide-icons'

export default function CircoLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF8F0',
          borderTopColor: '#DEE2E6',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#ADB5BD',
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(shows)"
        options={{
          title: 'Shows',
          tabBarIcon: ({ color, size }) => (
            <Clapperboard size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: 'Vendas',
          tabBarIcon: ({ color, size }) => (
            <Receipt size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
