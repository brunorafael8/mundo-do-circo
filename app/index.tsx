import { Redirect } from 'expo-router'
import { useRoleStore } from '../src/contexts/RoleContext'

export default function Index() {
  const role = useRoleStore((s) => s.role)

  if (role === 'circo') {
    return <Redirect href="/(circo)/dashboard" />
  }

  return <Redirect href="/(publico)/(home)" />
}
