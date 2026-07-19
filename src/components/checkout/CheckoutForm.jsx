"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { formatPrice } from "@/lib/products";
import SubmitButton from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";

export const deliveryOptions = [
  { id: "regular", name: "پست معمولی", desc: "۲ تا ۴ روز کاری", cost: 100000 },
  { id: "express", name: "پست اکسپرس", desc: "۱ تا ۲ روز کاری", cost: 200000 },
];

function CheckoutForm({ setOrderSuccess }) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { data } = useSession();

  const user = data?.user;
  const router = useRouter();
  const {
    items,
    totalPrice,
    paymentMethod,
    setPaymentMethod,
    deliveryMethod,
    setDeliveryMethod,
  } = useCart();
  discountAmount;

  const deliveryCost =
    deliveryOptions.find((d) => d.id === deliveryMethod)?.cost || 0;
  const orderTotal = totalPrice + deliveryCost - discountAmount;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        addressLine: user.addressLine || user.address || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user, reset]);

  const applyDiscount = () => {
    setDiscountError("");
    if (discountCode.trim() === "") {
      setDiscountError("کد تخفیف را وارد کنید");
      return;
    }
    if (discountCode === "SUMMER10") {
      setDiscountAmount(Math.round(totalPrice * 0.1));
      setDiscountError("");
    } else {
      setDiscountError("کد تخفیف معتبر نیست");
      setDiscountAmount(0);
    }
  };

  function onSubmit(data) {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setOrderSuccess(true);
      setIsPlacingOrder(false);
      router.push("/checkout/payment");
    }, 1500);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:col-span-8 space-y-8"
        id="checkout-form"
      >
        <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-medium text-neutral-700 mb-6">
            آدرس ارسال
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                {...register("fullName", {
                  required: "نام و نام خانوادگی الزامی است",
                })}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="tel"
                placeholder="شماره تماس"
                {...register("phone", {
                  required: "شماره تماس الزامی است",
                  pattern: {
                    value: /^(\+98|0)?9\d{9}$/,
                    message: "شماره موبایل معتبر نیست",
                  },
                })}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors"
              />
              {errors.phone && (
                <p className="text-xs text-rose-400 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="شهر"
                {...register("city", { required: "شهر الزامی است" })}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors"
              />
              {errors.city && (
                <p className="text-xs text-rose-400 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="کد پستی (اختیاری)"
                {...register("postalCode")}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors"
              />
            </div>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="آدرس کامل"
              rows="2"
              {...register("addressLine", {
                required: "آدرس کامل الزامی است",
              })}
              className="w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors resize-none"
            />
            {errors.addressLine && (
              <p className="text-xs text-rose-400 mt-1">
                {errors.addressLine.message}
              </p>
            )}
          </div>
        </section>

        <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-medium text-neutral-700 mb-6">
            روش ارسال
          </h2>
          <div className="space-y-3">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === option.id
                    ? "border-[#e8c4a8] bg-white"
                    : "border-transparent bg-white/50 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={deliveryMethod === option.id}
                    onChange={() => setDeliveryMethod(option.id)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      deliveryMethod === option.id
                        ? "border-[#e8c4a8]"
                        : "border-neutral-300"
                    }`}
                  >
                    {deliveryMethod === option.id && (
                      <div className="w-3 h-3 bg-[#e8c4a8] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-neutral-700">
                    {option.name}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({option.desc})
                  </span>
                </div>
                <span className="text-sm text-neutral-600">
                  {option.cost === 0 ? "رایگان" : formatPrice(option.cost)}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-medium text-neutral-700 mb-4">
            کد تخفیف
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="کد تخفیف خود را وارد کنید"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] outline-none transition-colors"
            />
            <button
              type="button"
              onClick={applyDiscount}
              className="px-6 py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm font-medium"
            >
              اعمال
            </button>
          </div>
          {discountError && (
            <p className="mt-2 text-xs text-rose-400">{discountError}</p>
          )}
          {discountAmount > 0 && (
            <p className="mt-2 text-xs text-emerald-600">
              کد تخفیف با موفقیت اعمال شد ({formatPrice(discountAmount)} تخفیف)
            </p>
          )}
        </section>

        <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-medium text-neutral-700 mb-6">
            روش پرداخت
          </h2>
          <div className="space-y-3">
            {[
              { id: "online", name: "پرداخت آنلاین (کارت‌های بانکی)" },
              { id: "cod", name: "پرداخت در محل (فقط اصفهان)" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? "border-[#e8c4a8] bg-white"
                    : "border-transparent bg-white/50 hover:bg-white"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id
                      ? "border-[#e8c4a8]"
                      : "border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={method.id === paymentMethod}
                    onChange={() => setPaymentMethod(method.id)}
                    className="hidden"
                  />
                  {paymentMethod === method.id && (
                    <div className="w-3 h-3 bg-[#e8c4a8] rounded-full" />
                  )}
                </div>
                <span> {method.name}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="lg:hidden">
          <SubmitButton
            isPlacingOrder={isPlacingOrder}
            orderTotal={orderTotal}
            discountAmount={discountAmount}
            deliveryCost={deliveryCost}
          />
        </div>
      </form>

      <aside className="lg:col-span-4">
        <div className="bg-[#fdf6f0] rounded-2xl p-6 sticky top-24 space-y-6">
          <h2 className="text-lg font-medium text-neutral-700">خلاصه سفارش</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-700 truncate">
                    {item.name}
                  </p>
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
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>تخفیف</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-neutral-800 border-t border-[#f0e0d0] pt-2 mt-2">
              <span>مبلغ قابل پرداخت</span>
              <span className="text-lg">{formatPrice(orderTotal)}</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <SubmitButton
              isPlacingOrder={isPlacingOrder}
              orderTotal={orderTotal}
              discountAmount={discountAmount}
              deliveryCost={deliveryCost}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutForm;
