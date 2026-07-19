"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function Page() {
  const { data, status } = useSession();

  const user = data?.user;
  const { items } = useCart();

  const router = useRouter();

  const [orderSuccess, setOrderSuccess] = useState(false);

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
    <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-light text-neutral-700 mb-8">
        تکمیل سفارش
      </h1>
      <CheckoutForm setOrderSuccess={setOrderSuccess} />
    </main>
  );
}
