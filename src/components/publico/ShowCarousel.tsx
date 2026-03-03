import { ScrollView, Pressable } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { Star } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowCarouselProps {
  shows: Show[]
  onShowPress?: (show: Show) => void
}

export function ShowCarousel({ shows, onShowPress }: ShowCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      snapToInterval={336} // 320 width + 16 gap
      decelerationRate="fast"
    >
      {shows.map((show) => (
        <Link
          key={show.id}
          href={`/(publico)/(home)/show/${show.id}`}
          asChild
        >
          <Pressable>
            <Link.AppleZoom>
              <MCCard
                pressable
                padding={0}
                overflow="hidden"
                width={320} // w-80 in tailwind is 20rem = 320px
                backgroundColor="$white"
                borderRadius={12}
                marginBottom={24}
              >
                {/* Image Area */}
                <YStack height={192} width="100%" position="relative">
                  <Image
                    source={show.imageUrl}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                  {/* Destaque Badge */}
                  <YStack
                    position="absolute"
                    top={12}
                    right={12}
                    backgroundColor="$sunshineYellowDark" // text-secondary
                    paddingHorizontal={12}
                    paddingVertical={4}
                    borderRadius={16}
                  >
                    <Text color="$white" fontSize={10} fontWeight="bold" textTransform="uppercase" letterSpacing={2}>
                      Destaque
                    </Text>
                  </YStack>
                </YStack>

                {/* Details Area */}
                <YStack padding={20} position="relative" backgroundColor="$white">
                  {/* Cutouts for ticket effect */}
                  <XStack position="absolute" top={-12} left={0} right={0} justifyContent="space-between" paddingHorizontal={16} zIndex={10}>
                    <YStack width={24} height={24} borderRadius={12} backgroundColor="$background" marginLeft={-28} />
                    <YStack width={24} height={24} borderRadius={12} backgroundColor="$background" marginRight={-28} />
                  </XStack>

                  <YStack borderTopWidth={2} borderStyle="dashed" borderColor="$sunshineYellow" paddingTop={16}>
                    <Text fontSize={12} color="$circusRed" fontWeight="bold" textTransform="uppercase" letterSpacing={2} marginBottom={4} numberOfLines={1}>
                      🎪 {show.circusName}
                    </Text>
                    <Text fontFamily="$heading" fontSize={24} fontWeight="700" color="$royalBlue" marginBottom={4}>
                      {show.title}
                    </Text>

                    <Text fontSize={14} color="$gray600" marginBottom={16}>
                      📅 {show.dates?.[0]?.date || '15 de Outubro'} • {show.dates?.[0]?.time || '19:30'}
                    </Text>

                    <YStack
                      backgroundColor="$circusRed"
                      paddingVertical={12}
                      borderRadius={8}
                      alignItems="center"
                    >
                      <Text color="$white" fontWeight="bold" fontSize={14} textTransform="uppercase" letterSpacing={2}>
                        Garantir Ingresso
                      </Text>
                    </YStack>
                  </YStack>
                </YStack>
              </MCCard>
            </Link.AppleZoom>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  )
}
