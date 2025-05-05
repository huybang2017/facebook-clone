const CURRENCY_FORMATTER = new Intl.NumberFormat("vi-VN", {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
