import CabinCard from "./CabinCard";

import { ICabin } from "../_context/CabinsContext";

type Props = {
  cabins: ICabin[];
  capacity: string;
};
export default function CabinList({ cabins, capacity }: Props) {
  let cabinFilter: ICabin[] = [];
  if (capacity === "all") cabinFilter = [...cabins];
  if (capacity === "small")
    cabinFilter = cabins?.filter((cabin) => cabin.maxCapacity <= 3);
  if (capacity === "medium")
    cabinFilter = cabins?.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (capacity === "large")
    cabinFilter = cabins?.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinFilter?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin?.id} />
      ))}
    </div>
  );
}
