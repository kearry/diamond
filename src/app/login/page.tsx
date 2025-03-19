"use client";

import { signIn } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [isLoading, setIsLoading] = useState(false);

    // Check for error in URL
    const error = searchParams.get("error");

    // Redirect to account linking page for specific error
    useEffect(() => {
        if (error === "OAuthAccountNotLinked") {
            router.push("/account-linking");
        }
    }, [error, router]);

    const handleSignIn = async (provider: string) => {
        setIsLoading(true);
        try {
            // Don't await this - let NextAuth handle the redirect
            signIn(provider, { callbackUrl });
        } catch (error) {
            console.error("Sign in error:", error);
            setIsLoading(false);
        }
    };

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
        Configuration: "There is a problem with the server configuration.",
        AccessDenied: "You do not have permission to sign in.",
        Verification: "The verification link may have been used or is invalid.",
        OAuthSignin: "Error connecting to authentication provider.",
        OAuthCallback: "Error with the authentication callback.",
        OAuthCreateAccount: "Error creating account with this provider.",
        EmailCreateAccount: "Error creating email account.",
        Callback: "Error during authentication.",
        OAuthAccountNotLinked: "This email is already associated with another account.",
        EmailSignin: "Error sending sign in email.",
        CredentialsSignin: "Invalid credentials.",
        SessionRequired: "Please sign in to access this page.",
        default: "An authentication error occurred."
    };

    const errorMessage = error ? (errorMessages[error] || errorMessages.default) : "";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl">Diamond: AI Code Reviewer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Sign in to continue to the dashboard</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Button
                            onClick={() => handleSignIn('github')}
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Connecting..." : "Sign in with GitHub"}
                        </Button>

                        <Button
                            onClick={() => handleSignIn('google')}
                            variant="outline"
                            className="w-full"
                            disabled={isLoading}
                        >
                            Sign in with Google
                        </Button>

                        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-700">
                            <p>Make sure your <code>.env.local</code> file contains valid OAuth credentials.</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 justify-between">
                    <p>Need help? Check the NextAuth.js docs</p>
                    <Link href="/test-auth" className="text-blue-500 hover:underline">Test Auth</Link>
                </CardFooter>
            </Card>
        </div>
    );
}