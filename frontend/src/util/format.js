import { format } from 'date-fns';

export const { format: formatDecimalBr } = new Intl.NumberFormat('pt-BR');

export function formatDecimalEn(number) {
  const [integer, decimal] = number.split(',');
  return Number(`${integer}.${decimal}`);
}

export const { format: formatPriceBr } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const { format: formatPriceEn } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatDateToString(date) {
  return format(new Date(date), 'yyyy-MM-dd');
}
