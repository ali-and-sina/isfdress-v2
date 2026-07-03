import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import NewArrivals from "@/components/homepage/NewArrivals";
import Newsletter from "@/components/homepage/Newsletter";
import BestSellingProducts from "@/components/homepage/BestSellingProducts";
import SliderHero from "@/components/homepage/SliderHero";
import SpecialOffer from "@/components/homepage/SpecialOffer";
import TrustBadges from "@/components/homepage/TrustBadges";

export default function HomePage() {
  return (
    <div>
      <header>
        <SliderHero />
      </header>
      <main>
        <SpecialOffer />
        <BestSellingProducts />
        <NewArrivals />
        <FeaturedCategories />
        <TrustBadges />
        <Newsletter />
      </main>
    </div>
  );
}
