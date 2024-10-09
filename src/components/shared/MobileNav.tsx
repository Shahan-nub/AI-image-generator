"use client"
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          width={180}
          height={28}
          alt="logo"
        ></Image>
      </Link>

      <nav className="gap-2 flex">
        <SignedIn>
          <UserButton afterSignOutUrl="/"></UserButton>

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                width={32}
                height={32}
                alt="menu"
              ></Image>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <ul className="header-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === usePathname();
                return (
                  <li
                    key={link.route}
                    className={`header-nav_element group whitespace-nowrap p-2 font-semibold ${
                      isActive
                        ? "gradient-text font-black"
                        : "text-gray-700"
                    }`}
                  >
                    <Link href={link.route} className="header-link flex gap-3">
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      ></Image>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
}
