import { ReactNode } from "react";

export default function CardItem({
  title,
  value,
}: {
  title: string;
  value: ReactNode;
}) {
  return <div className="flex flex-col items-center">
    <h3 className="font-bold">{title}</h3>
    <span>{value}</span>
  </div>;
}
