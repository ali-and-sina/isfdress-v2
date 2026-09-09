import { ShoppingBag } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white text-center">
      <ShoppingBag size={40} className="mb-4 text-neutral-400" />

      <h2 className="font-semibold text-neutral-800">سفارشی پیدا نشد</h2>

      <p className="mt-2 text-sm text-neutral-500">
        هنوز سفارشی در این بخش ثبت نشده است.
      </p>
    </div>
  );
}
