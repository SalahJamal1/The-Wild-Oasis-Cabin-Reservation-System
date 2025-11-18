"use client";

import { FormEvent } from "react";
import { useCabins } from "../_hooks/useCabins";
import LoginMessage from "./LoginMessage";
import { IBOOKPOST } from "./Reservation";
import toast from "react-hot-toast";
import { apiBooking } from "../_lib/apiBookings";
import { IBOOKING, ICabin } from "../_context/CabinsContext";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  bookingData: IBOOKPOST;
  setBookingData: (v: IBOOKPOST) => void;
  cabin: ICabin;
};
function ReservationForm({ bookingData, setBookingData, cabin }: Props) {
  // CHANGE
  const router = useRouter();

  const { Auth, user, dispatch, loader } = useCabins();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!bookingData.range.from || !bookingData.range.to)
      return toast.error("Please insert the Range Date");
    if (!bookingData.totalPrice || !bookingData.numNights) return;
    const newBooking: IBOOKING = {
      has_breakfast: false,
      isPaid: true,
      numGuests: bookingData.numGuests,
      observations: bookingData.observations,
      startDate: bookingData.range.from,
      endDate: bookingData.range.to,
      totalPrice: bookingData.totalPrice!,
      numNights: bookingData.numNights!,
    };

    dispatch({ type: "LOADER" });
    try {
      const res = await apiBooking(newBooking, cabin?.id);
      router.replace(res?.data?.url);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err?.response?.data?.message ?? err.message;
        toast.error(message);
      }
    }
  };
  if (!Auth) return <LoginMessage />;
  return (
    <div className="border-l border-primary-600">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as {user?.firstName}</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            value={bookingData.numGuests}
            onChange={(e) =>
              setBookingData({ ...bookingData, numGuests: +e.target.value })
            }
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
            value={bookingData.observations}
            onChange={(e) => {
              setBookingData({ ...bookingData, observations: e.target.value });
            }}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button
            disabled={loader}
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
