import { memo, useCallback } from 'react'
import { FlatList } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { ChevronRight, type LucideIcon } from '@tamagui/lucide-icons'
import { MCCard } from '../ui/MCCard'
import { MCButton } from '../ui/MCButton'
import type { Role } from '../../features/auth/types'

export interface SettingsItem {
  id: string
  label: string
  icon: LucideIcon
  variant?: 'default' | 'danger'
}

interface ProfileSectionProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  imagePlaceholder?: 'circus' | 'user' | 'guest'
}

interface SettingsViewProps {
  profileSection?: ProfileSectionProps
  items: readonly SettingsItem[]
  switchRoleLabel?: string
  onSwitchRole?: () => void
  onLogout?: () => void
  onItemPress?: (id: string) => void
  switchRoleEnabled?: boolean
  isCirco?: boolean
}

export const SettingsView = memo(function SettingsView({
  profileSection,
  items,
  switchRoleLabel,
  onSwitchRole,
  onLogout,
  onItemPress,
  switchRoleEnabled = true,
  isCirco = false,
}: SettingsViewProps) {
  
  const handleItemPress = useCallback((id: string) => {
    if (onItemPress) {
      onItemPress(id)
    }
  }, [onItemPress])

  const renderItem = useCallback(({ item, index }: { item: SettingsItem; index: number }) => {
    const Icon = item.icon
    const isLast = index === items.length - 1

    return (
      <Animated.View entering={FadeInUp.duration(320).delay(150 + index * 75)}>
        <YStack paddingHorizontal="$4" paddingBottom={isLast ? 16 : 0}>
          <MCCard 
            variant="elevated" 
            padding={0} 
            overflow="hidden" 
            elevation={isLast ? 0 : 2}
          >
            <XStack
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal="$4"
              paddingVertical="$3"
              borderBottomWidth={isLast ? 0 : 1}
              borderBottomColor="$borderColor"
              cursor="pointer"
              pressStyle={{ backgroundColor: '$surfaceHover' }}
              onPress={() => handleItemPress(item.id)}
            >
              <XStack alignItems="center" gap="$3">
                <XStack
                  width={40}
                  height={40}
                  borderRadius={10}
                  backgroundColor={item.variant === 'danger' ? '#E6394615' : '$surfaceHover'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon 
                    size={20} 
                    color={item.variant === 'danger' ? '$error' : '$color'} 
                  />
                </XStack>
                <Text
                  fontSize={15}
                  fontWeight="500"
                  color={item.variant === 'danger' ? '$error' : '$color'}
                >
                  {item.label}
                </Text>
              </XStack>
              <ChevronRight size={18} color="$textMuted" />
            </XStack>
          </MCCard>
        </YStack>
      </Animated.View>
    )
  }, [handleItemPress, items])

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <YStack padding="$4" gap="$4">
          {/* Profile Section */}
          {profileSection && (
            <Animated.View entering={FadeInUp.duration(400)}>
              <MCCard variant="elevated" gap="$3">
                <XStack alignItems="center" gap="$3">
                  <Image
                    source={profileSection.imageUrl || (profileSection.imagePlaceholder === 'user' 
                      ? "https://loremflickr.com/200/200/face" 
                      : profileSection.imagePlaceholder === 'guest'
                      ? "https://picsum.photos/seed/avatar_guest/200/200"
                      : undefined)}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                    contentFit="cover"
                  />
                  <YStack flex={1} gap={2}>
                    <Text fontFamily="$heading" fontSize={18} fontWeight="700" color="$color">
                      {profileSection.title}
                    </Text>
                    {profileSection.subtitle && (
                      <Text fontSize={13} color="$textMuted" numberOfLines={2}>
                        {profileSection.subtitle}
                      </Text>
                    )}
                  </YStack>
                </XStack>
              </MCCard>
            </Animated.View>
          )}

          {/* Switch Role Button */}
          {switchRoleEnabled && switchRoleLabel && (
            <Animated.View entering={FadeInUp.duration(400).delay(100)}>
              <MCButton
                variant="secondary"
                size="md"
                fullWidth
                onPress={onSwitchRole}
              >
                {switchRoleLabel}
              </MCButton>
            </Animated.View>
          )}
        </YStack>
      }
      contentContainerStyle={{ gap: 16 }}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  )
})
