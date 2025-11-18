import { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm";

export const metadata: Metadata = {
  title: "Signup",
};
export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center pt-12">
      <h2 className="text-3xl font-semibold">
        Sign Up to access your guest area
      </h2>
      <SignUpForm />
    </div>
  );
}
