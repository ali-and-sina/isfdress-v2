import Link from "next/link";

export default function MegaMenu({ items }) {
  // items = subcategories belonging to this one category
  return (
    <div className="absolute z-50 right-0 top-full w-64 rounded-2xl border border-rose-200 bg-white p-3 shadow-lg">
      <ul className="space-y-1">
        {items.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`/productCategory/${sub.categorySlug}/${sub.slug}`}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
