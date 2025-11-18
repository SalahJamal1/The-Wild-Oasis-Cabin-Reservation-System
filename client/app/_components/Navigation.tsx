"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages: { href: string; name: string }[] = [
  {
    href: "/cabins",
    name: "Cabins",
  },

  {
    href: "/about",
    name: "About",
  },
  {
    href: "/account",
    name: "Guest area",
  },
];
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center text-primary-100">
        {pages.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`hover:text-accent-400 transition-colors ${
                pathname === link.href && "text-accent-400"
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
