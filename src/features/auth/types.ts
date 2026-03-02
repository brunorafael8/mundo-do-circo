export type Role = 'publico' | 'circo' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: Role
}
