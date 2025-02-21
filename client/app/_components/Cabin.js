import Image from "next/image";
import { FaLocationDot, FaUserGroup } from "react-icons/fa6";
import { BsEyeSlashFill } from "react-icons/bs";
import { TextEditor } from "@/app/_components/TextEditor";
import Logo from "@/app/_components/Logo";

function Cabin({ cabin }) {
  return (
    <div className="border border-primary-800 grid grid-cols-[3fr_4fr] px-10 py-3 my-8">
      <div className="relative aspect-square scale-y-[1.15] -translate-x-12">
        <Image
          fill
          alt={cabin.name}
          src={cabin.image}
          className="object-cover"
        />
      </div>
      <div className="py-10">
        <h2 className="text-7xl text-accent-100 font-bold bg-primary-900 mb-8 p-6 translate-x-[-250px] w-fit">
          Cabin {cabin.name}
        </h2>
        <TextEditor>{cabin.description}</TextEditor>
        <Logo />
        <p className="flex items-center gap-3 text-base text-primary-300 mb-4 mt-4">
          <span className="text-primary-600 text-base">
            <FaUserGroup />
          </span>
          For up to {cabin.maxCapacity} guests
        </p>
        <p className="flex items-center gap-3 text-base text-primary-200 mb-4">
          <span className="text-primary-600 text-base">
            <FaLocationDot />
          </span>
          Located in the heart of the Dolomites (Italy)
        </p>
        <p className="flex items-center gap-3 text-base text-primary-200 mb-4">
          <span className="text-primary-600 text-base">
            <BsEyeSlashFill />
          </span>
          Privacy 100% guaranteed
        </p>
      </div>
    </div>
  );
}

export default Cabin;
