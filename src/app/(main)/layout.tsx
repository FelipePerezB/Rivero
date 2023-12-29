import "../../globals.css";
import { ReactNode } from "react";
import Navar from "../../components/layout/navar/navar";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <>
      <Navar />
      <main className="flex flex-1 flex-col gap-8 p-4  h-full w-full mx-auto max-w-5xl bg-body text-black`}">
        {children}
      </main>
    </>
  );
}
