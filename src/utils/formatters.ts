export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

export function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(date)
}

export function formatDateTime(isoStr: string): string {
  const date = new Date(isoStr)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function formatCompactNumber(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}
