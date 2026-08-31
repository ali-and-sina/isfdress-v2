import Image from "next/image";

function Gallery({
  product,
  closeGallery,
  prevImage,
  galleryIndex,
  nextImage,
}) {
  return (
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
            unoptimized
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
              unoptimized
              className="object-cover"
              sizes="64px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
