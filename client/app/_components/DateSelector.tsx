"use client";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IRANGE } from "./Reservation";
import { useEffect } from "react";

const getDaysBetweenDates = (from: Date, to: Date) => {
  const diffTime = to.getTime() - from.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

type Props = {
  regularPrice: number;
  range: IRANGE;
  onSelect: (range: DateRange) => void;
  resetRange: () => void;
  calcTotalPrice: (v: number, numNights: number) => void;
};
function DateSelector({
  regularPrice,
  range,
  onSelect,
  resetRange,
  calcTotalPrice,
}: Props) {
  // CHANGE
  const discount = 23;

  const numNights: number =
    (range.from && range.to && getDaysBetweenDates(range.from!, range.to!)) ??
    0;
  const totalPrice: number = (regularPrice - discount) * numNights;
  useEffect(() => {
    calcTotalPrice(totalPrice, numNights);
  }, [calcTotalPrice, totalPrice, numNights]);
  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="flex flex-col justify-between border-r border-primary-600">
      <DayPicker
        className="py-4 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        selected={{ from: range.from, to: range.to }}
        onSelect={(range) => {
          onSelect(range ?? { from: undefined, to: undefined });
        }}
        disabled={{ before: new Date() }}
      />

      <div className="flex items-center justify-between px-4 bg-accent-500 text-primary-800 h-[72px] overflow-hidden">
        <div className="flex items-center gap-5">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-5 flex items-center py-6  text-xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="text-base font-bold uppercase">Total</span>
                <span className="text-xl font-semibold">
                  ${totalPrice.toLocaleString()}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
