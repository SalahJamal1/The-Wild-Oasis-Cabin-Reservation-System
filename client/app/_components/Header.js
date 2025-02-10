import { Suspense } from "react";
import Logo from "./Logo";
import Navigation from "@/app/_components/Navigation";
import Spinner from "./Spinner";

function Header() {
  return (
    <header className="px-8 py-5 border-b  border-primary-900">
      <div className="flex items-center justify-between flex-wrap max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
