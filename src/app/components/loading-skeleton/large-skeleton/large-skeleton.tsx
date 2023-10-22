import React from "react";

export default function LargeSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse py-3 my-0.5">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12"></div>
    </div>
  );
}
