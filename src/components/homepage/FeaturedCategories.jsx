import { categoriesWithSubCategories } from "@/data/categories";
import Link from "next/link";

export default function FeaturedCategories() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-700 mb-10">
        دسته‌بندی‌های محبوب
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categoriesWithSubCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/productCategory/${cat.slug}`}
            className="group flex flex-col items-center justify-center p-8 md:p-10 bg-[#fdf6f0] hover:bg-[#f8ece0] rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-[#e8d5c4]/20"
          >
            <img src={cat.image} alt={cat.name} />
            <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-500"></span>
            <span className="text-sm md:text-base text-neutral-600 font-light tracking-wide">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
