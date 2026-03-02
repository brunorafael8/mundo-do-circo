import { styled, Text, XStack } from 'tamagui'

const BadgeContainer = styled(XStack, {
  name: 'MCBadge',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 4,

  variants: {
    variant: {
      primary: { backgroundColor: '#E6394620' },
      secondary: { backgroundColor: '#FFB80020' },
      success: { backgroundColor: '#2EC4B620' },
      warning: { backgroundColor: '#FF9F1C20' },
      error: { backgroundColor: '#E6394620' },
      accent: { backgroundColor: '#1D355720' },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
})

const BadgeText = styled(Text, {
  name: 'MCBadgeText',
  fontSize: 12,
  fontWeight: '600',
  fontFamily: '$body',

  variants: {
    variant: {
      primary: { color: '#E63946' },
      secondary: { color: '#E5A600' },
      success: { color: '#2EC4B6' },
      warning: { color: '#FF9F1C' },
      error: { color: '#E63946' },
      accent: { color: '#1D3557' },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
})

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'accent'

interface MCBadgeProps {
  label: string
  variant?: BadgeVariant
}

export function MCBadge({ label, variant = 'primary' }: MCBadgeProps) {
  return (
    <BadgeContainer variant={variant}>
      <BadgeText variant={variant}>{label}</BadgeText>
    </BadgeContainer>
  )
}
