import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Role } from '../features/auth/types'

interface RoleState {
  role: Role
  setRole: (role: Role) => void
  toggleRole: () => void
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      role: 'publico',
      setRole: (role) => set({ role }),
      toggleRole: () =>
        set({ role: get().role === 'publico' ? 'circo' : 'publico' }),
    }),
    {
      name: 'mc-role-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
