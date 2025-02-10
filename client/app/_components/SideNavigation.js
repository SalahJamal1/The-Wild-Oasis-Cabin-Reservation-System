"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHomeWork } from "react-icons/md";
import { useReservation } from "./ReservationContext";

const links = [
  {
    href: "/account",
    name: "Home",
    active: false,
  },
  {
    href: "/account/reservations",
    name: "reservations",
    active: false,
  },
  {
    href: "/",
    name: "SignOut",
    active: true,
  },
];
function SideNavigation() {
  const pathname = usePathname();
  const { handelLogout } = useReservation();

  return (
    <div className="border-r border-primary-800 h-screen py-12">
      <ul className="px-8">
        {links.map((link) => (
          <li
            key={link.name}
            onClick={link.active ? () => handelLogout() : () => {}}
          >
            <Link
              href={link.href}
              className={`capitalize flex items-center gap-2 mb-5  px-4 py-2 hover:bg-primary-800 transition-all duration-150 ${
                pathname === link.href ? "bg-primary-800" : ""
              }`}
            >
              <MdHomeWork />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
