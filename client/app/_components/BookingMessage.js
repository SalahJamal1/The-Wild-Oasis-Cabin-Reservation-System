import Link from "next/link";

function BookingMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8 capitalize">
      <p className="text-xl">😝 There are no bookings,</p>
      <Link
        className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-6"
        href="/cabins"
      >
        explore luxury cabins!
      </Link>
    </div>
  );
}

export default BookingMessage;
