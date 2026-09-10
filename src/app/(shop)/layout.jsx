import Navbar from "@/components/navbar/navbar";
import { auth } from "@/lib/auth";
import { getNavCategoriesCached } from "@/lib/categories";

export default async function ShopLayout({ children }) {
  const categories = await getNavCategoriesCached();
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <Navbar categories={categories} user={user} />
      {children}
    </div>
  );
}
