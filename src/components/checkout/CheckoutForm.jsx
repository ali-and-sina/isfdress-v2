"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { formatPrice } from "@/lib/products";
import SubmitButton from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AsideCartInfo from "../ui/AsideCartInfo";

export const deliveryOptions = [
  { id: "regular", name: "پست معمولی", desc: "۲ تا ۴ روز کاری", cost: 100000 },
  { id: "express", name: "پست اکسپرس", desc: "۱ تا ۲ روز کاری", cost: 200000 },
];

const FORM_ID = "checkout-form";

function CheckoutForm() {
  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { data, status } = useSession();

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

  const deliveryCost =
    deliveryOptions.find((del) => del.id === deliveryMethod)?.cost || 0;

  const discountRate = discountAmount > 0 ? 0.1 : 0;
  const liveDiscountAmount = Math.round(totalPrice * discountRate);
  const orderTotal = totalPrice + deliveryCost - liveDiscountAmount;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const resetRef = useRef(false);
  useEffect(() => {
    if (user && !resetRef.current) {
      resetRef.current = true;
      reset({
        fullName: user.fullName || user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        addressLine: user.addressLine || user.address || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user, reset]);

  function applyDiscount() {
    setDiscountError("");
    const code = discountCode.trim();
    if (code === "") {
      setDiscountError("کد تخفیف را وارد کنید");
      return;
    }
    if (code === "SUMMER10") {
      setDiscountAmount(Math.round(totalPrice * 0.1));
      setDiscountError("");
    } else {
      setDiscountError("کد تخفیف معتبر نیست");
      setDiscountAmount(0);
    }
  }

  function onSubmit(formData) {
    console.log(formData);
    setIsPlacingOrder(true);
    setTimeout(() => {
      setOrderSuccess(true);
      setIsPlacingOrder(false);
      router.push("/checkout/payment");
    }, 1500);
  }

  useEffect(() => {
    if (!user && status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    }
  }, [status, router, user]);

  useEffect(() => {
    if (status !== "loading" && items.length === 0 && !orderSuccess) {
      router.push("/cart");
    }
  }, [items, status, router, orderSuccess]);

  if (!user) return null;

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
        <div className="text-center space-y-4">
          <span className="text-6xl">🎉</span>
          <h1 className="text-3xl font-light text-neutral-700">
            سفارش شما با موفقیت ثبت شد
          </h1>
          <p className="text-neutral-400">
            با تشکر از خرید شما، شماره سفارش:{" "}
            {Math.floor(Math.random() * 100000)}
          </p>

          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:col-span-8 space-y-8"
        id={FORM_ID}
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
                aria-invalid={errors.fullName ? "true" : "false"}
                className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border outline-none transition-colors ${
                  errors.fullName
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-transparent focus:border-[#e8c4a8]"
                }`}
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
                aria-invalid={errors.phone ? "true" : "false"}
                className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border outline-none transition-colors ${
                  errors.phone
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-transparent focus:border-[#e8c4a8]"
                }`}
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
                aria-invalid={errors.city ? "true" : "false"}
                className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border outline-none transition-colors ${
                  errors.city
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-transparent focus:border-[#e8c4a8]"
                }`}
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
                inputMode="numeric"
                placeholder="کد پستی (اختیاری)"
                {...register("postalCode", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "کد پستی باید ۱۰ رقم باشد",
                  },
                })}
                aria-invalid={errors.postalCode ? "true" : "false"}
                className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border outline-none transition-colors ${
                  errors.postalCode
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-transparent focus:border-[#e8c4a8]"
                }`}
              />
              {errors.postalCode && (
                <p className="text-xs text-rose-400 mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="آدرس کامل"
              rows="2"
              {...register("addressLine", {
                required: "آدرس کامل الزامی است",
              })}
              aria-invalid={errors.addressLine ? "true" : "false"}
              className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border outline-none transition-colors resize-none ${
                errors.addressLine
                  ? "border-rose-300 focus:border-rose-400"
                  : "border-transparent focus:border-[#e8c4a8]"
              }`}
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
              کد تخفیف با موفقیت اعمال شد ({formatPrice(liveDiscountAmount)}{" "}
              تخفیف)
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
            discountAmount={liveDiscountAmount}
            deliveryCost={deliveryCost}
          />
        </div>
      </form>

      <aside className="lg:col-span-4">
        <AsideCartInfo>
          <div className="hidden lg:block">
            <SubmitButton
              form={FORM_ID}
              isPlacingOrder={isPlacingOrder}
              orderTotal={orderTotal}
              discountAmount={liveDiscountAmount}
              deliveryCost={deliveryCost}
            />
          </div>
        </AsideCartInfo>
      </aside>
    </div>
  );
}

export default CheckoutForm;
