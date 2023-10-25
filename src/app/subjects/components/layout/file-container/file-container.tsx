import { ReactNode } from "react";
export default function FileContainer({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute w-full flex justify-center top-0 left-0 print:p-0">
      <div
        id="document-container"
        data-component={id}
        className="flex flex-col gap-4 print:gap-0 w-full max-w-2xl print:max-w-none print:text-[3vw]"
      >
        {children}
      </div>
    </div>
  );
}
