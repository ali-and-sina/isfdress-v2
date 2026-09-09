import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
      <Link href="/" className="hover:text-rose-600">
        صفحه اصلی
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <span className="text-gray-300">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-rose-600">
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-800">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
