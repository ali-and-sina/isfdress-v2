"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SignInOptions from "@/components/ui/SignInOptions";
import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  console.log(callbackUrl);

  useEffect(() => {
    if (user && callbackUrl) {
      router.replace(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (showModal) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  return (
    <main className="relative min-h-[calc(100vh-112px)] flex items-center justify-center ">
      <div className="absolute inset-0 -z-10 bg-[url('/images/logo.png')] bg-fixed bg-top opacity-10" />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 text-center space-y-6">
          <LogIn className=" mb-4 mx-auto text-center " />
          <h1 className="text-2xl font-light text-neutral-700">خوش آمدید</h1>
          <p className="text-sm text-neutral-400 font-light">
            برای ادامه، وارد حساب کاربری خود شوید
          </p>

          <button
            onClick={openModal}
            className="w-full py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm font-medium cursor-pointer"
          >
            ورود به حساب کاربری
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#fdf6f0] hover:bg-[#f0e0d0] text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <h2 className="text-xl font-light text-center text-neutral-700 mb-6">
              ورود
            </h2>

            <SignInOptions callbackUrl={callbackUrl} />
          </div>
        </div>
      )}
    </main>
  );
}
