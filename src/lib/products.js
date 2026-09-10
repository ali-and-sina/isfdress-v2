export function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function formatNumber(num) {
  return new Intl.NumberFormat("fa-IR").format(num);
}
