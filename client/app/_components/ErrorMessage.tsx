"use client";

import { useRouter } from "next/navigation";

type Props = {
  error: string;
};
export default function ErrorMessage({ error }: Props) {
  const router = useRouter();
  return (
    <main className="flex justify-center items-center flex-col gap-6 pt-12">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error}</p>

      <button
        onClick={() => router.back()}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg cursor-pointer"
      >
        Go Back
      </button>
    </main>
  );
}
