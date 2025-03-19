// lib/auth.ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user;
}