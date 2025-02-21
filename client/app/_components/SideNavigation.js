"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHomeWork, MdOutlineDateRange } from "react-icons/md";
import { useReservation } from "./ReservationContext";
import { FaUser } from "react-icons/fa6";

const links = [
  {
    href: "/account",
    name: "Home",
    active: false,
    icon: <MdHomeWork />,
  },
  {
    href: "/account/reservations",
    name: "reservations",
    active: false,
    icon: <MdOutlineDateRange />,
  },
  {
    href: "#",
    name: "SignOut",
    active: true,
    icon: <FaUser />,
  },
];
function SideNavigation() {
  const pathname = usePathname();
  const { handelLogout, user } = useReservation();

  return (
    <div className="border-r border-primary-800 h-screen py-12">
      <ul className="px-8">
        {links.map((link) => (
          <li
            key={link.name}
            onClick={
              link.active && user?.firstName ? () => handelLogout() : () => {}
            }
          >
            <Link
              href={link.href}
              className={`capitalize flex items-center gap-2 mb-5  px-4 py-2 hover:bg-primary-800 transition-all duration-150 ${
                pathname === link.href ? "bg-primary-800" : ""
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
