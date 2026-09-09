import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

export default function SimilarProducts({ categoryId, currentId }) {
  const scrollRef = useRef(null);

  const similarProducts = products
    .filter(
      (product) =>
        product.categoryId === categoryId && product.id !== currentId,
    )
    .slice(0, 8);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  if (similarProducts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-[#f0e0d0] pt-12  ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-neutral-700">
          محصولات مشابه
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-[#fdf6f0] hover:bg-[#f0d5c1] text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-all duration-300 cursor-pointer"
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
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-[#fdf6f0] hover:bg-[#f0d5c1] text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-all duration-300 cursor-pointer"
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
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
      >
        {similarProducts.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="group shrink-0 w-30 snap-start cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2.2rem] bg-[#fdf6f0]">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100px"
              />

              {item.oldPrice && (
                <span className="absolute top-2 right-2 bg-rose-300/90 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                  تخفیف
                </span>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#f8ece0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl" />
            </div>
            <div className="mt-3 space-y-1">
              <h3 className="text-xs font-medium text-neutral-700 line-clamp-1">
                {item.name}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-neutral-800">
                  {formatPrice(item.price)}
                </span>
                {item.oldPrice && (
                  <span className="text-[10px] text-neutral-300 line-through">
                    {formatPrice(item.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
