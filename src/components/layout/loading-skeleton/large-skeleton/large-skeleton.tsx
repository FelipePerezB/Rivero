import React from "react";

export default function LargeSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={`max-w-sm animate-pulse py-2 mb-1`}
    >
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12"></div>
    </div>
  );
}
