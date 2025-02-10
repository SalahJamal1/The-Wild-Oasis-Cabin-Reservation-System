"use client";
import Login from "@/app/_components/Login";
import { useReservation } from "@/app/_components/ReservationContext";
import User from "./User";

function Account() {
  const { user } = useReservation();
  return <>{user.firstName ? <User user={user} /> : <Login />}</>;
}

export default Account;
