"use client";
import { useEffect, useState } from "react";
import { GetBooking } from "../_lib/apiBookings";
import ReservationCard from "./ReservationCard";
import ReservationMessage from "./ReservationMessage";
import { useCabins } from "../_hooks/useCabins";
import Loading from "../loading";

export default function ReservationList() {
  const { bookings, dispatch } = useCabins();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await GetBooking(controller.signal);
        dispatch({ type: "USER_BOOKING", payload: res.data });
      } catch (err: any) {
        if (err.name === "CanceledError") return;
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [dispatch]);
  if (loading || bookings === undefined) return <Loading />;
  if (!bookings?.length) return <ReservationMessage />;

  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        #Reservations
      </h2>
      <div className="space-y-8">
        {bookings?.map((booking) => (
          <ReservationCard key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
}
