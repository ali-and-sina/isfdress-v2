"use client";

import { productCategories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { subCategories } from "@/data/subcategories";
import AddToCartButton from "../ui/AddToCartButton";
import SimilarProducts from "./SimilarProducts";
import ProductReviews from "./ProductReviews";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const colorMap = {
  قرمز: "#dc2626",
  مشکی: "#171717",
  سفید: "#f5f5f5",
  صورتی: "#f9a8d4",
  آبی: "#60a5fa",
  "آبی روشن": "#93c5fd",
  طوسی: "#9ca3af",
  سرمه‌ای: "#1e3a5f",
  کرم: "#f5deb3",
  قهوه‌ای: "#8b4513",
  زرد: "#facc15",
  سبز: "#4ade80",
  بنفش: "#c084fc",
  نارنجی: "#fb923c",
  شرابی: "#7b1d3e",
  زرشکی: "#9b2c2c",
  یاقوتی: "#7f1d1d",
  نقره‌ای: "#c0c0c0",
  "چند رنگ": "#a78bfa",
  طلایی: "#f59e0b",
  "زرد مایل به سبز": "#a3e635",
};

export default function ProductDetails({ product }) {
  const { addToCart, items, incrementItem, decrementItem, removeFromCart } =
    useCart();
  const item = items ? items.find((item) => item.id === product.id) : null;

  console.log(item);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(item?.quantity || 0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [error, setError] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const category = productCategories.find(
    (category) => category.id === product.categoryId,
  );
  const subCategory = subCategories.find(
    (subCat) => subCat.id === product.subCategoryId,
  );
  const isAdded =
    cartQuantity > 0 &&
    selectedSize === items.find((item) => item.selectedSize) &&
    selectedColor === items.find((item) => item.selectedColor);

  console.log(isAdded);
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColor, selectedSize]);

  function handleAddToCart() {
    if (product.sizes.length > 0 && !selectedSize) {
      setError("لطفاً سایز مورد نظر را انتخاب کنید");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setError("لطفاً رنگ مورد نظر را انتخاب کنید");
      return;
    }
    setError(null);
    setCartQuantity(1);
    addToCart(product, 1, selectedSize, selectedColor);
  }

  const increment = () => {
    setCartQuantity((prev) => Math.min(prev + 1, 10));
    if (item) incrementItem(item.cartItemId);
  };
  const decrement = () => {
    if (item) {
      if (item.quantity === 1) {
        removeFromCart(item.cartItemId);
        setCartQuantity(0);
      } else {
        decrementItem(item.cartItemId);
        setCartQuantity((prev) => prev - 1);
      }
    }
  };
  const deleteFromCart = () => {
    setCartQuantity(0);
    if (item) removeFromCart(item.cartItemId);
  };

  const openGallery = (index) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };
  const closeGallery = () => setGalleryOpen(false);
  const nextImage = () =>
    setGalleryIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setGalleryIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeGallery();
    };
    if (galleryOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [galleryOpen]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500 text-xl font-light">
        محصول مورد نظر یافت نشد
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 font-light mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link
            href="/"
            className="hover:text-neutral-600 transition-colors cursor-pointer"
          >
            خانه
          </Link>
          <span className="text-neutral-300 shrink-0">/</span>
          <Link
            href={`/productCategory/${category.slug}`}
            className="hover:text-neutral-600 transition-colors cursor-pointer"
          >
            {category.name}
          </Link>
          <span className="text-neutral-300 shrink-0">/</span>
          <Link
            href={`/productCategory/${category.slug}/${subCategory.slug}`}
            className="hover:text-neutral-600 transition-colors cursor-pointer"
          >
            {subCategory.name}
          </Link>
          <span className="text-neutral-300 shrink-0">/</span>
          <span className="text-neutral-600 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div
              className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#fdf6f0] cursor-pointer"
              onClick={() => openGallery(selectedImage)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-[#f0d5c1] text-neutral-700 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm z-10">
                  جدید
                </span>
              )}
              {product.oldPrice && (
                <span className="absolute top-3 right-3 bg-rose-300/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm z-10">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  ٪ تخفیف
                </span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                  <span className="text-neutral-500 text-lg font-light tracking-widest">
                    ناموجود
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                <svg
                  className="w-5 h-5 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    index === selectedImage
                      ? "border-[#e8c4a8] shadow-md shadow-[#e8c4a8]/20"
                      : "border-transparent hover:border-[#e8c4a8]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-800 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-neutral-400 font-light mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-medium text-neutral-800">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-neutral-300 line-through font-light">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {!product.inStock && (
              <p className="text-sm text-rose-400 font-light bg-rose-50 px-4 py-2 rounded-xl inline-block">
                این محصول در حال حاضر موجود نیست
              </p>
            )}

            {product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-neutral-600">رنگ</h3>
                  {selectedColor && (
                    <span className="text-xs text-neutral-400">
                      {selectedColor}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(color === selectedColor ? null : color)
                      }
                      disabled={!product.inStock}
                      className={`relative w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-[#e8c4a8] scale-110"
                          : "ring-1 ring-neutral-200 hover:ring-[#e8c4a8] hover:scale-105"
                      }`}
                      style={{ backgroundColor: colorMap[color] || "#e5e7eb" }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <svg
                          className={`w-4 h-4 ${color === "سفید" || color === "زرد" || color === "کرم" ? "text-neutral-700" : "text-white"} drop-shadow`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-neutral-600">سایز</h3>
                  {selectedSize && (
                    <span className="text-xs text-neutral-400">
                      {selectedSize}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size === selectedSize ? null : size)
                      }
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#e8c4a8] border-[#e8c4a8] text-white shadow-md shadow-[#e8c4a8]/30"
                          : "bg-white border-neutral-200 text-neutral-600 hover:border-[#e8c4a8] hover:text-neutral-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-rose-400 font-light animate-fade-in">
                {error}
              </p>
            )}

            <AddToCartButton
              product={product}
              onAddToCart={handleAddToCart}
              cartQuantity={cartQuantity}
              setCartQuantity={setCartQuantity}
              omDeleteFromCart={deleteFromCart}
              decrement={decrement}
              increment={increment}
              isAdded={isAdded}
            />

            <div className="border-t border-[#f0e0d0] pt-6 space-y-4 mt-4">
              <details className="group" open>
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-neutral-700 hover:text-[#b08060] transition-colors list-none">
                  توضیحات محصول
                  <svg
                    className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-3 overflow-hidden transition-all duration-300">
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {product.tagline}. این محصول از بهترین متریال تهیه شده و با
                    دوخت عالی و طراحی منحصربه‌فرد، راحتی و زیبایی را همزمان به
                    شما هدیه می‌دهد. مناسب برای استفاده روزمره و مجالس خاص.
                  </p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-neutral-700 hover:text-[#b08060] transition-colors list-none">
                  روش‌های ارسال
                  <svg
                    className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-3 overflow-hidden transition-all duration-300">
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان. تحویل ۲ تا
                    ۴ روز کاری در شهرهای بزرگ و ۴ تا ۷ روز برای سایر مناطق.
                  </p>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-neutral-700 hover:text-[#b08060] transition-colors list-none">
                  ضمانت بازگشت
                  <svg
                    className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-3 overflow-hidden transition-all duration-300">
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    تا ۷ روز پس از دریافت محصول در صورت عدم رضایت یا مغایرت،
                    امکان بازگشت و تعویض بدون هیچ هزینه‌ای وجود دارد.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
        <SimilarProducts
          categoryId={product.categoryId}
          currentId={product.id}
        />
        <ProductReviews />
      </main>

      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm font-light">
              {galleryIndex + 1} / {product.images.length}
            </span>
            <button
              onClick={closeGallery}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* تصویر اصلی لایت‌باکس */}
          <div className="flex-1 flex items-center justify-center px-4 relative">
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <svg
                className="w-6 h-6 text-white"
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
            <div className="relative w-full max-w-4xl aspect-3/4 md:aspect-4/3">
              <Image
                src={product.images[galleryIndex]}
                alt={`${product.name} ${galleryIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <svg
                className="w-6 h-6 text-white"
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
          </div>

          <div className="flex justify-center gap-2 p-4 overflow-x-auto scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setGalleryIndex(index)}
                className={`relative w-16 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  index === galleryIndex
                    ? "border-white"
                    : "border-white/30 hover:border-white/70 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
