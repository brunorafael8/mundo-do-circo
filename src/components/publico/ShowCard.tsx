import { Pressable } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { MCCard } from '../ui/MCCard'
import { MCBadge } from '../ui/MCBadge'
import { Star } from '@tamagui/lucide-icons'
import { formatCurrency } from '../../utils/formatters'
import type { Show } from '../../features/shows/types'

interface ShowCardProps {
  show: Show
  onPress?: () => void
  compact?: boolean
}

export function ShowCard({ show, onPress, compact }: ShowCardProps) {
  if (compact) {
    return (
      <Link href={`/(publico)/(home)/show/${show.id}`} asChild>
        <Pressable>
          <Link.AppleZoom>
            <MCCard
              pressable
              onPress={onPress}
              padding={0}
              overflow="hidden"
              width={180}
            >
              <Image
                source={show.imageUrl}
                style={{ width: 180, height: 120 }}
                contentFit="cover"
              />
              <YStack padding="$2" gap="$1">
                <Text fontSize={13} fontWeight="600" numberOfLines={1}>
                  {show.title}
                </Text>
                <Text fontSize={11} color="$textMuted" numberOfLines={1}>
                  {show.circusName}
                </Text>
                <XStack alignItems="center" justifyContent="space-between">
                  <XStack alignItems="center" gap={4}>
                    <Star size={12} color="#FFB800" fill="#FFB800" />
                    <Text fontSize={11} fontWeight="600">
                      {show.rating}
                    </Text>
                  </XStack>
                  <Text fontSize={13} fontWeight="700" color="$primary">
                    {formatCurrency(show.price)}
                  </Text>
                </XStack>
              </YStack>
            </MCCard>
          </Link.AppleZoom>
        </Pressable>
      </Link>
    )
  }

  return (
    <Link href={`/(publico)/(home)/show/${show.id}`} asChild>
      <Pressable>
        <Link.AppleZoom>
          <MCCard
            pressable
            onPress={onPress}
            padding={0}
            overflow="hidden"
            backgroundColor="$white"
            borderRadius={12}
            marginBottom="$2"
            elevation={2}
            shadowColor="rgba(0,0,0,0.1)"
            shadowRadius={5}
          >
            <XStack height={128}>
              {/* Image Area */}
              <YStack width="33%">
                <Image
                  source={show.imageUrl}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </YStack>

              {/* Details Area */}
              <XStack flex={1} position="relative" alignItems="center">
                {/* Ticket effect cutouts on the left edge */}
                <YStack position="absolute" left={0} top={0} bottom={0} justifyContent="space-around" paddingVertical={8} zIndex={10}>
                  <YStack width={16} height={16} borderRadius={8} backgroundColor="$background" marginLeft={-8} />
                  <YStack width={16} height={16} borderRadius={8} backgroundColor="$background" marginLeft={-8} />
                </YStack>

                <YStack flex={1} paddingLeft={16} paddingRight={12} paddingVertical={12} justifyContent="space-between" height="100%">
                  <YStack>
                    <Text fontSize={11} color="$circusRed" fontWeight="bold" textTransform="uppercase" letterSpacing={1} marginBottom={2} numberOfLines={1}>
                      🎪 {show.circusName}
                    </Text>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$royalBlue" numberOfLines={1}>
                      {show.title}
                    </Text>
                    <Text fontSize={10} color="$gray500" fontWeight="bold" textTransform="uppercase" marginTop={4}>
                      📅 {show.dates?.[0]?.date || '18 Out'} • {show.dates?.[0]?.time || '21:00'}
                    </Text>
                  </YStack>

                  <XStack alignItems="center" justifyContent="space-between" marginTop={8}>
                    <Text fontSize={14} fontWeight="bold" color="$darkNavy">
                      {formatCurrency(show.price)}
                    </Text>
                    <YStack
                      backgroundColor="$royalBlue"
                      paddingHorizontal={12}
                      paddingVertical={6}
                      borderRadius={4}
                      pressStyle={{ opacity: 0.8 }}
                    >
                      <Text color="$white" fontSize={10} fontWeight="bold" textTransform="uppercase">
                        Comprar
                      </Text>
                    </YStack>
                  </XStack>
                </YStack>
              </XStack>
            </XStack>
          </MCCard>
        </Link.AppleZoom>
      </Pressable>
    </Link>
  )
}
