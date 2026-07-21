"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AsideCartInfo from "@/components/ui/AsideCartInfo";

const gateways = [
  { id: "mellat", name: "درگاه بانک ملت", icon: "🏦" },
  { id: "saman", name: "درگاه بانک سامان", icon: "💳" },
  { id: "zarinpal", name: "زرین‌پال", icon: "💰" },
  { id: "payir", name: "پی‌آی‌آر", icon: "🔗" },
];

const timeSlots = [
  { id: "morning", label: "صبح (۹ تا ۱۲)" },
  { id: "afternoon", label: "عصر (۱۵ تا ۱۸)" },
];

function getNextWeekDays() {
  const days = [];
  const today = new Date();
  for (let i = 2; i < 9; i++) {
    const next = new Date(today);
    next.setDate(today.getDate() + i);
    days.push({
      date: next,
      label: next.toLocaleDateString("fa-IR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    });
  }
  return days;
}

export default function Page() {
  const { items, clearCart, paymentMethod } = useCart();
  console.log(paymentMethod);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("zarinpal");
  const [isPaying, setIsPaying] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const weekDays = getNextWeekDays();

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.push("/cart");
    }
  }, [items, router, orderSuccess]);

  const handlePayment = () => {
    if (!selectedDate || !selectedTime) {
      alert("لطفاً تاریخ و بازهٔ زمانی تحویل را انتخاب کنید");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      clearCart();
      setOrderSuccess(true);
      setIsPaying(false);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
        <div className="text-center space-y-4">
          <span className="text-6xl">🎉</span>
          <h1 className="text-3xl font-light text-neutral-700">پرداخت موفق</h1>
          <p className="text-neutral-400">
            شماره پیگیری: {Math.floor(Math.random() * 100000)}
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors cursor-pointer"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-light text-neutral-700 mb-8">
        پرداخت و ثبت نهایی
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-medium text-neutral-700 mb-6">
              تاریخ تحویل
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {weekDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`p-3 rounded-xl border text-sm font-light transition-all cursor-pointer ${
                    selectedDate?.toDateString() === day.date.toDateString()
                      ? "border-[#e8c4a8] bg-white text-neutral-800 shadow-sm"
                      : "border-transparent bg-white/60 text-neutral-600 hover:bg-white hover:border-[#e8c4a8]/50"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-medium text-neutral-700 mb-6">
              بازهٔ زمانی تحویل
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedTime === slot.id
                      ? "border-[#e8c4a8] bg-white"
                      : "border-transparent bg-white/60 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeslot"
                    className="hidden"
                    checked={selectedTime === slot.id}
                    onChange={() => setSelectedTime(slot.id)}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedTime === slot.id
                        ? "border-[#e8c4a8]"
                        : "border-neutral-300"
                    }`}
                  >
                    {selectedTime === slot.id && (
                      <div className="w-3 h-3 bg-[#e8c4a8] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-neutral-700">{slot.label}</span>
                </label>
              ))}
            </div>
          </section>

          {paymentMethod === "online" ? (
            <section className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-medium text-neutral-700 mb-6">
                انتخاب درگاه پرداخت
              </h2>
              <div className="space-y-3">
                {gateways.map((gw) => (
                  <label
                    key={gw.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedGateway === gw.id
                        ? "border-[#e8c4a8] bg-white"
                        : "border-transparent bg-white/60 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gateway"
                      className="hidden"
                      checked={selectedGateway === gw.id}
                      onChange={() => setSelectedGateway(gw.id)}
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedGateway === gw.id
                          ? "border-[#e8c4a8]"
                          : "border-neutral-300"
                      }`}
                    >
                      {selectedGateway === gw.id && (
                        <div className="w-3 h-3 bg-[#e8c4a8] rounded-full" />
                      )}
                    </div>
                    <span className="text-2xl">{gw.icon}</span>
                    <span className="text-sm text-neutral-700 font-medium">
                      {gw.name}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ) : null}

          <button
            onClick={handlePayment}
            disabled={isPaying}
            className="w-full py-3.5 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer lg:hidden"
          >
            {isPaying ? "در حال انتقال به درگاه..." : "ثبت نهایی"}
          </button>
        </div>

        <aside className="lg:col-span-4">
          <AsideCartInfo handlePayment={handlePayment} isPaying={isPaying} />
        </aside>
      </div>
    </main>
  );
}
