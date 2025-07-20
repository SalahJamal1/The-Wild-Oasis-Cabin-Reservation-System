import Image from "next/image";
import { FaUserGroup } from "react-icons/fa6";
import Link from "next/link";
export function CabinCard({ cabin }) {
  return (
    <li key={cabin.id} className="flex border border-primary-800">
      <div className="relative flex-1">
        <Image
          fill
          className="object-cover object-top flex-1"
          src={cabin.image}
          alt={cabin.name}
        />
      </div>
      <div className="flex-grow">
        <div className="border-b border-primary-800 px-7 py-6">
          <h2 className="text-accent-500 font-semibold text-2xl mb-5">
            Cabin {cabin.name}
          </h2>
          <p className="flex items-center gap-3 text-base text-primary-200 mb-4">
            <span className="text-primary-600 text-base">
              <FaUserGroup />
            </span>
            For up to {cabin.maxCapacity} guests
          </p>
          <p className="text-base flex items-center gap-4 justify-end">
            <span className="text-3xl font-light">${cabin.regularPrice}</span>/
            night
          </p>
        </div>
        <div className="flex items-end justify-end">
          <Link
            className="px-6 py-5 border-l border-primary-800 transition-all duration-150 hover:bg-accent-600"
            href={`/cabins/${cabin.id}`}
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </li>
  );
}
