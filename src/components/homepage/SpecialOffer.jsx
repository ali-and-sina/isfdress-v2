import Link from "next/link";

export default function SpecialOffer() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#f8d5c1] via-[#f0cfb5] to-[#e8c4a8] p-8 md:p-16">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-right">
            <span className="inline-block text-xs md:text-sm text-[#a07050] bg-white/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
              فقط تا پایان هفته
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              حراج تابستانه
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-extralight">
              تا ۴۰٪ تخفیف برای محصولات منتخب
            </p>
            <Link
              href="/products?filter=sale"
              className="inline-block mt-4 px-8 py-3 bg-white text-[#b08060] rounded-full hover:bg-[#fdf6f0] transition-all duration-500 text-sm uppercase tracking-widest shadow-lg shadow-white/20"
            >
              همین حالا خرید کن
            </Link>
          </div>
          <div className="text-8xl md:text-9xl select-none">🌺</div>
        </div>
      </div>
    </section>
  );
}
