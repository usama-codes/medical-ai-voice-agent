import React from "react";
import AppHeader from "./_components/AppHeader";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="px-6 md:px-12 lg:px-40 py-8 md:py-12 max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
