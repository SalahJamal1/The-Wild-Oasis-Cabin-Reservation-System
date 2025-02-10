"use client";
import { useState } from "react";
import { singUp } from "../_lib/apiService";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [firstName, SetfirstName] = useState("");
  const [lastName, SetlastName] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const router = useRouter();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!firstName && !lastName && !email && !password) return;
    await singUp({ firstName, lastName, email, password });

    alert("success");
    router.push("/account");
  };
  return (
    <form method="POST" onSubmit={handelSubmit}>
      <label className="block text-primary-200 capitalize mb-2">
        first name
      </label>
      <input
        placeholder="first name"
        required
        type="text"
        className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
        value={firstName}
        onChange={(e) => SetfirstName(e.target.value)}
      />
      <label className="block text-primary-200 capitalize mb-2">
        last name
      </label>
      <input
        placeholder="last name"
        required
        type="text"
        className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
        value={lastName}
        onChange={(e) => SetlastName(e.target.value)}
      />
      <label className="block text-primary-200 capitalize mb-2">
        Email address
      </label>
      <input
        placeholder="email"
        required
        type="email"
        className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
        value={email}
        onChange={(e) => Setemail(e.target.value)}
      />
      <label className="text-primary-200 capitalize mb-2">Password</label>
      <input
        placeholder="password"
        required
        type="password"
        className=" w-full rounded-full px-4 py-1 mb-8  text-primary-800"
        value={password}
        onChange={(e) => Setpassword(e.target.value)}
      />
      <div className="flex items-center justify-center">
        <button className="bg-accent-600 text-primary-900 px-4 py-1 border-none rounded-lg uppercase">
          SIGN UP
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
