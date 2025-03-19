// src/app/api/debug/env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    // IMPORTANT: Only use this route for debugging during development!
    // Remove or secure this route before deployment

    // Check if critical environment variables are set (without revealing actual values)
    const envStatus = {
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?
            `Set (${process.env.NEXTAUTH_SECRET.length} chars)` : "Not set",
        GITHUB_ID: process.env.GITHUB_ID ? "Set" : "Not set",
        GITHUB_SECRET: process.env.GITHUB_SECRET ? "Set" : "Not set",
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set",
        DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
        NODE_ENV: process.env.NODE_ENV || "Not set",
    };

    // Only allow in development mode
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({
            error: "This endpoint is only available in development mode"
        }, { status: 403 });
    }

    return NextResponse.json({
        envStatus,
        serverInfo: {
            nodeVersion: process.version,
            platform: process.platform,
        }
    });
}