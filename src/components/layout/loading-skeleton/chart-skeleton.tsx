import React from "react";

export default function ChartSkeleton() {
  return (
    <div className="flex items-baseline mt-4 gap-2 animate-pulse h-full w-full">
      <div className="w-full bg-gray-200 rounded-t-sm h-4/6 dark:bg-gray-700"></div>
      <div className="w-full h-2/6 bg-gray-200 rounded-t-sm dark:bg-gray-700"></div>
      <div className="w-full bg-gray-200 rounded-t-sm h-1/2 dark:bg-gray-700"></div>
      <div className="w-full h-5/6 bg-gray-200 rounded-t-sm dark:bg-gray-700"></div>
      <div className="w-full bg-gray-200 rounded-t-sm h-full dark:bg-gray-700"></div>
      <div className="w-full bg-gray-200 rounded-t-sm h-4/6 dark:bg-gray-700"></div>
      <div className="w-full bg-gray-200 rounded-t-sm h-1/2 dark:bg-gray-700"></div>
    </div>
  );
}
