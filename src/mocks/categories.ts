import type { ShowCategory } from '../features/shows/types'

export interface Category {
  id: ShowCategory
  label: string
  icon: string // Lucide icon name
  color: string
}

export const mockCategories: Category[] = [
  { id: 'acrobacia', label: 'Acrobacia', icon: 'Sparkles', color: '#E63946' },
  { id: 'palhaco', label: 'Palhacos', icon: 'Smile', color: '#FFB800' },
  { id: 'magica', label: 'Magica', icon: 'Wand2', color: '#1D3557' },
  { id: 'aereo', label: 'Aereo', icon: 'Wind', color: '#2EC4B6' },
  { id: 'musical', label: 'Musical', icon: 'Music', color: '#FF6B6B' },
  { id: 'infantil', label: 'Infantil', icon: 'Baby', color: '#FF9F1C' },
  { id: 'malabarismo', label: 'Malabarismo', icon: 'Circle', color: '#457B9D' },
  { id: 'fogo', label: 'Fogo', icon: 'Flame', color: '#C1121F' },
]
