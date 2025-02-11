"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, Logout } from "../_lib/apiService";

const initailStae = { from: null, to: null };

const ReservationContextProvider = createContext();
function ReservationContext({ children }) {
  const [selected, setSelected] = useState(initailStae);
  const [user, Setuser] = useState({});
  const [auth, SetAuth] = useState(false);
  const [loading, Setloading] = useState(true);
  const reset = () => setSelected(null);
  useEffect(function () {
    async function getCurrentUser() {
      Setloading(true);
      try {
        const data = await getUser();
        Setuser(data);
      } catch (err) {
        console.log(err);
        Setloading(false);
      } finally {
        Setloading(false);
      }
    }
    getCurrentUser();
  }, []);
  async function handelLogout() {
    Setloading(true);
    try {
      const res = await Logout();
      Setuser({});
      SetAuth(false);
    } catch (err) {
      console.log(err);
    } finally {
      Setloading(false);
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
        handelLogout,
        SetAuth,
        loading,
        Setloading,
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
