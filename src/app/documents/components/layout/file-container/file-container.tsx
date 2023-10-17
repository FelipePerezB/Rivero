import { ReactNode } from "react";
export default function FileContainer({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute flex justify-center top-0 left-0 pt-[70px] w-full px-4 pb-4 print:p-0">
      <div
        id="document-container"
        data-component={id}
        className="flex flex-col gap-4 print:gap-0 w-full text-[clamp(0.001em,2.82vw,20.5px)] max-w-2xl print:max-w-none print:text-[3vw]"
      >
        {children}
      </div>
    </div>
  );
}
