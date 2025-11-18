import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "docker"
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8080/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err: any) => Promise.reject(err)
);
export async function apiCabins() {
  const res = await api.get("/cabins");
  return res?.data;
}

export async function apiCabin(id: string) {
  const res = await api.get(`/cabins/${id}`);
  return res.data;
}
