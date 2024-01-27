import { ReactNode } from "react";

export default function Bar  ({ height, active, children }: { height?: number; active?: boolean, children?: ReactNode })  {
  return (
    <div
      style={{ height: `${height}%` }}
      className={`w-full rounded-t-sm relative flex justify-center group ${
        active
          ? "bg-blue-500 hover:scale-x-110 hover:bg-blue-700 transition-all duration-200 cursor-pointer"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      {children}
    </div>
  );
};
