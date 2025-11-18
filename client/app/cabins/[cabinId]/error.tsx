"use client";

type Props = {
  error: unknown;
  reset: () => void;
};
export default function Error({ error, reset }: Props) {
  const message: string = (error as { message: string }).message ?? "Error!";
  return (
    <main className="flex justify-center items-center flex-col gap-6 pt-12">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg cursor-pointer"
      >
        Try again
      </button>
    </main>
  );
}
