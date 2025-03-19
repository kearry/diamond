// src/app/api/auth/session/route.ts
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        return NextResponse.json(session || { user: null });
    } catch (error) {
        console.error("Session route error:", error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}

// NextAuth also uses POST for session
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        return NextResponse.json(session || { user: null });
    } catch (error) {
        console.error("Session route error (POST):", error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}