import { styled, Input } from 'tamagui'

export const MCInput = styled(Input, {
  name: 'MCInput',
  backgroundColor: '$surface',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '$borderColor',
  paddingHorizontal: '$4',
  height: 48,
  fontSize: 15,
  fontFamily: '$body',
  color: '$color',
  placeholderTextColor: '$textMuted',

  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
  },

  variants: {
    size: {
      sm: { height: 40, fontSize: 13 },
      md: { height: 48, fontSize: 15 },
      lg: { height: 56, fontSize: 17 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})
