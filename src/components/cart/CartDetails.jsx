"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { deliveryOptions } from "../checkout/CheckoutForm";

function CartDetails() {
  const {
    items,
    incrementItem,
    decrementItem,
    removeFromCart,
    deliveryMethod,
  } = useCart();

  const shipping = deliveryOptions.find(
    (option) => option.id === deliveryMethod,
  ).cost;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const shippingThreshold = 500000;
  const total = subtotal - discount + shipping;
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl md:text-3xl font-light text-neutral-700">
          سبد خرید
        </h1>
        {items.length > 0 && (
          <Link
            href="/products"
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors border-b border-transparent hover:border-[#e8c4a8] cursor-pointer"
          >
            ادامه خرید
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 space-y-4">
          <svg
            className="w-20 h-20 text-neutral-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <p className="text-xl font-light">سبد خرید شما خالی است</p>
          <Link
            href="/products"
            className="px-6 py-2.5 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm cursor-pointer"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-col sm:flex-row gap-4 bg-[#fdf6f0] rounded-2xl p-4 md:p-6 hover:shadow-md hover:shadow-[#e8d5c4]/10 transition-all duration-300"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-medium text-neutral-800 hover:text-neutral-600 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                    {item.selectedColor && (
                      <p className="text-xs text-neutral-400 mt-1">
                        رنگ: {item.selectedColor}
                        {item.selectedSize && ` | سایز: ${item.selectedSize}`}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => decrementItem(item.cartItemId)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-40"
                        disabled={item.quantity <= 1}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm text-neutral-700 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementItem(item.cartItemId)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-neutral-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#fdf6f0] rounded-2xl p-6 sticky top-24 space-y-5">
              <h2 className="text-lg font-light text-neutral-700 border-b border-[#f0e0d0] pb-3">
                خلاصه سفارش
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">جمع کل کالاها</span>
                  <span className="text-neutral-700">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-rose-500">
                    <span>تخفیف</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">هزینه ارسال</span>
                  <span
                    className={
                      shipping === 0 ? "text-emerald-600" : "text-neutral-700"
                    }
                  >
                    {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < shippingThreshold && shipping > 0 && (
                  <p className="text-xs text-neutral-400">
                    با خرید {formatPrice(shippingThreshold - subtotal)} بیشتر،
                    ارسال رایگان می‌شود
                  </p>
                )}
              </div>

              <div className="border-t border-[#f0e0d0] pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-neutral-700">
                    مبلغ قابل پرداخت
                  </span>
                  <span className="text-xl font-light text-neutral-800">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full block text-center py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors duration-300 text-sm uppercase tracking-widest font-medium cursor-pointer"
              >
                ادامه فرآیند خرید
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartDetails;
