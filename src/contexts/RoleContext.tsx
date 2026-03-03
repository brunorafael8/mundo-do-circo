import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Role } from '../features/auth/types'

// Use localStorage on web, AsyncStorage on native
const createWebStorage = () => {
  return {
    getItem: async (name: string): Promise<string | null> => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(name)
      }
      return null
    },
    setItem: async (name: string, value: string): Promise<void> => {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(name, value)
      }
    },
    removeItem: async (name: string): Promise<void> => {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(name)
      }
    },
  }
}

interface RoleState {
  role: Role
  login: (role: Role) => void
  logout: () => void
  setRole: (role: Role) => void
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: 'visitante',
      login: (role) => set({ role }),
      logout: () => set({ role: 'visitante' }),
      setRole: (role) => set({ role }),
    }),
    {
      name: 'mc-role-storage',
      storage: createJSONStorage(() => createWebStorage()),
    }
  )
)
