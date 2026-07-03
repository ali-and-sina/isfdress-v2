"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/database";

export default function SliderHero({ autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  useEffect(() => {
    if (isHovered || products.length <= 1) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide, autoPlayInterval]);

  if (!products.length) return null;

  return (
    <section
      className="relative w-full h-screen min-h-150 overflow-hidden flex items-center bg-[#f6e9e3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
            quality={90}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(125deg, rgba(253,217,196,0.65) 0%, rgba(197,224,240,0.55) 100%)",
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="absolute inset-0 z-3 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, transparent 25%, rgba(255,240,235,0.55) 100%)",
        }}
      />

      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        <div className="absolute w-[450px] h-[450px] bg-[#fdd9c4] rounded-full blur-[60px] opacity-35 mix-blend-overlay -top-[120px] -left-[120px] animate-[float_22s_infinite_alternate_ease-in-out]" />
        <div
          className="absolute w-[350px] h-[350px] bg-[#e3d0ff] rounded-full blur-[60px] opacity-35 mix-blend-overlay -bottom-[100px] -right-[100px] animate-[float_25s_infinite_alternate_ease-in-out]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute w-[280px] h-[280px] bg-[#c9e4de] rounded-full blur-[60px] opacity-35 mix-blend-overlay top-[55%] left-[65%] animate-[float_20s_infinite_alternate_ease-in-out]"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      {products[currentIndex] && (
        <div
          key={products[currentIndex].id}
          className="relative z-10 max-w-[600px] mr-[7%] ml-[5%] text-[#2b2b2b] animate-fadeInUp"
          style={{ textShadow: "0 3px 12px rgba(255,255,255,0.7)" }}
        >
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[1.15] mb-4 text-[#1f1f1f] font-serif">
            {products[currentIndex].title}
          </h1>
          <p className="text-xl font-light opacity-85 max-w-105 mb-6 text-[#3a3a3a]">
            {products[currentIndex].description}
          </p>
          {products[currentIndex].price && (
            <p className="text-2xl font-semibold text-[#1f1f1f] mb-8">
              {products[currentIndex].price.toLocaleString()} تومان
            </p>
          )}
          <Link
            href={`/product/${products[currentIndex].slug}`}
            className="inline-block bg-white/25 backdrop-blur-md border border-white/50 px-11 py-3.5 rounded-full text-[#1e1e1e] font-medium text-base no-underline transition-all duration-300 shadow-[0_8px_22px_rgba(0,0,0,0.06)] hover:bg-white/45 hover:backdrop-blur-lg hover:border-white/75 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)]"
          >
            مشاهده محصول
          </Link>
        </div>
      )}

      <div className="absolute bottom-10 right-[7%] z-20 flex items-center gap-3">
        <span className="mr-2 text-sm font-light text-[#2e2e2e] bg-white/35 backdrop-blur-sm py-1 px-5 rounded-full tracking-wider">
          {currentIndex + 1} / {products.length}
        </span>
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`اسلاید ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full bg-white/45 backdrop-blur-xs border border-white/70 cursor-pointer transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.1)] ${
              index === currentIndex
                ? "w-7! rounded-[20px]! bg-white! border-white! shadow-[0_4px_14px_rgba(0,0,0,0.15)]!"
                : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}
