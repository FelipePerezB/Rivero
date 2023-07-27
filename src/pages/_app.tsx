import { ApolloProvider } from "@apollo/client";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "src/service/client";
// import { SessionProvider as AuthProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {/* <AuthProvider session={pageProps.session}> */}
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
      {/* </AuthProvider> */}
    </ApolloProvider>
  );
}
