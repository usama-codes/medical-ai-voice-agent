"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { UserDetailContext } from "./context/UserDetailContext";

export type UserDetail = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    const result = await axios.post("/api/users");
    // console.log(result.data);
    setUserDetail(result.data);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="mediassist-theme"
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailContext.Provider>
    </ThemeProvider>
  );
}

export default Provider;
