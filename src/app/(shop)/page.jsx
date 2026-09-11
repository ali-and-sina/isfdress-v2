import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import NewArrivals from "@/components/homepage/NewArrivals";
import Newsletter from "@/components/homepage/Newsletter";
import BestSellingProducts from "@/components/homepage/BestSellingProducts";
import SliderHero from "@/components/homepage/SliderHero";
import SpecialOffer from "@/components/homepage/SpecialOffer";
import TrustBadges from "@/components/homepage/TrustBadges";
import { getProducts } from "@/lib/getProducts";

export default async function HomePage() {
  const products = await getProducts();
  console.log(products.products);
  return (
    <div>
      <header>
        <SliderHero products={products.products} />
      </header>
      <main>
        <SpecialOffer />
        <BestSellingProducts products={products.products} />
        <NewArrivals products={products.products} />
        <FeaturedCategories products={products} />
        <TrustBadges />
        <Newsletter />
      </main>
    </div>
  );
}
