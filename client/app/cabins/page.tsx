import { Metadata } from "next";

import CabinList from "../_components/CabinList";

import Filter from "../_components/Filter";
import { apiCabins } from "../_lib/apiCabins";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export const metadata: Metadata = {
  title: "Cabins",
};

type Props = {
  searchParams: any;
};
export default async function Page({ searchParams }: Props) {
  const capacity = searchParams?.capacity ?? "all";
  const cabins = await apiCabins();

  return (
    <div className="py-12">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <Filter />
      <Suspense fallback={<Spinner />} key={capacity}>
        <CabinList cabins={cabins} capacity={capacity} />
      </Suspense>
    </div>
  );
}
