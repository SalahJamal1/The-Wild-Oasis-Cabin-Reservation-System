"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
const options: { size: string; label: string }[] = [
  {
    size: "all",
    label: "All cabins",
  },
  {
    size: "small",
    label: "2—3 guests",
  },
  {
    size: "medium",
    label: "4—7 guests",
  },
  {
    size: "large",
    label: "8—12 guests",
  },
];
type Props = {};

export default function Filter() {
  const active = useSearchParams().get("capacity") ?? "all";
  const pathName = usePathname();
  const router = useRouter();
  const handelClick = (value: string) => {
    const params = new URLSearchParams();
    params.set("capacity", value);
    router.replace(`${pathName}?${params}`);
  };
  return (
    <div className="flex mb-5 justify-self-end border w-fit bg-primary-900">
      {options.map((option) => (
        <button
          onClick={() => handelClick(option.size)}
          className={`${
            active === option.size && "bg-primary-700"
          } px-5 py-2 border-none transition-all duration-150 cursor-pointer hover:bg-primary-700  font-light text-base`}
          key={option.label}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
