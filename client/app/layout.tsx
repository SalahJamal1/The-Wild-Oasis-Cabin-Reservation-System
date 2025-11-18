import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import CabinsContext from "./_context/CabinsContext";

const josefinSans = Josefin_Sans({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s - The Wild Oasis",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} grid grid-rows-[auto_1fr] h-screen bg-primary-900  relative text-primary-100`}
        suppressHydrationWarning
      >
        <CabinsContext>
          <Header />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <div className="grid flex-1 overflow-y-scroll">
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </CabinsContext>
      </body>
    </html>
  );
}
