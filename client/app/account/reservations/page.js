import Bookings from "@/app/_components/booking/Bookings";

export const metadata = {
  title: "Reservations",
};
function Page() {
  return (
    <div className="h-full">
      <Bookings />
    </div>
  );
}

export default Page;
