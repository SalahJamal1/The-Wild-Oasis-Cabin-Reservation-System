"use client";
import { useEffect, useState } from "react";
import { deleteBooking, getBookingByuser } from "@/app/_lib/apiService";
import Image from "next/image";
import { formatDates, formDate } from "@/app/utils/helper";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import BookingMessage from "./BookingMessage";
import Spinner from "@/app/_ui/Spinner";
import LoginMessage from "@/app/_components/login/LoginMessage";
import toast from "react-hot-toast";
import { useReservation } from "@/app/context/ReservationContext";

function getTotal(booking) {
  return (
    formDate(booking.startDate, booking.endDate) * booking.cabin.regularPrice
  );
}
function Bookings() {
  const { user, loading, Setloading } = useReservation();
  const [bookings, SetBookings] = useState([]);

  useEffect(
    function () {
      async function getBookings() {
        Setloading(true);
        try {
          const data = await getBookingByuser();

          SetBookings(data.data);
        } catch (err) {
          console.log(err);
        } finally {
          Setloading(false);
        }
      }
      getBookings();
    },
    [Setloading]
  );

  async function handelDelete(id) {
    Setloading(true);
    try {
      await deleteBooking(id);
      toast.success("Success! Your booked deleted.");
      SetBookings((booking) => booking.filter((b) => b.id !== id));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      Setloading(false);
    }
  }

  if (loading) return <Spinner />;
  if (!user.firstName) return <LoginMessage />;
  if (!bookings.length) return <BookingMessage />;
  return (
    <ul className="flex flex-col py-12 rounded-lg px-8 space-y-4 overflow-y-scroll h-[27rem] ml-12">
      {bookings.map((booking) => (
        <li
          className="flex h-[8rem] gap-8 border border-primary-800"
          key={booking.id}
        >
          <div className="relative aspect-square flex-1">
            <Image
              src={booking.cabin.image}
              alt={booking.user.firstName}
              fill
              className="object-cover flex-1"
            />
          </div>
          <div className="flex-grow py-2 px-4">
            <h2 className="text-base capitalize flex items-center mb-1">
              <span className="text-2xl mr-2">
                {formDate(booking.startDate, booking.endDate)}
              </span>
              nights in Cabin {booking.cabin.name}
            </h2>
            <p className="text-primary-300 capitalize mb-4">
              from {formatDates(booking.startDate)} — to{" "}
              {formatDates(booking.endDate)}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-accent-500 text-xl">$ {getTotal(booking)}</p>
              <span className="text-primary-300 capitalize">
                Booked {formatDates(booking.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col border-l border-primary-800 overflow-hidden">
            <span className="flex  items-center gap-2 text-primary-300 text-xs uppercase broder-b border-primary-800 px-6 py-6 border-b hover:bg-accent-500 transition-all duration-150 hover:text-primary-800 cursor-pointer">
              <FaEdit />
              Edit
            </span>
            <span
              onClick={() => handelDelete(booking.id)}
              className="flex  items-center gap-2 text-primary-300 text-xs uppercase px-6 py-6 hover:bg-accent-500 transition-all duration-150 hover:text-primary-800 cursor-pointer"
            >
              <RiDeleteBinFill />
              delete
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Bookings;
