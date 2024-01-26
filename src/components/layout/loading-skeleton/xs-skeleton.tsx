import React from "react";

export default function XsSkeleton() {
  return (
    <div role="status" className="mx-auto w-8 animate-pulse py-1.5 my-1">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
  );
}
