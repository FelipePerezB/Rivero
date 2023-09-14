import { ApolloProvider } from "@apollo/client";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "src/service/client";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ClerkProvider afterSignUpUrl={"https://rivero.vercel.app/"}  {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </ApolloProvider>
  );
}
