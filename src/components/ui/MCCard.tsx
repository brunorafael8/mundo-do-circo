import { styled, YStack } from 'tamagui'

export const MCCard = styled(YStack, {
  name: 'MCCard',
  backgroundColor: '$cardBackground',
  borderRadius: 16,
  padding: '$4',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 3,

  variants: {
    variant: {
      default: {},
      bordered: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      elevated: {
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 5,
      },
    },
    pressable: {
      true: {
        pressStyle: {
          scale: 0.98,
          opacity: 0.9,
        },
        cursor: 'pointer',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})
