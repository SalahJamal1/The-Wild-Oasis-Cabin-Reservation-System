"use client";
import React, { useCallback, useState } from "react";
import { ICabin } from "../_context/CabinsContext";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { DateRange } from "react-day-picker";

export type IRANGE = {
  from: Date | undefined;
  to: Date | undefined;
};
type Props = {
  cabin: ICabin;
};

export type IBOOKPOST = {
  range: IRANGE;
  numGuests: number;
  observations: string;
  totalPrice: number | undefined;
  numNights: number | undefined;
};

export default function Reservation({ cabin }: Props) {
  const [bookingData, setBookingData] = useState<IBOOKPOST>({
    range: { from: undefined, to: undefined },
    numGuests: 0,
    observations: "",
    totalPrice: undefined,
    numNights: undefined,
  });

  const onSelect = (range: DateRange) => {
    setBookingData((prev) => ({
      ...prev,
      range: { from: range.from, to: range.to },
    }));
  };
  const resetRange = () => {
    setBookingData((prev) => ({
      ...prev,
      range: { from: undefined, to: undefined },
    }));
  };
  const calcTotalPrice = useCallback((v: number, numNights: number): void => {
    setBookingData((prev) => ({ ...prev, totalPrice: v, numNights }));
  }, []);
  return (
    <>
      <DateSelector
        range={bookingData.range}
        regularPrice={cabin.regularPrice}
        onSelect={onSelect}
        resetRange={resetRange}
        calcTotalPrice={calcTotalPrice}
      />
      <ReservationForm
        bookingData={bookingData}
        setBookingData={setBookingData}
        cabin={cabin}
      />
    </>
  );
}
