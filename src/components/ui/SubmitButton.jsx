export default function SubmitButton({ isPlacingOrder, form }) {
  return (
    <button
      type="submit"
      form={form}
      disabled={isPlacingOrder}
      className="cursor-pointer w-full py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors text-sm uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isPlacingOrder ? "در حال ثبت..." : "ثبت سفارش"}
    </button>
  );
}
