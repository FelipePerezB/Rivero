import "../globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next";
import { GeistSans } from "geist/font";

export const metadata: Metadata = {
  title: "Nextjs",
  description: "Generated by create next app",
  manifest: "/manifest.json",
};

// const font = Nunito({
//   subsets: ["latin"],
//   weight: ["300", "500", "600", "700"],
//   display: "swap",
// });

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${GeistSans.className}`}>
        <body className={`min-h-screen `}>
          {children}
          <SpeedInsights/>
        </body>
      </html>
    </ClerkProvider>
  );
}
