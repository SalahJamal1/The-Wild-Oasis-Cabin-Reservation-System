"use client";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import { useReservation } from "./ReservationContext";
import ReservationFrom from "./ReservationFrom";

function Reservation({ cabin }) {
  const { user } = useReservation();
  return (
    <div className="grid grid-cols-2 border border-primary-800 h-[398px]">
      <DateSelector cabin={cabin} />
      <>
        {user.firstName ? <ReservationFrom cabin={cabin} /> : <LoginMessage />}
      </>
    </div>
  );
}

export default Reservation;
