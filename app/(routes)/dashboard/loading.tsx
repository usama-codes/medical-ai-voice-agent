import React from "react";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div className="space-y-3 flex-1">
          <div className="h-10 bg-muted rounded-lg w-1/3"></div>
          <div className="h-5 bg-muted rounded w-1/2"></div>
        </div>
        <div className="h-10 w-40 bg-muted rounded-xl"></div>
      </div>

      {/* Content Skeletons */}
      <div className="space-y-6">
        <div className="h-64 bg-muted rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-80 bg-muted rounded-2xl"></div>
          <div className="h-80 bg-muted rounded-2xl"></div>
          <div className="h-80 bg-muted rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
