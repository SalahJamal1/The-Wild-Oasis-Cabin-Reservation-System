"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { formDate } from "../utils/helper";
import { useReservation } from "../context/ReservationContext";

function DateSelector({ cabin }) {
  const { selected, setSelected, reset } = useReservation();
  let total;
  let days;
  if (selected) {
    const { from, to } = selected;
    days = formDate(from, to);
    total = cabin.regularPrice * days;
  }

  return (
    <div className="flex flex-col">
      <DayPicker
        className="place-self-center mb-6 py-2"
        mode="range"
        selected={selected}
        onSelect={setSelected}
        min={1}
        max={10}
        captionLayout="dropdown"
        disabled={{ before: new Date() }}
      />
      <div className="bg-accent-500  py-2 px-8 flex items-center justify-between text-primary-800">
        <div className="flex items-center space-x-4">
          <p className="text-base flex items-center gap-4">
            <span className="text-3xl font-light">${cabin.regularPrice}</span>/
            night
          </p>
          <p className="text-base flex items-center gap-4 bg-accent-600 py-1 px-2">
            x<span className="text-3xl font-light">{days ? days : 0}</span>
          </p>
          <p className="text-base flex items-center gap-4 uppercase">
            Total
            <span className="text-3xl font-light">${total ? total : 0}</span>
          </p>
        </div>
        <button onClick={reset} className="border border-primary-800 px-4 py-1">
          Clear
        </button>
      </div>
    </div>
  );
}

export default DateSelector;
