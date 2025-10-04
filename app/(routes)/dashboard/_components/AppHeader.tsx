"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { menu } from "motion/react-m";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "History",
    path: "/dashboard/history",
  },
  {
    id: 3,
    name: "Billing",
    path: "/dashboard/billing",
  },
  {
    id: 4,
    name: "Profile",
    path: "/dashboard/profile",
  },
];

function AppHeader() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-md shadow-sm p-4 px-6 md:px-20 lg:px-40"
      role="banner"
    >
      <Link href="/dashboard" aria-label="Go to dashboard home">
        <Logo
          textSize="lg"
          className="cursor-pointer transition-transform hover:scale-105"
        />
      </Link>
      <nav
        className="hidden md:flex gap-8 items-center"
        role="navigation"
        aria-label="Dashboard navigation"
      >
        {menuOptions.map((option, index) => (
          <Link
            key={index}
            href={option.path}
            className="text-foreground/80 hover:text-primary font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:text-primary focus:underline underline-offset-4"
            aria-label={`Navigate to ${option.name}`}
          >
            {option.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {mounted ? (
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-10 h-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
              },
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
        )}
      </div>
    </header>
  );
}

export default AppHeader;
