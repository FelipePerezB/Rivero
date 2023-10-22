import React from "react";

export default function ItemsBox({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "sm";
}) {

  const sizeVariants = {
    md: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
    sm: "grid-cols-[repeat(auto-fit,minmax(120px,1fr))]"
  }

  return (
    <section className={"w-full mx-auto grid justify-items-center gap-4" + " " + sizeVariants[size]}>
      {children}
    </section>
  );
}
