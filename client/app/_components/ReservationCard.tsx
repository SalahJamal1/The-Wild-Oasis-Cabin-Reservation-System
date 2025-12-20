import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import { IBOOKING } from "../_context/CabinsContext";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type Props = {
  booking: IBOOKING;
};
function ReservationCard({ booking }: Props) {
  const {
    startDate,
    endDate,
    numGuests,
    createdAt,
    cabin,
    numNights,
    totalPrice,
    paid,
  } = booking;
  console.log(booking);

  return (
    <div className="flex border border-primary-800" key={booking.id}>
      <div className="relative h-32 aspect-square">
        <Image
          fill
          src={cabin?.image ?? ""}
          alt={`Cabin ${cabin?.name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {cabin?.name}
          </h3>
          {!paid ? (
            <span className="bg-red-600 text-slate-100 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              Unpaid
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              Paid
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate.toString())}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(createdAt ?? ""), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
