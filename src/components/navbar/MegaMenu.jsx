import Link from "next/link";

export default function MegaMenu({ items }) {
  // items = categoriesWithSubCategories (زنانه، مردانه، بچگانه، اکسسوری)
  return (
    <div className="absolute right-0 top-full w-[850px] rounded-2xl border border-rose-200 bg-white p-6 shadow-lg">
      <div className="grid grid-cols-4 gap-6">
        {items.map((category) => (
          <div key={category.id}>
            <Link
              href={`/productCategory/${category.slug}`}
              className="mb-3 block text-sm font-bold text-rose-800 hover:text-rose-600"
            >
              {category.name}
            </Link>

            <ul className="space-y-2">
              {category.subCategories?.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/productCategory/${sub.slug}`}
                    className="text-sm text-gray-600 hover:text-rose-600"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
