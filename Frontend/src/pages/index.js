import ExclusiveOffer from "@/components/ExclusiveOffer";
import FeaturedDestination from "@/components/FeaturedDestination";
import GuestRating from "@/components/GuestRating";
import MainHeader from "@/components/MainHeader";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="relative">
      <div>
        <MainHeader />
        <FeaturedDestination />
        <ExclusiveOffer />
        <GuestRating />
        <Newsletter />
      </div>
    </div>
  );
}
