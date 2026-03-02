import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack, XStack, Text } from 'tamagui'
import { MCInput } from '../ui/MCInput'
import { MCButton } from '../ui/MCButton'
import { mockCategories } from '../../mocks/categories'
import type { ShowCategory } from '../../features/shows/types'

export interface ShowFormData {
  title: string
  description: string
  category: ShowCategory
  date: string
  time: string
  price: string
  capacity: string
  location: string
  ageRating: string
}

interface ShowFormProps {
  initialData?: Partial<ShowFormData>
  onSubmit: (data: ShowFormData) => void
  submitLabel?: string
}

export function ShowForm({
  initialData,
  onSubmit,
  submitLabel = 'Criar Show',
}: ShowFormProps) {
  const [form, setForm] = useState<ShowFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    category: initialData?.category ?? 'acrobacia',
    date: initialData?.date ?? '',
    time: initialData?.time ?? '',
    price: initialData?.price ?? '',
    capacity: initialData?.capacity ?? '',
    location: initialData?.location ?? '',
    ageRating: initialData?.ageRating ?? 'Livre',
  })

  const updateField = (field: keyof ShowFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <YStack gap="$4" padding="$4">
      <YStack gap="$2">
        <Text fontSize={13} fontWeight="600" color="$textSecondary">
          Titulo
        </Text>
        <MCInput
          value={form.title}
          onChangeText={(v) => updateField('title', v)}
          placeholder="Nome do show"
        />
      </YStack>

      <YStack gap="$2">
        <Text fontSize={13} fontWeight="600" color="$textSecondary">
          Descricao
        </Text>
        <MCInput
          value={form.description}
          onChangeText={(v) => updateField('description', v)}
          placeholder="Descreva o show..."
          multiline
          numberOfLines={4}
          height={100}
          textAlignVertical="top"
          paddingTop="$3"
        />
      </YStack>

      <YStack gap="$2">
        <Text fontSize={13} fontWeight="600" color="$textSecondary">
          Categoria
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$2">
            {mockCategories.map((cat) => (
              <XStack
                key={cat.id}
                paddingHorizontal="$3"
                paddingVertical="$2"
                borderRadius={20}
                backgroundColor={form.category === cat.id ? '$primary' : '$surface'}
                borderWidth={1}
                borderColor={form.category === cat.id ? '$primary' : '$borderColor'}
                onPress={() => updateField('category', cat.id)}
                cursor="pointer"
              >
                <Text
                  fontSize={13}
                  fontWeight="600"
                  color={form.category === cat.id ? 'white' : '$color'}
                >
                  {cat.label}
                </Text>
              </XStack>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

      <XStack gap="$3">
        <YStack flex={1} gap="$2">
          <Text fontSize={13} fontWeight="600" color="$textSecondary">
            Data
          </Text>
          <MCInput
            value={form.date}
            onChangeText={(v) => updateField('date', v)}
            placeholder="2026-03-15"
          />
        </YStack>
        <YStack flex={1} gap="$2">
          <Text fontSize={13} fontWeight="600" color="$textSecondary">
            Horario
          </Text>
          <MCInput
            value={form.time}
            onChangeText={(v) => updateField('time', v)}
            placeholder="19:00"
          />
        </YStack>
      </XStack>

      <XStack gap="$3">
        <YStack flex={1} gap="$2">
          <Text fontSize={13} fontWeight="600" color="$textSecondary">
            Preco (R$)
          </Text>
          <MCInput
            value={form.price}
            onChangeText={(v) => updateField('price', v)}
            placeholder="80.00"
            keyboardType="numeric"
          />
        </YStack>
        <YStack flex={1} gap="$2">
          <Text fontSize={13} fontWeight="600" color="$textSecondary">
            Capacidade
          </Text>
          <MCInput
            value={form.capacity}
            onChangeText={(v) => updateField('capacity', v)}
            placeholder="500"
            keyboardType="numeric"
          />
        </YStack>
      </XStack>

      <YStack gap="$2">
        <Text fontSize={13} fontWeight="600" color="$textSecondary">
          Local
        </Text>
        <MCInput
          value={form.location}
          onChangeText={(v) => updateField('location', v)}
          placeholder="Parque Ibirapuera, Sao Paulo"
        />
      </YStack>

      <YStack gap="$2">
        <Text fontSize={13} fontWeight="600" color="$textSecondary">
          Classificacao Etaria
        </Text>
        <XStack gap="$2">
          {['Livre', '6+', '10+', '12+', '14+', '16+'].map((age) => (
            <XStack
              key={age}
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius={12}
              backgroundColor={form.ageRating === age ? '$primary' : '$surface'}
              borderWidth={1}
              borderColor={form.ageRating === age ? '$primary' : '$borderColor'}
              onPress={() => updateField('ageRating', age)}
              cursor="pointer"
            >
              <Text
                fontSize={13}
                fontWeight="600"
                color={form.ageRating === age ? 'white' : '$color'}
              >
                {age}
              </Text>
            </XStack>
          ))}
        </XStack>
      </YStack>

      <MCButton
        variant="primary"
        size="lg"
        fullWidth
        marginTop="$4"
        onPress={() => onSubmit(form)}
      >
        {submitLabel}
      </MCButton>
    </YStack>
  )
}
