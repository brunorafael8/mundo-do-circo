import { styled, Button, type ButtonProps } from 'tamagui'

export const MCButton = styled(Button, {
  name: 'MCButton',
  borderRadius: 14,
  fontFamily: '$body',
  fontWeight: '600',
  pressStyle: { opacity: 0.85, scale: 0.98 },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        hoverStyle: { backgroundColor: '$primaryHover' },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$color',
        hoverStyle: { backgroundColor: '$secondaryHover' },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$primary',
        color: '$primary',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
      },
    },
    size: {
      sm: {
        height: 36,
        paddingHorizontal: 16,
        fontSize: 13,
      },
      md: {
        height: 48,
        paddingHorizontal: 24,
        fontSize: 15,
      },
      lg: {
        height: 56,
        paddingHorizontal: 32,
        fontSize: 17,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type MCButtonProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
