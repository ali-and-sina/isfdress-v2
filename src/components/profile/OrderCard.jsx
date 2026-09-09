export default function OrderCard({ order }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-400">شماره سفارش</p>

          <p className="mt-1 text-sm font-medium">{order.id}</p>
        </div>

        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-600">
          {order.statusLabel}
        </span>
      </div>

      <div className="mt-5 border-t border-neutral-100 pt-4">
        <p className="text-sm text-neutral-500">{order.date}</p>

        <p className="mt-2 font-semibold">
          {order.total.toLocaleString()} تومان
        </p>
      </div>
    </article>
  );
}
