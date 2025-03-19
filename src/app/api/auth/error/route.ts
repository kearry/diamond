// src/app/api/auth/error/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const error = searchParams.get("error");

    // Log the error
    console.error(`Authentication error: ${error}`);

    // Redirect to the login page with the error
    return NextResponse.redirect(
        new URL(`/login?error=${error || "unknown"}`, request.url)
    );
}