import React from "react";

export default function RowSkeleton() {
  return (
    <div className="flex items-center justify-between pt-4 bg-white animate-pulse">
      <div className="w-full flex items-center justify-around gap-3">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
