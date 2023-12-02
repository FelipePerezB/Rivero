import React from "react";

export default function ItemsBox({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "sm";
}) {

  const sizeVariants = {
    md: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5",
    sm: "grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-10 sm:gap-4"
  }

  return (
    <section className={"w-full mx-auto grid" + " " + sizeVariants[size]}>
      {children}
    </section>
  );
}
