"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useCabins } from "../_hooks/useCabins";
import { logout } from "../_lib/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignOutButton() {
  const { dispatch, loader } = useCabins();
  const router = useRouter();
  const onClick = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    dispatch({ type: "LOADER" });
    try {
      await logout();
      router.push("/");
      toast.success("You are logged out");
      dispatch({ type: "USER_LOGOUT" });
      localStorage.removeItem("jwt");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={loader}
      className="py-3 px-5 hover:bg-primary-700 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full cursor-pointer"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
