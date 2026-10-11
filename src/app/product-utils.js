
export const API_BASE =
  'https://openapi.programming-hero.com/api/bazardor';

export function fmt(value) {
  if (value === null || value === undefined || value === '') {
    return 'তথ্য নেই';
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return `${number.toLocaleString('bn-BD')} টাকা`;
}

export function normalizeProduct(product) {
  if (!product || typeof product !== 'object') {
    return null;
  }

  return {
    ...product,
    id: product.id,
    name:
      product.nameBn ||
      product.name ||
      product.title ||
      'নাম পাওয়া যায়নি',
    category:
      product.categoryNameBn ||
      product.categoryName ||
      product.category ||
      'অন্যান্য',
    unit: product.unit || 'পিস',
    markets: Array.isArray(product.markets)
      ? product.markets
      : [],
  };
}
