"use client";

export default function AddToCartButton({
  product,
  onAddToCart,
  cartQuantity,
  setCartQuantity,
  onDeleteFromCart,
  increment,
  decrement,
  isAdded,
}) {
  return (
    <div className="pt-4">
      {!isAdded ? (
        <button
          onClick={onAddToCart}
          disabled={!product.inStock}
          className="w-full px-6 py-3.5 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] active:scale-[0.98] transition-all duration-300 text-sm uppercase tracking-widest font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {product.inStock ? "افزودن به سبد خرید" : "ناموجود"}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
            <button
              onClick={decrement}
              className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-[#fdf6f0] transition-colors cursor-pointer"
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
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-neutral-700 bg-white">
              {cartQuantity}
            </span>
            <button
              onClick={increment}
              className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-[#fdf6f0] transition-colors cursor-pointer"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={onDeleteFromCart}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-rose-400 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="حذف از سبد خرید"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
