import "../../globals.css";
import { ReactNode } from "react";
import Navar from "../../components/layout/navar/navar";
import { GeistSans } from "geist/font";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <>
      <Navar />
      <main className={`${GeistSans.className} flex flex-1 flex-col sm:gap-lg gap-md h-full w-full mx-auto max-w-5xl text-black p-lg`}>
        {children}
      </main>
    </>
  );
}
