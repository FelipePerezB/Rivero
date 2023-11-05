import { ReactNode } from "react";
export default function FileContainer({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute w-full flex justify-center h-max top-0 left-0">
      <div
        id="document-container"
        data-component={id}
        className="flex flex-col w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
