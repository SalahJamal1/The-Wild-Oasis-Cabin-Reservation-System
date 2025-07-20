"use client";
import DateSelector from "@/app/_ui/DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "../login/LoginMessage";
import { useReservation } from "@/app/context/ReservationContext";
import Spinner from "@/app/_ui/Spinner";

function Reservation({ cabin }) {
  const { user, loading } = useReservation();
  return (
    <div className="grid grid-cols-2 border border-primary-800 h-[398px]">
      <DateSelector cabin={cabin} />
      <>
        {loading ? (
          <Spinner />
        ) : user.firstName ? (
          <ReservationForm cabin={cabin} />
        ) : (
          <LoginMessage />
        )}
      </>
    </div>
  );
}

export default Reservation;
