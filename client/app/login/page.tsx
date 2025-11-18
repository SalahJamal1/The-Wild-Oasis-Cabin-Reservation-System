import { Metadata } from "next";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center pt-12">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <LoginForm />
    </div>
  );
}
