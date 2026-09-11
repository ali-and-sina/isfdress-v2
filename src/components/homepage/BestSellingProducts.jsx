"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";

export default function BestSellingProducts({ products }) {
  const bestSellers = products.slice(0, 8);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-700">
          پرفروش‌های هفته
        </h2>
        <div className="flex items-center gap-4">
          <Link
            href="/products?filter=best-sellers"
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors duration-300 border-b border-transparent hover:border-[#e8d5c4]"
          >
            مشاهده همه
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full bg-[#fdf6f0] hover:bg-[#f0d5c1] text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-all duration-300"
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
              className="w-9 h-9 rounded-full bg-[#fdf6f0] hover:bg-[#f0d5c1] text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-all duration-300"
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
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {bestSellers.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group shrink-0 w-65 md:w-75 snap-start"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#fdf6f0]">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm text-neutral-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-[#e8c4a8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">#{index + 1}</span>
                </div>
                {product.oldPrice && (
                  <div className="absolute top-3 right-3 bg-rose-300 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                    تخفیف
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#f8ece0]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>

              <div className="mt-4 space-y-1.5">
                <h3 className="text-sm font-medium text-neutral-700 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light line-clamp-1">
                  {product.tagline}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-800">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-neutral-300 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
