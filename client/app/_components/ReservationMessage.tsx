import Link from "next/link";
export default function ReservationMessage() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        You can make a new booking anytime!
      </h1>

      <Link
        href="/cabins"
        className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
      >
        Explore luxury cabins
      </Link>
    </div>
  );
}
