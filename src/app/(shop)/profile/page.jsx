"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import OrdersSection from "@/components/profile/OrderSection";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      router.replace("/login?callbackUrl=/profile");
    }
  }, [status, router, session]);

  if (status === "loading") {
    return null;
  }

  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <ProfileSidebar
          user={session?.user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />

        <section className="min-w-0 flex-1">
          {activeTab === "orders" && <OrdersSection />}

          {activeTab === "profile" && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <div className="mb-8 border-b border-neutral-100 pb-6">
                <h1 className="text-xl font-bold text-neutral-900">
                  اطلاعات حساب
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  اطلاعات حساب کاربری خود را مشاهده و مدیریت کنید.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      نام و نام خانوادگی
                    </label>

                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      defaultValue={session?.user?.name ?? ""}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nationalId"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      کد ملی
                    </label>

                    <input
                      id="nationalId"
                      name="nationalId"
                      type="text"
                      inputMode="numeric"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      شماره موبایل
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      defaultValue={session?.user?.phone ?? ""}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="birthday"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      تاریخ تولد
                    </label>

                    <input
                      id="birthday"
                      name="birthday"
                      type="date"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      آدرس ایمیل
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={session?.user?.email ?? ""}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-neutral-100 pt-6">
                  <button
                    type="submit"
                    className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600 cursor-pointer"
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
