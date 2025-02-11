"use client";
import { useReservation } from "@/app/_components/ReservationContext";
import User from "./User";
import LoginMessage from "./LoginMessage";
import Spinner from "./Spinner";

function Account() {
  const { user, loading } = useReservation();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : user.firstName ? (
        <User user={user} />
      ) : (
        <LoginMessage />
      )}
    </>
  );
}

export default Account;
