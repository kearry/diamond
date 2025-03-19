// src/app/api/auth/providers/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        github: {
            id: "github",
            name: "GitHub",
            type: "oauth",
            signinUrl: `/api/auth/signin/github`,
            callbackUrl: `/api/auth/callback/github`
        },
        google: {
            id: "google",
            name: "Google",
            type: "oauth",
            signinUrl: `/api/auth/signin/google`,
            callbackUrl: `/api/auth/callback/google`
        }
    });
}

export async function POST() {
    // Support for POST method if needed
    return NextResponse.json({
        github: {
            id: "github",
            name: "GitHub",
            type: "oauth",
            signinUrl: `/api/auth/signin/github`,
            callbackUrl: `/api/auth/callback/github`
        },
        google: {
            id: "google",
            name: "Google",
            type: "oauth",
            signinUrl: `/api/auth/signin/google`,
            callbackUrl: `/api/auth/callback/google`
        }
    });
}