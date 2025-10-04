import React from "react";

export default function Loading() {
  return (
    <div className="relative mx-auto my-10 flex flex-col items-center justify-center animate-pulse">
      {/* Navbar Skeleton */}
      <div className="flex w-full items-center justify-between border-t border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="h-10 w-40 bg-muted rounded-lg"></div>
        <div className="h-10 w-24 bg-muted rounded-xl"></div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="px-4 py-10 md:py-20 space-y-8 w-full max-w-4xl">
        <div className="space-y-4">
          <div className="h-16 md:h-24 bg-muted rounded-lg mx-auto w-full"></div>
          <div className="h-12 md:h-16 bg-muted rounded-lg mx-auto w-5/6"></div>
        </div>
        <div className="h-6 bg-muted rounded mx-auto w-3/4"></div>
        <div className="h-12 w-60 bg-muted rounded-xl mx-auto"></div>
        <div className="h-96 bg-muted rounded-3xl mt-20"></div>
      </div>

      {/* Features Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-4 mt-20">
        <div className="h-72 bg-muted rounded-2xl"></div>
        <div className="h-72 bg-muted rounded-2xl"></div>
        <div className="h-72 bg-muted rounded-2xl"></div>
      </div>
    </div>
  );
}
