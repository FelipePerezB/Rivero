import {
  Nunito,
} from "next/font/google";
import "./components/globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Navar from "./components/navar/navar";
import NavSidebar from "./components/navar/nav-sidebar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const font = Nunito({
  subsets: ["latin"],
  // weight: ["400"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className={`${font.className} min-h-screen bg-body`}>
        <header>
          <Navar />
        </header>
        <main className="flex flex-col gap-3 p-4 pt-[70px] h-full w-full mx-auto">
          <ClerkProvider>{children}</ClerkProvider>
          <NavSidebar/>
        </main>
      </body>
    </html>
  );
}
