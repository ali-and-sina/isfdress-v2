export function getPageTitle({ onSale, isNew, q }) {
  if (q?.trim()) {
    return `نمایش جستجو برای "${q}"`;
  }

  if (onSale && isNew) {
    return "محصولات تازه و تخفیف‌دار";
  }

  if (onSale) {
    return "محصولات تخفیف‌دار";
  }

  if (isNew) {
    return "محصولات تازه";
  }

  return "همه محصولات";
}
