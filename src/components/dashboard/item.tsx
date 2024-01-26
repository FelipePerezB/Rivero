import { ReactNode } from "react";

export default function Item({
  subtitle,
  title,
}: {
  title?: string | number | ReactNode;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col justify-center w-20">
      <span className="text-xl font-medium text-center">{title}</span>
      <span className="text-xs font-extralight text-center">{subtitle}</span>
    </div>
  );
}
