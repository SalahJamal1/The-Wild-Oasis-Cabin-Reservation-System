"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Login } from "@/app/_lib/apiService";
import { useReservation } from "@/app/context/ReservationContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { SetAuth, Setuser } = useReservation();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return;
    try {
      const res = await Login({ email, password });
      toast.success("Login Successfully");
      Setuser(res?.data.user);
      SetAuth(true);
      router.push("/account");
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message)
        return toast.error(err.response.data.message);
      else setError(err.message);
    }
  };
  if (error)
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-xl tracking-wider">{error}</p>
        <button
          onClick={() => {
            setEmail("");
            setPassword("");
            setError("");
            router.refresh();
          }}
          className="bg-accent-500 text-primary-800 font-semibold text-xl px-8 py-6"
        >
          Try again
        </button>
      </div>
    );

  return (
    <form method="POST" onSubmit={handelSubmit}>
      <label className="block text-primary-200 capitalize mb-3 tracking-wider text-[18px]">
        Email address
      </label>
      <input
        placeholder="john@example.com"
        required
        type="email"
        className="block w-full rounded-lg px-4 py-3 mb-8 text-primary-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block text-primary-200 capitalize mb-3 tracking-wider text-[18px]">
        Password
      </label>
      <input
        placeholder="password"
        required
        type="password"
        className="block w-full rounded-lg px-4 py-3 mb-8 text-primary-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <button className="bg-accent-600 text-primary-900 px-4 py-2 border-none rounded-lg uppercase text-[18px] flex-grow mr-14">
          Login
        </button>
        <Link
          href="/signup"
          className=" capitalize border-b text-accent-600 border-accent-600"
        >
          Create new account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
