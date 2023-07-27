import axios from "axios";
import { Token } from "graphql";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { api } from "src/getDoc/utils/api";
import { GetUserByEmailDocument, LoginUserDocument } from "src/gql/graphql";
import { client } from "src/service/client";

const options: NextAuthOptions = {
  // adapter: {}
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ account, token, user, profile }) {
      token = { ...token, ...user };
      // console.log(token)
      return token;
    },
    async session({ session, token, user }) {
      const userData = token as unknown as {
        grade: number;
        role: string;
        id: any;
      };

      if (userData?.grade && userData?.role) {
        Object.assign(session, {
          ...session,
          user: {
            email: token.email,
            name: token.name,
            id: userData.id,
            grade: userData.grade,
            role: userData.role,
          },
        });
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      if (!account) return false;
      if (account.provider === "google" && user.email) {
        try {
          const {
            data: {
              userByEmail: { gradeId, id, role },
            },
          } = await client.query({
            query: GetUserByEmailDocument,
            variables: {
              email: user.email,
            },
            fetchPolicy: "network-only",
          });
          Object.assign(user, { ...user, role, grade: gradeId, id });
        } catch (error) {
          return false;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  secret: "AAAA",
  session: { strategy: "jwt" },
  // debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const { data } = await client.query({
            query: LoginUserDocument,
            variables: {
              user: {
                email: credentials.email,
                password: credentials.password,
              },
            },
            fetchPolicy: "network-only",
          });
          return {
            id: data.login.id,
            email: data.login.email,
            name: data.login.name,
            role: data.login.role,
            grade: data.login.gradeId,
          };
        } catch (error) {
          return null;
        }
        // console.log(error)
        // return data
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export default NextAuth(options);
