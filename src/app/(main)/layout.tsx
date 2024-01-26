import "../../globals.css";
import { ReactNode } from "react";
import Navar from "../../components/layout/navar/navar";
import { GeistSans } from "geist/font";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <div className={`${GeistSans.className} text-black`}>
      <Navar />
      <main className={`flex flex-1 flex-col sm:gap-lg gap-md h-full w-full mx-auto max-w-7xl p-lg`}>
        {children}
      </main>
    </div>
  );
}
