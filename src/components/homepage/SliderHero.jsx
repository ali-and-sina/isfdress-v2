"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { products } from "@/data/products";
import Link from "next/link";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

const featuredProducts = products.filter((p) => p.isNew);

export default function HeroSlider() {
  return (
    <header className="relative w-full h-[80vh] overflow-hidden bg-neutral-100">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        speed={800}
        className="h-full w-full"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-full group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 md:left-20 md:right-auto md:max-w-lg text-white space-y-4">
                <span className="inline-block px-3 py-1 border border-white/30 text-xs uppercase tracking-[0.2em] backdrop-blur-sm">
                  محصول ویژه
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide">
                  {product.name}
                </h2>
                <p className="text-lg md:text-xl font-extralight opacity-90 max-w-md">
                  {product.tagline}
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-medium tracking-wider">
                    {formatPrice(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-lg text-white/50 line-through tracking-wider">
                      {formatPrice(product.oldPrice)}
                    </p>
                  )}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-6 px-8 py-3 border border-white/50 hover:bg-white hover:text-neutral-900 transition-all duration-500 text-sm uppercase tracking-[0.15em] backdrop-blur-sm"
                >
                  مشاهده و خرید
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
}
