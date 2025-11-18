"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { signup } from "../_lib/apiAuth";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUpForm() {
  const router = useRouter();

  const [formData, setData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      router.push("/login");

      toast.success("you are registered in successfully");
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        const message: string =
          err?.response?.data?.message ?? err.message ?? "Something went wrong";
        toast.error(message);
      }
    }
    setData((prev) => ({
      ...prev,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="grid grid-cols-[58rem] place-content-center bg-slate-700 py-12 px-6 rounded-2xl">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 space-y-4 space-x-6"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-semibold" htmlFor="">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500"
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-semibold" htmlFor="">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500"
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-semibold" htmlFor="">
            Email
          </label>
          <input
            type="email"
            placeholder="joan@example.com"
            className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-semibold" htmlFor="">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-semibold mb-1" htmlFor="">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="border-slate-300 border px-4 rounded-2xl py-3 text-xl outline-0 duration-150 transition-all focus:ring-3 focus:ring-accent-500"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col justify-center mt-4">
          <button
            type="submit"
            className="bg-accent-500 rounded-2xl border-0 cursor-pointer py-3 text-xl font-semibold transition-all duration-150 hover:bg-accent-400 h-fit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
