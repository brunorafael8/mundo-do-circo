import { createTamagui, createTokens } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes as tamaguiThemes, tokens as defaultTokens } from '@tamagui/config/v4'

const headingFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    true: 24,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    true: '700',
  },
  face: {
    700: { normal: 'InterBold' },
    800: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont({
  size: {
    1: 12,
    2: 13,
    3: 14,
    4: 15,
    5: 16,
    6: 18,
    7: 20,
    true: 15,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    true: '400',
  },
})

const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    // Circus theme colors
    circusRed: '#E63946',
    circusRedLight: '#FF6B6B',
    circusRedDark: '#C1121F',
    sunshineYellow: '#FFB800',
    sunshineYellowLight: '#FFD166',
    sunshineYellowDark: '#E5A600',
    royalBlue: '#1D3557',
    royalBlueLight: '#457B9D',
    warmCream: '#FFF8F0',
    warmCreamDark: '#F5EDE3',
    darkNavy: '#1A1A2E',
    white: '#FFFFFF',
    success: '#2EC4B6',
    warning: '#FF9F1C',
    error: '#E63946',
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#6C757D',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#212529',
  },
})

const lightTheme = {
  background: tokens.color.warmCream,
  backgroundHover: tokens.color.warmCreamDark,
  backgroundPress: tokens.color.warmCreamDark,
  backgroundFocus: tokens.color.warmCreamDark,
  color: tokens.color.darkNavy,
  colorHover: tokens.color.darkNavy,
  colorPress: tokens.color.darkNavy,
  colorFocus: tokens.color.darkNavy,
  borderColor: tokens.color.gray300,
  borderColorHover: tokens.color.gray400,
  borderColorPress: tokens.color.gray400,
  borderColorFocus: tokens.color.circusRed,
  shadowColor: 'rgba(0,0,0,0.08)',
  shadowColorHover: 'rgba(0,0,0,0.12)',
  // Semantic
  primary: tokens.color.circusRed,
  primaryHover: tokens.color.circusRedDark,
  secondary: tokens.color.sunshineYellow,
  secondaryHover: tokens.color.sunshineYellowDark,
  accent: tokens.color.royalBlue,
  accentHover: tokens.color.royalBlueLight,
  surface: tokens.color.white,
  surfaceHover: tokens.color.gray100,
  textMuted: tokens.color.gray600,
  textSecondary: tokens.color.gray700,
  success: tokens.color.success,
  warning: tokens.color.warning,
  error: tokens.color.error,
  cardBackground: tokens.color.white,
}

const config = createTamagui({
  defaultFont: 'body',
  animations: {
    fast: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: 'spring',
      damping: 15,
      mass: 1,
      stiffness: 150,
    },
    slow: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
  },
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens,
  themes: {
    light: lightTheme,
    light_red: {
      ...lightTheme,
      background: tokens.color.circusRed,
      backgroundHover: tokens.color.circusRedDark,
      backgroundPress: tokens.color.circusRedDark,
      color: tokens.color.white,
      colorHover: tokens.color.white,
    },
    light_yellow: {
      ...lightTheme,
      background: tokens.color.sunshineYellow,
      backgroundHover: tokens.color.sunshineYellowDark,
      backgroundPress: tokens.color.sunshineYellowDark,
      color: tokens.color.darkNavy,
      colorHover: tokens.color.darkNavy,
    },
    light_blue: {
      ...lightTheme,
      background: tokens.color.royalBlue,
      backgroundHover: tokens.color.royalBlueLight,
      backgroundPress: tokens.color.royalBlueLight,
      color: tokens.color.white,
      colorHover: tokens.color.white,
    },
  },
  media: {
    xs: { maxWidth: 480 },
    sm: { maxWidth: 768 },
    md: { maxWidth: 1024 },
    lg: { maxWidth: 1280 },
    xl: { minWidth: 1281 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
