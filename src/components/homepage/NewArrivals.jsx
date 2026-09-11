import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function NewArrivals({ products }) {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-700">
          تازه‌ترین‌ها
        </h2>
        <Link
          href="/products?filter=new"
          className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors duration-300 border-b border-transparent hover:border-[#e8d5c4]"
        >
          همه محصولات جدید
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-[#fdf6f0]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-[#f0d5c1] text-neutral-700 text-xs px-3 py-1.5 rounded-full">
                جدید
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[#f8ece0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-sm md:text-base font-medium text-neutral-700 line-clamp-1">
                {product.name}
              </h3>
              <span className="text-sm font-semibold text-neutral-800">
                {formatPrice(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
