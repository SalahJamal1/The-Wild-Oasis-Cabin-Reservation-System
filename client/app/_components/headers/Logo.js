import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image src={logo} alt="logo" width="60" height="60" />
      <span className="text-xl font-semibold">The Wild Oasis</span>
    </Link>
  );
}

export default Logo;
