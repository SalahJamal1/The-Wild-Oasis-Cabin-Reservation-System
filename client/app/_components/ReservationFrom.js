import { useState } from "react";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/apiService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ReservationFrom({ cabin }) {
  const { user, selected, reset } = useReservation();
  const [observations, Setobservations] = useState("");
  const [numGuests, SetnumGuests] = useState("");
  const [loading, Setloading] = useState(false);
  const router = useRouter();
  async function handelSubmit(e) {
    e.preventDefault();
    Setloading(true);
    if (!selected.from || !selected.to || !numGuests)
      return toast.error("the filed is required".toUpperCase());

    const newBooking = {
      startDate: selected.from,
      endDate: selected.to,
      hasBreakfast: true,
      observations,
      isPaid: true,
      numGuests,
    };
    try {
      await createBooking(newBooking, cabin.id);
      toast.success("Success! You are booked.");
      router.push("/account/reservations");
      reset();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      Setloading(false);
    }
  }
  return (
    <div className="bg-primary-900">
      <h2 className="block text-xl tracking-wider mb-2 text-primary-200 bg-primary-800 px-16 py-2">
        Logged in as {`${user.firstName} ${user.lastName}`}
      </h2>
      <form className="px-16 py-8" method="POST" onSubmit={handelSubmit}>
        <label className="block text-primary-200 capitalize mb-2">
          How many guests?
        </label>
        <select
          className="block w-full px-2 py-4 rounded-md mb-6 bg-primary-800"
          value={numGuests}
          onChange={(e) => SetnumGuests(e.target.value)}
        >
          <option>Select number of guests...</option>
          {Array.from({ length: cabin.maxCapacity }, (_, i) => (
            <option value={i + 1} key={i}>{`${i + 1} ${
              i + 1 > 1 ? "guests" : "guest"
            }`}</option>
          ))}
        </select>
        <label className="block text-primary-200 capitalize mb-2">
          Anything we should know about your stay?
        </label>
        <input
          placeholder=" Any pets, allergies, special
          requirements, etc.?"
          className=" block w-full px-2 py-6 rounded-md mb-6 bg-primary-800"
          value={observations}
          onChange={(e) => Setobservations(e.target.value)}
        />
        <div className="flex items-center justify-end">
          <button
            disabled={loading}
            className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-3"
          >
            {loading ? "Loading..." : "Reserve now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationFrom;
