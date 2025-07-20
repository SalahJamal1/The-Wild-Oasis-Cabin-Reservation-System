"use client";
import { useReservation } from "@/app/context/ReservationContext";
import User from "./User";
import LoginMessage from "../login/LoginMessage";
import Spinner from "@/app/_ui/Spinner";

function Account() {
  const { user, loading } = useReservation();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : user?.firstName ? (
        <User user={user} />
      ) : (
        <LoginMessage />
      )}
    </>
  );
}

export default Account;
