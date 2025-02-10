import { getCabins } from "../_lib/apiService";

import { CabinCard } from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  let displayCabins;
  if (filter === "all") displayCabins = cabins;
  else if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  else if (filter === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  else if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div className="mt-8">
      <ul className="grid grid-cols-2 gap-14">
        {displayCabins?.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </ul>
    </div>
  );
}

export default CabinList;
