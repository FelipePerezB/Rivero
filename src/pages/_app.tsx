import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider afterSignUpUrl={"https://rivero.vercel.app/"} {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
