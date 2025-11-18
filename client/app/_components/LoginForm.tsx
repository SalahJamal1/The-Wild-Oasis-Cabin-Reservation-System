"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../_lib/apiAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCabins } from "../_hooks/useCabins";

export type IUSERLOGIN = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const router = useRouter();
  const { dispatch } = useCabins();
  const [formData, setData] = useState<IUSERLOGIN>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "LOADER" });
    try {
      const res = await login(formData);
      router.push("/account");
      dispatch({ type: "USER_LOGIN", payload: res.data.user });
      localStorage.setItem("jwt", res.data.access_token);
      toast.success("you are logged in successfully");
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const message: string =
          err?.response?.data?.message ?? err.message ?? "Something went wrong";
        toast.error(message);
      }
    }
    setData((prev) => ({ ...prev, email: "", password: "" }));
  };
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-[38rem] place-content-center bg-slate-700 py-8 px-6 rounded-2xl"
    >
      <label className="text-xl font-semibold mb-1" htmlFor="">
        Email
      </label>
      <input
        type="email"
        required
        name="email"
        placeholder="joan@example.com"
        className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500 mb-5"
        value={formData.email}
        onChange={onChange}
      />
      <label className="text-xl font-semibold mb-1" htmlFor="">
        Password
      </label>
      <input
        type="password"
        placeholder="********"
        className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500 mb-8"
        required
        name="password"
        value={formData.password}
        onChange={onChange}
      />
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-accent-500 rounded-2xl border-0 cursor-pointer px-8 py-3 text-xl font-semibold transition-all duration-150 hover:bg-accent-400"
        >
          Login
        </button>
        <Link
          href="/signup"
          className="border-b pb-1 duration-150 transition-all hover:text-accent-400"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}
