"use client";
import { useReservation } from "@/app/_components/ReservationContext";
import User from "./User";
import LoginMessage from "./LoginMessage";

function Account() {
  const { user } = useReservation();

  return <>{user.firstName ? <User user={user} /> : <LoginMessage />}</>;
}

export default Account;
