export default function TrustBadges() {
  const badges = [
    { icon: "🚚", title: "ارسال سریع", desc: "تحویل ۲ تا ۴ روز کاری" },
    { icon: "🔄", title: "ضمانت بازگشت", desc: "تا ۷ روز مهلت بازگشت" },
    { icon: "🔒", title: "پرداخت امن", desc: "درگاه پرداخت رمزگذاری شده" },
    { icon: "💬", title: "پشتیبانی", desc: "پاسخگویی ۲۴ ساعته" },
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-[#fdf6f0] rounded-2xl hover:bg-[#faf0e8] transition-colors duration-300"
          >
            <span className="text-2xl md:text-3xl mb-3">{badge.icon}</span>
            <h4 className="text-sm font-medium text-neutral-700 mb-1">
              {badge.title}
            </h4>
            <p className="text-xs text-neutral-400 font-light">{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
