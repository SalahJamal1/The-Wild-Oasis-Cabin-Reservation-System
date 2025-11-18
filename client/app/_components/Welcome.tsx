"use client";

import Link from "next/link";
import { useCabins } from "../_hooks/useCabins";

export default function Welcome() {
  const { user } = useCabins();
  const fullName = user.firstName.concat(" ", user.lastName);
  return (
    <div className="space-y-6 mt-4">
      <h2 className="font-semibold text-2xl text-accent-400 mb-7 py-12">
        Welcome, {fullName}
      </h2>

      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
