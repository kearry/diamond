// src/app/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config({ path: '.env' }); // Explicitly load .env

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL); // Debugging line

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions)