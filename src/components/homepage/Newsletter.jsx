export default function Newsletter() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="bg-[#fdf6f0] rounded-3xl p-8 md:p-12 text-center">
        <span className="inline-block text-4xl md:text-5xl mb-4">💌</span>
        <h2 className="text-2xl md:text-3xl font-light text-neutral-700 mb-2">
          عضو خانواده ما شوید
        </h2>
        <p className="text-sm md:text-base text-neutral-400 font-light mb-8 max-w-md mx-auto">
          برای دریافت جدیدترین محصولات و پیشنهادهای ویژه ایمیل خود را ثبت کنید
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="ایمیل شما"
            className="flex-1 px-5 py-3 bg-white rounded-xl text-sm text-neutral-700 placeholder-neutral-300 border border-transparent focus:border-[#e8c4a8] focus:outline-none transition-colors duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#dbb494] transition-colors duration-300 text-sm uppercase tracking-widest"
          >
            عضویت
          </button>
        </form>
        <p className="text-xs text-neutral-400 mt-4 font-light">
          با عضویت، ۱۰٪ تخفیف اولین خرید دریافت کنید
        </p>
      </div>
    </section>
  );
}
