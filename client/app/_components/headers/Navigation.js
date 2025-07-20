"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/cabins",
    name: "cabins",
  },
  {
    href: "/about",
    name: "about",
  },
  {
    href: "/account",
    name: "guest area",
  },
];

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="z-10">
      <ul className="flex items-center gap-16">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`text-xl capitalize p-2 ${
                pathname === link.href
                  ? "text-accent-500  border-b-2 border-primary-500"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
