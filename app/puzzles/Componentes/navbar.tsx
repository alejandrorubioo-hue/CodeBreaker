"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type LinkItem = {
  href: string;
  label: string;
};

export default function NavBar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

const links: LinkItem[] = [
  { href: "/", label: "🏠 Dashboard" },
  { href: "/puzzles", label: "🧩 Puzzles" },
  { href: "/bug-hunter", label: "🐛 Bug Hunter" },
  { href: "/code-runner", label: "🏃‍♂️ Code Runner" },
];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        {/* Desktop y Mobile Header */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-xl font-bold">CodeBreaker</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-blue-200 transition-colors ${
                  path === link.href ? "text-yellow-300 font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 hover:text-blue-200 ${
                  path === link.href ? "text-yellow-300 font-bold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}