import { getCabin, getCabins } from "@/app/_lib/apiService";

import Reservation from "@/app/_components/reservation/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_ui/Spinner";
import Cabin from "@/app/_components/cabin/Cabin";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin ${cabin.name}`,
  };
}
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="max-w-6xl mx-auto py-12">
        <Cabin cabin={cabin} />
        <div className="mt-24">
          <h2 className="text-5xl font-semibold text-accent-400 text-center mb-10">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>
          <Reservation cabin={cabin} />
        </div>
      </div>
    </Suspense>
  );
}

export default Page;
