"use client";
import { useState } from "react";

export function TextEditor({ children }) {
  const [show, setShow] = useState(false);
  const displayText = show
    ? children
    : children.split(" ").slice(0, 45).join(" ") + "...";
  return (
    <div className="mb-8">
      <p className="text-base text-primary-300">{displayText}</p>
      <span
        className="ml-2 cursor-pointer border-b-2 border-primary-700 text-primary-700"
        onClick={() => setShow((s) => !s)}
      >
        {show ? "Show less" : "Show more"}
      </span>
    </div>
  );
}
