"use client";

import React from "react";
import Image from "next/image";
import { menu } from "motion/react-m";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    name: "Pricing",
    path: "/dashboard/billing",
  },
  {
    id: 4,
    name: "Profile",
    path: "/profile",
  },
];

function AppHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
      <Link href="/dashboard">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          style={{
            width: "auto",
            height: "auto",
          }}
          className="cursor-pointer"
        />
      </Link>
      <div className="hidden md:flex gap-13 items-center">
        {menuOptions.map((option, index) => (
          <div key={index}>
            <Link href={option.path}>
              <h2 className="hover:font-bold cursor-pointer transition-all">
                {option.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <UserButton />
    </div>
  );
}

export default AppHeader;
