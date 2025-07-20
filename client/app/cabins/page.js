import Filter from "@/app/_ui/Filter";
import { Suspense } from "react";
import Spinner from "@/app/_ui/Spinner";
import ReservationReminder from "../_components/reservation/ReservationReminder";
import CabinList from "../_components/cabin/CabinList";
export const revalidate = 3600;
export const metadata = {
  title: "Cabins",
};
function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";
  return (
    <section className="py-12">
      <h2 className="text-4xl text-accent-400 font-medium mb-10">
        Our Luxury Cabins
      </h2>
      <p className="text-base font-normal">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex items-center justify-end mt-11">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </section>
  );
}

export default Page;
