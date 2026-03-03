import { useState, useCallback } from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'
import { YStack, XStack, Text, Separator } from 'tamagui'
import { Check, Minus, Plus, Ticket, X } from '@tamagui/lucide-icons'
import { ActivityIndicator } from 'react-native'
import { MCButton } from '../ui/MCButton'
import { formatCurrency } from '../../utils/formatters'

type Step = 'select' | 'processing' | 'success'

interface MCPaymentSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  showTitle: string
  date: string
  time: string
  price: number
}

export function MCPaymentSheet({ open, onOpenChange, showTitle, date, time, price }: MCPaymentSheetProps) {
  const [step, setStep] = useState<Step>('select')
  const [quantity, setQuantity] = useState(1)
  const [ticketType, setTicketType] = useState<'inteira' | 'meia'>('inteira')

  const unitPrice = ticketType === 'meia' ? price * 0.5 : price
  const total = unitPrice * quantity
  const fee = total * 0.1
  const grandTotal = total + fee

  const handlePay = useCallback(() => {
    setStep('processing')
    setTimeout(() => setStep('success'), 2000)
  }, [])

  const handleClose = useCallback(() => {
    onOpenChange(false)
    setTimeout(() => {
      setStep('select')
      setQuantity(1)
      setTicketType('inteira')
    }, 300)
  }, [onOpenChange])

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={step === 'processing' ? undefined : handleClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <YStack backgroundColor="$white" borderTopLeftRadius={24} borderTopRightRadius={24} padding="$5">
            {/* Handle + close */}
            <XStack alignItems="center" justifyContent="center" marginBottom="$3" position="relative">
              <YStack width={40} height={4} borderRadius={2} backgroundColor="$gray300" />
              {step !== 'processing' && (
                <YStack position="absolute" right={0} onPress={handleClose} pressStyle={{ opacity: 0.7 }}>
                  <X size={20} color="$gray500" />
                </YStack>
              )}
            </XStack>

            {step === 'select' && (
              <YStack gap="$4">
                <YStack alignItems="center" gap="$1">
                  <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="$darkNavy">
                    Comprar Ingressos
                  </Text>
                  <Text fontSize={14} color="$gray600">{showTitle}</Text>
                  <Text fontSize={13} color="$gray500">{date} - {time}</Text>
                </YStack>

                <Separator borderColor="$gray200" />

                <YStack gap="$2">
                  <Text fontSize={14} fontWeight="600" color="$gray700">Tipo de ingresso</Text>
                  <XStack gap="$3">
                    {(['inteira', 'meia'] as const).map((type) => (
                      <YStack
                        key={type}
                        flex={1}
                        padding="$3"
                        borderRadius={12}
                        borderWidth={2}
                        borderColor={ticketType === type ? '$circusRed' : '$gray200'}
                        backgroundColor={ticketType === type ? 'rgba(230,57,70,0.05)' : '$white'}
                        alignItems="center"
                        onPress={() => setTicketType(type)}
                        pressStyle={{ opacity: 0.7 }}
                      >
                        <Text fontSize={15} fontWeight="700" color={ticketType === type ? '$circusRed' : '$darkNavy'}>
                          {type === 'inteira' ? 'Inteira' : 'Meia-entrada'}
                        </Text>
                        <Text fontSize={13} color="$gray500" marginTop={2}>
                          {formatCurrency(type === 'meia' ? price * 0.5 : price)}
                        </Text>
                      </YStack>
                    ))}
                  </XStack>
                </YStack>

                <YStack gap="$2">
                  <Text fontSize={14} fontWeight="600" color="$gray700">Quantidade</Text>
                  <XStack alignItems="center" justifyContent="center" gap="$4">
                    <YStack
                      width={40} height={40} borderRadius={20} backgroundColor="$gray100"
                      alignItems="center" justifyContent="center"
                      onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                      pressStyle={{ opacity: 0.7 }}
                      opacity={quantity <= 1 ? 0.4 : 1}
                    >
                      <Minus size={20} color="$darkNavy" />
                    </YStack>
                    <Text fontSize={24} fontWeight="800" color="$darkNavy" width={40} textAlign="center">
                      {quantity}
                    </Text>
                    <YStack
                      width={40} height={40} borderRadius={20} backgroundColor="$gray100"
                      alignItems="center" justifyContent="center"
                      onPress={() => setQuantity((q) => Math.min(10, q + 1))}
                      pressStyle={{ opacity: 0.7 }}
                      opacity={quantity >= 10 ? 0.4 : 1}
                    >
                      <Plus size={20} color="$darkNavy" />
                    </YStack>
                  </XStack>
                </YStack>

                <Separator borderColor="$gray200" />

                <YStack gap="$2">
                  <XStack justifyContent="space-between">
                    <Text fontSize={14} color="$gray600">{quantity}x {ticketType === 'meia' ? 'Meia' : 'Inteira'}</Text>
                    <Text fontSize={14} color="$gray600">{formatCurrency(total)}</Text>
                  </XStack>
                  <XStack justifyContent="space-between">
                    <Text fontSize={14} color="$gray600">Taxa de servico</Text>
                    <Text fontSize={14} color="$gray600">{formatCurrency(fee)}</Text>
                  </XStack>
                  <XStack justifyContent="space-between" marginTop="$1">
                    <Text fontSize={17} fontWeight="800" color="$darkNavy">Total</Text>
                    <Text fontSize={17} fontWeight="800" color="$circusRed">{formatCurrency(grandTotal)}</Text>
                  </XStack>
                </YStack>

                <MCButton variant="primary" size="lg" fullWidth onPress={handlePay}>
                  PAGAR {formatCurrency(grandTotal)}
                </MCButton>
              </YStack>
            )}

            {step === 'processing' && (
              <YStack alignItems="center" justifyContent="center" paddingVertical="$8" gap="$4">
                <ActivityIndicator size="large" color="#E63946" />
                <Text fontSize={16} fontWeight="600" color="$darkNavy">Processando pagamento...</Text>
                <Text fontSize={13} color="$gray500">Nao feche esta tela</Text>
              </YStack>
            )}

            {step === 'success' && (
              <YStack alignItems="center" justifyContent="center" paddingVertical="$6" gap="$4">
                <YStack
                  width={64} height={64} borderRadius={32}
                  backgroundColor="$success" alignItems="center" justifyContent="center"
                >
                  <Check size={32} color="white" />
                </YStack>
                <Text fontFamily="$heading" fontSize={22} fontWeight="800" color="$darkNavy">
                  Compra confirmada!
                </Text>
                <Text fontSize={14} color="$gray600" textAlign="center">
                  {quantity}x {ticketType === 'meia' ? 'Meia-entrada' : 'Inteira'} - {showTitle}
                </Text>
                <XStack alignItems="center" gap="$2" marginTop="$1">
                  <Ticket size={16} color="$circusRed" />
                  <Text fontSize={13} color="$gray500">Ingresso disponivel em "Meus Ingressos"</Text>
                </XStack>
                <MCButton variant="primary" size="lg" fullWidth onPress={handleClose} marginTop="$2">
                  FECHAR
                </MCButton>
              </YStack>
            )}
          </YStack>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '90%',
  },
})
