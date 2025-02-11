import Bookings from "@/app/_components/Bookings";

export const metadata = {
  title: "Reservations",
};
function Page() {
  return <div className="h-full">{<Bookings />}</div>;
}

export default Page;
