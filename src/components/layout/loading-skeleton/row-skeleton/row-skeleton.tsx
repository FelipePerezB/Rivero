import React from "react";

export default function RowSkeleton() {
  return (
    <div className="flex w-full items-center justify-between pt-4 bg-white animate-pulse">
      <div className="w-full flex items-center justify-around gap">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 min-w-[60px] w-full mb-2.5"></div>
          <div className="min-w-[60px] w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 min-w-[60px] w-full mb-2.5"></div>
          <div className="min-w-[60px] w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 min-w-[60px] w-full mb-2.5"></div>
          <div className="min-w-[60px] w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
