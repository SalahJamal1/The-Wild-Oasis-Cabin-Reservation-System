"use client";
import { useCabins } from "@/app/_hooks/useCabins";
import { GetBooking } from "@/app/_lib/apiBookings";
import { useEffect, useState } from "react";
import Loading from "../loading";
import ReservationMessage from "@/app/_components/ReservationMessage";
import ReservationCard from "@/app/_components/ReservationCard";

export default function Page() {
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
    <div className="py-12">
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        #Reservations
      </h2>
      <div className="space-y-8">
        {bookings?.map((booking) => (
          <ReservationCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
