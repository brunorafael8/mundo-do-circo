import { XStack } from 'tamagui'
import { MCInput } from '../ui/MCInput'
import { Search } from '@tamagui/lucide-icons'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar shows, circos...',
}: SearchBarProps) {
  return (
    <XStack alignItems="center" gap="$2">
      <XStack flex={1} position="relative">
        <MCInput
          flex={1}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          paddingLeft={44}
          borderWidth={0}
          backgroundColor="transparent"
        />
        <XStack
          position="absolute"
          left={14}
          top={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <Search size={22} color="$brandOrange" />
        </XStack>
      </XStack>
    </XStack>
  )
}
