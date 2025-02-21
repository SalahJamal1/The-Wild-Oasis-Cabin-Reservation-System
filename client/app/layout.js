import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import ReservationContext from "./_components/ReservationContext";
import { Toaster } from "react-hot-toast";
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
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 relative grid grid-rows-[16vh,1fr] h-screen`}
      >
        <Header />
        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#363636",
              color: "#fff",
              iconTheme: { primary: "green", secondary: "black" },
            },

            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />

        <div className="px-8 grid flex-1 overflow-y-scroll">
          <ReservationContext>
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </ReservationContext>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
