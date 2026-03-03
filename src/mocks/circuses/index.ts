// Estrela Vermelha (Clássico/Tradicional)
export { estrelaVermelhaProfile } from './estrela-vermelha/profile'
export { estrelaVermelhaShows } from './estrela-vermelha/shows'
export { estrelaVermelhaStats } from './estrela-vermelha/stats'
export { estrelaVermelhaSales } from './estrela-vermelha/sales'
export { estrelaVermelhaImages } from './estrela-vermelha/images'

// Lumière (Contemporâneo/Elegante)
export { lumiereProfile } from './lumiere/profile'
export { lumiereShows } from './lumiere/shows'
export { lumiereStats } from './lumiere/stats'
export { lumiereSales } from './lumiere/sales'
export { lumiereImages } from './lumiere/images'

// Pipoca & Alegria (Infantil/Familiar)
export { pipocaAlegriaProfile } from './pipoca-alegria/profile'
export { pipocaAlegriaShows } from './pipoca-alegria/shows'
export { pipocaAlegriaStats } from './pipoca-alegria/stats'
export { pipocaAlegriaSales } from './pipoca-alegria/sales'
export { pipocaAlegriaImages } from './pipoca-alegria/images'

// Fogo Negro (Radical/Extremo)
export { fogoNegroProfile } from './fogo-negro/profile'
export { fogoNegroShows } from './fogo-negro/shows'
export { fogoNegroStats } from './fogo-negro/stats'
export { fogoNegroSales } from './fogo-negro/sales'
export { fogoNegroImages } from './fogo-negro/images'

// Brasileiro (Cultural/Regional)
export { brasileiroProfile } from './brasileiro/profile'
export { brasileiroShows } from './brasileiro/shows'
export { brasileiroStats } from './brasileiro/stats'
export { brasileiroSales } from './brasileiro/sales'
export { brasileiroImages } from './brasileiro/images'

// Aggregated data
import { estrelaVermelhaProfile } from './estrela-vermelha/profile'
import { estrelaVermelhaShows } from './estrela-vermelha/shows'
import { estrelaVermelhaStats } from './estrela-vermelha/stats'
import { estrelaVermelhaSales } from './estrela-vermelha/sales'

import { lumiereProfile } from './lumiere/profile'
import { lumiereShows } from './lumiere/shows'
import { lumiereStats } from './lumiere/stats'
import { lumiereSales } from './lumiere/sales'

import { pipocaAlegriaProfile } from './pipoca-alegria/profile'
import { pipocaAlegriaShows } from './pipoca-alegria/shows'
import { pipocaAlegriaStats } from './pipoca-alegria/stats'
import { pipocaAlegriaSales } from './pipoca-alegria/sales'

import { fogoNegroProfile } from './fogo-negro/profile'
import { fogoNegroShows } from './fogo-negro/shows'
import { fogoNegroStats } from './fogo-negro/stats'
import { fogoNegroSales } from './fogo-negro/sales'

import { brasileiroProfile } from './brasileiro/profile'
import { brasileiroShows } from './brasileiro/shows'
import { brasileiroStats } from './brasileiro/stats'
import { brasileiroSales } from './brasileiro/sales'

import type { CircusProfile, CircusStats, Sale } from '../../features/circus/types'
import type { Show } from '../../features/shows/types'

// All circuses
export const allCircusProfiles: CircusProfile[] = [
  estrelaVermelhaProfile,
  lumiereProfile,
  pipocaAlegriaProfile,
  fogoNegroProfile,
  brasileiroProfile,
]

// All shows (15 total, 3 per circus)
export const allShows: Show[] = [
  ...estrelaVermelhaShows,
  ...lumiereShows,
  ...pipocaAlegriaShows,
  ...fogoNegroShows,
  ...brasileiroShows,
]

// All stats indexed by circus ID
export const allCircusStats: Record<string, CircusStats> = {
  'estrela-vermelha': estrelaVermelhaStats,
  'lumiere': lumiereStats,
  'pipoca-alegria': pipocaAlegriaStats,
  'fogo-negro': fogoNegroStats,
  'brasileiro': brasileiroStats,
}

// All sales indexed by circus ID
export const allCircusSales: Record<string, Sale[]> = {
  'estrela-vermelha': estrelaVermelhaSales,
  'lumiere': lumiereSales,
  'pipoca-alegria': pipocaAlegriaSales,
  'fogo-negro': fogoNegroSales,
  'brasileiro': brasileiroSales,
}
