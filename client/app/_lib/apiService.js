import { notFound } from "next/navigation";
const { default: axios } = require("axios");

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/",
  withCredentials: true,
});

export async function getCabins() {
  const data = await api.get("cabins");

  return data.data;
}
export async function getCabin(id) {
  try {
    const data = await api.get(`/cabins/${id}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
}
export async function singUp(data) {
  const res = await api.post(`/auth/signup`, data);
}
export async function Login(data) {
  const res = await api.post(`/auth/login`, data);
  return res.data;
}
export async function Logout() {
  const res = await api.get(`/auth/logout`);
}
export async function getUser() {
  const res = await api.get(`/auth/current`);
  return res.data;
}
export async function createBooking(data) {
  const res = await api.post("bookings", data);
  console.log(res);
}
export async function getBookingByuser() {
  const res = await api.get("/bookings/bookingindery");
  return res.data;
}
export async function deleteBooking(id) {
  const res = await api.delete(`/bookings/${id}`);
}
