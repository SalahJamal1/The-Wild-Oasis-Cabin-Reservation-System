import Link from "next/link";

function ReservationForm() {
  return (
    <div className="bg-primary-700 flex items-center justify-center">
      <p className="text-xl">
        Please
        <Link href="/account" className="text-accent-500 mx-2">
          login
        </Link>
        to reserve this cabin right now
      </p>
    </div>
  );
}

export default ReservationForm;
