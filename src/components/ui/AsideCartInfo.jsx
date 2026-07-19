import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import { deliveryOptions } from "../checkout/CheckoutForm";

function AsideCartInfo({ handlePayment, isPaying }) {
  const { totalPrice, deliveryMethod, items } = useCart();
  const deliveryCost = deliveryOptions.find(
    (option) => option.id === deliveryMethod,
  ).cost;
  const finalAmount = totalPrice + deliveryCost;

  console.log(deliveryMethod);
  const discountAmount = 0;

  return (
    <div className="bg-[#fdf6f0] rounded-2xl p-6 sticky top-24 space-y-6">
      <h2 className="text-lg font-medium text-neutral-700">خلاصهٔ سفارش</h2>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-700 truncate">{item.name}</p>
              <p className="text-xs text-neutral-400">
                {item.selectedColor && `رنگ: ${item.selectedColor}`}
                {item.selectedSize && ` | سایز: ${item.selectedSize}`}
              </p>
            </div>
            <span className="text-xs text-neutral-600">
              {item.quantity} × {formatPrice(item.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-[#f0e0d0] pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">جمع کالاها</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">هزینه ارسال</span>
          <span>
            {deliveryCost === 0 ? "رایگان" : formatPrice(deliveryCost)}
          </span>
        </div>
        <div className="flex justify-between font-medium text-neutral-800 border-t border-[#f0e0d0] pt-2 mt-2">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-lg">{formatPrice(finalAmount)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isPaying}
        className="hidden lg:block w-full py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPaying && paymentMethod === "online"
          ? "در حال انتقال به درگاه..."
          : isPaying && paymentMethod === "cod"
            ? "درحال ثبت سفارش..."
            : "ثبت نهایی"}
      </button>
    </div>
  );
}

export default AsideCartInfo;
