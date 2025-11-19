"use client";
import { ReactNode, useEffect, useMemo, useReducer } from "react";
import { CabinProvider } from "../_hooks/useCabins";
import { refreshToken } from "../_lib/apiAuth";
export type ICabin = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export type IBOOKING = {
  id?: string;
  createdAt?: Date;
  has_breakfast: boolean;
  isPaid: boolean;
  numNights: number;
  numGuests: number;
  observations: string;
  endDate: Date;
  startDate: Date;
  cabin?: ICabin;
  paid?: boolean;
  totalPrice: number;
};
export type IUSER = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
};

interface ISTATE {
  user: IUSER;
  Auth: boolean;
  loader: boolean;
  bookings: IBOOKING[];
}
const initialState: ISTATE = {
  user: {} as IUSER,
  Auth: false,
  loader: false,
  bookings: [],
};

export type IACTION =
  | { type: "USER_LOGIN"; payload: IUSER }
  | { type: "USER_LOAD"; payload: IUSER }
  | { type: "USER_LOGOUT" }
  | { type: "USER_BOOKING"; payload: IBOOKING[] }
  | { type: "FINALLY" }
  | { type: "LOADER" };

const reducer = (state: ISTATE, action: IACTION): ISTATE => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload, Auth: true, loader: false };
    case "USER_LOGOUT":
      return { ...state, user: {} as IUSER, Auth: false, loader: false };
    case "USER_LOAD":
      return { ...state, user: action.payload, Auth: true, loader: false };
    case "USER_BOOKING":
      return { ...state, bookings: action.payload, loader: false };
    case "LOADER":
      return { ...state, loader: true };
    case "FINALLY":
      return { ...state, loader: false };
    default:
      return state;
  }
};

export interface Props extends ISTATE {
  dispatch: (action: IACTION) => void;
}
export default function CabinsContext({ children }: { children: ReactNode }) {
  const [{ user, Auth, loader, bookings }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const controller = new AbortController();
    if (token) {
      async function refresh() {
        dispatch({ type: "LOADER" });
        try {
          const res = await refreshToken(controller.signal);
          localStorage.setItem("jwt", res.data.access_token);
          dispatch({ type: "USER_LOAD", payload: res.data.user });
        } catch (err: any) {
          if (err.name !== "CanceledError") console.log(err);
        }
      }
      refresh();
    }
    return () => {
      controller.abort();
    };
  }, []);
  const value = useMemo(() => {
    return {
      user,
      Auth,
      dispatch,
      loader,
      bookings,
    };
  }, [user, Auth, dispatch, loader, bookings]);

  return (
    <CabinProvider.Provider value={value}>{children}</CabinProvider.Provider>
  );
}
