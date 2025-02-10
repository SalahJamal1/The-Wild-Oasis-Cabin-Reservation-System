import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

function Reservation({ cabin }) {
  return (
    <div className="grid grid-cols-2 border border-primary-800 h-[398px]">
      <DateSelector cabin={cabin} />
      <ReservationForm />
    </div>
  );
}

export default Reservation;
