import { IBOOKING } from "../_context/CabinsContext";
import { api } from "./apiCabins";

export async function apiBooking(data: IBOOKING, cabinId: string) {
  const res = await api.post(
    `/payments/create-session?cabinId=${cabinId}`,
    data
  );
  return res;
}
export async function GetBooking(signal?: AbortSignal) {
  const res = await api.get("/bookings", { signal });
  return res;
}
