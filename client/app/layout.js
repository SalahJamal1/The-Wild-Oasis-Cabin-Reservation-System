import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import ReservationContext from "./_components/ReservationContext";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";
export const metadata = {
  title: {
    template: "%s - The Wild Oasis",
    default: "The Wild Oasis",
  },
};
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});
function RootLayout({ children }) {
  noStore();
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen relative`}
      >
        <Header />
        <div className="px-8 grid flex-1">
          <ReservationContext>
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </ReservationContext>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
