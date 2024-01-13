import React from "react";

export default function ItemsBox({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "sm" | "xs";
}) {

  const sizeVariants = {
    md: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5",
    sm: "grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4  sm:gap-4",
    xs: "grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2 sm:gap-2"
  }

  return (
    <section className={"w-full mx-auto grid" + " " + sizeVariants[size]}>
      {children}
    </section>
  );
}
