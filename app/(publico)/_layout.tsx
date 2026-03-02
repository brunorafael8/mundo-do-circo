import { Tabs } from 'expo-router'
import { Home, Search, Ticket, User } from '@tamagui/lucide-icons'

export default function PublicoLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: '#ADB5BD',
        tabBarStyle: {
          backgroundColor: '#FFF8F0',
          borderTopColor: '#E9ECEF',
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Ingressos',
          tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
