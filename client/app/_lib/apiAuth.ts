import { IUSERLOGIN } from "../_components/LoginForm";
import { IUSER } from "../_context/CabinsContext";
import { api } from "./apiCabins";

export async function login(data: IUSERLOGIN) {
  const res = await api.post("/auth/login", data);
  return res;
}
export async function refreshToken(signal?: AbortSignal) {
  const res = await api.post("/auth/refresh-token", null, { signal });
  return res;
}

export async function signup(data: IUSER) {
  const res = await api.post("/auth/signup", data);
  return res;
}
export async function logout() {
  await api.get("/auth/logout");
}
