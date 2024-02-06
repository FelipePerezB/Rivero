import React from "react";

export default function SmallSkeleton() {
  return (
    <div role="status" className="w-full animate-pulse py-1.5 my-0.5 max-w-[100px]">
      <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
  );
}
