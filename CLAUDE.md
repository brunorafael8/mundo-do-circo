# Mundo do Circo

## Stack
- Expo SDK 55 + expo-router v7
- Tamagui (styling + components)
- TanStack Query v5 + Zustand
- TypeScript strict

## Architecture
- `app/` = routing only (expo-router file-based)
- `src/` = all business logic
- `src/features/` = domain modules (shows, tickets, circus, auth)
- `src/mocks/` = mock data (swap for real API later - only api.ts changes)
- Components prefixed `MC` (Mundo do Circo) to avoid Tamagui collisions

## Views
- `(publico)` = audience view (default)
- `(circo)` = circus management view
- Role switching via Zustand + AsyncStorage

## Patterns
- Feature modules: api.ts (data fetching), hooks.ts (React Query), types.ts, keys.ts
- Tamagui props (not className): `<YStack padding="$4" bg="$background">`
- Use `$` prefix for theme tokens
- Mock delay: 200-600ms simulated

## Theme
- Primary: Circus Red #E63946
- Secondary: Sunshine Yellow #FFB800
- Accent: Royal Blue #1D3557
- Background: Warm Cream #FFF8F0
