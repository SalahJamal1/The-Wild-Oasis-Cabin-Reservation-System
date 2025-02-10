"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser, Logout } from "../_lib/apiService";

const initailStae = { from: null, to: null };

const ReservationContextProvider = createContext();
function ReservationContext({ children }) {
  const [selected, setSelected] = useState(initailStae);
  const [user, Setuser] = useState({});
  const [auth, SetAuth] = useState(false);
  const reset = () => setSelected(null);

  useEffect(
    function () {
      async function getCurrentUser() {
        try {
          const data = await getUser();
          Setuser(data);
        } catch (err) {
          console.log(err);
        }
      }
      getCurrentUser();
    },
    [Setuser]
  );
  async function handelLogout() {
    try {
      const res = await Logout();
      Setuser({});
      SetAuth(false);
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
