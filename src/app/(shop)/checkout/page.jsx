import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-light text-neutral-700 mb-8">
        تکمیل سفارش
      </h1>
      <CheckoutForm />
    </main>
  );
}
