"use client";
import { MdOutlineClose } from "react-icons/md";
import { useReservation } from "../../context/ReservationContext";
import { formatDates } from "../../utils/helper";

function ReservationReminder() {
  const { selected, reset } = useReservation();
  if (selected?.from)
    return (
      <div className="fixed items-start gap-8 py-5 px-8 flex justify-center bottom-8 rounded-full  text-primary-800 bg-accent-400 -translate-x-1/2 left-1/2 max-w-[350px]">
        <p>
          👋 Don't forget to reserve your dates from
          {formatDates(selected.from)} to {formatDates(selected.to)}
        </p>
        <button className="text-xl" onClick={reset}>
          <MdOutlineClose />
        </button>
      </div>
    );
}

export default ReservationReminder;
