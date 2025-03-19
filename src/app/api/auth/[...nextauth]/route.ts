// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt", // Using JWT for simplicity
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        // Add this new callback to allow linking accounts with the same email
        async signIn({ user, account, profile }) {
            // Allow all sign-ins
            return true;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    logger: {
        error(code, metadata) {
            console.error(`NextAuth error: ${code}`, metadata);
        },
        warn(code) {
            console.warn(`NextAuth warning: ${code}`);
        },
        debug(code, metadata) {
            console.log(`NextAuth debug: ${code}`, metadata);
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };