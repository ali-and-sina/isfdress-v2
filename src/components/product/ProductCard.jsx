import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const hasDiscount = product.price < product.original_price;
  const percentageOfDiscount = Math.round(
    ((product.original_price - product.price) / product.original_price) * 100
  );
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {product.is_on_special_list && (
          <span className="absolute right-2 top-2 rounded-full bg-rose-600 px-2 py-1 text-xs text-white">
            جدید
          </span>
        )}

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-gray-900 px-2 py-1 text-xs text-white">
            `{percentageOfDiscount}% تخفیف`
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="text-sm font-medium text-gray-700">ناموجود</span>
          </div>
        )}
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm text-gray-800">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-rose-700">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.original_price.toLocaleString("fa-IR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
