import { Nunito } from "next/font/google";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const font = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

export default async function Layout({ children }: Props) {
  return <div className={font.className}>{children}</div>;
}
