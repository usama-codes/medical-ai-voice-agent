"use client";
import React from "react";
import NewUserDialog from "./_components/NewUserDialog";
import dynamic from "next/dynamic";

// Lazy load heavy components for better performance
const HistoryList = dynamic(() => import("./_components/HistoryList"), {
  loading: () => (
    <div className="animate-pulse h-40 bg-muted rounded-2xl"></div>
  ),
  ssr: false,
});

const DoctorsAgentList = dynamic(
  () => import("./_components/DoctorsAgentList"),
  {
    loading: () => (
      <div className="animate-pulse h-60 bg-muted rounded-2xl"></div>
    ),
    ssr: false,
  }
);

function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="relative flex items-center justify-between pb-6 border-b border-border/50">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your medical consultations and health records
          </p>
        </div>
        <NewUserDialog />
      </header>
      <div className="space-y-6">
        <HistoryList />
        <DoctorsAgentList />
      </div>
    </div>
  );
}

export default Dashboard;
