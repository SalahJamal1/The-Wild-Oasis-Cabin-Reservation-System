"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, Login, Logout } from "../_lib/apiService";
import { useRouter } from "next/navigation";

const initailStae = { from: null, to: null };

const ReservationContextProvider = createContext();
function ReservationContext({ children }) {
  const [selected, setSelected] = useState(initailStae);
  const [user, Setuser] = useState({});

  const reset = () => setSelected(null);

  async function handelLogin(email, password) {
    try {
      await Login({ email, password });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(function () {
    async function getCurrentUser() {
      try {
        const data = await getUser();
        Setuser(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCurrentUser();
  }, []);

  async function handelLogout() {
    try {
      const res = await Logout();
      Setuser({});
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ReservationContextProvider.Provider
      value={{
        selected,
        setSelected,
        reset,
        user,

        Setuser,
        handelLogin,
        handelLogout,
      }}
    >
      {children}
    </ReservationContextProvider.Provider>
  );
}

export default ReservationContext;

export const useReservation = () => {
  const x = useContext(ReservationContextProvider);
  if (x === undefined) throw new Error("the context used outside");
  return x;
};
