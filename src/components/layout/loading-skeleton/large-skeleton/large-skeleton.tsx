import React from "react";

export default function LargeSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={`${className} max-w-sm w-full min-w-[180px] animate-pulse py-2 mb-1`}
    >
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12"></div>
    </div>
  );
}
