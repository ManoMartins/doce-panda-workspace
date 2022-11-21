export function formatCurrency(value: number): string {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatLocationCurrency(value: string): string {
  return parseFloat(value)
    .toLocaleString('pt-BR', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
    .replace('.', '')
}
