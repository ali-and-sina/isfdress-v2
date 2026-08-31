import Navbar from "@/components/navbar/navbar";
import { getNavCategoriesCached } from "@/lib/categories";

export default async function ShopLayout({ children }) {
  const categories = await getNavCategoriesCached();

  return (
    <div>
      <Navbar categories={categories} />
      {children}
    </div>
  );
}
