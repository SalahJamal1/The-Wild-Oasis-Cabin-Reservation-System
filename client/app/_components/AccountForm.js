"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "../_lib/apiService";

function AccountForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return;
    await Login({ email, password });
    router.push("/account");
  };

  return (
    <form method="POST" onSubmit={handelSubmit}>
      <label className="block text-primary-200 capitalize mb-2">
        Email address
      </label>
      <input
        placeholder="email"
        required
        type="email"
        className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-primary-200 capitalize mb-2">Password</label>
      <input
        placeholder="password"
        required
        type="password"
        className=" w-full rounded-full px-4 py-1 mb-8  text-primary-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <button className="bg-accent-600 text-primary-900 px-4 py-1 border-none rounded-lg uppercase">
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

export default AccountForm;
