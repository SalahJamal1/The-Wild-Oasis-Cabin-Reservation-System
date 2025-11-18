"use client";
import React from "react";
import { useCabins } from "../_hooks/useCabins";

export default function ProfileForm() {
  const { user } = useCabins();
  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={user.firstName.concat(" ", user.lastName).toUpperCase()}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={user.email}
        />
      </div>
    </form>
  );
}
