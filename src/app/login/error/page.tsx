"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AuthError() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
        Configuration: "There is a problem with the server configuration.",
        AccessDenied: "You do not have permission to sign in.",
        Verification: "The verification link may have been used or is invalid.",
        OAuthSignin: "Could not initiate sign in with OAuth provider.",
        OAuthCallback: "Error in OAuth callback.",
        OAuthCreateAccount: "Could not create OAuth account.",
        EmailCreateAccount: "Could not create email account.",
        Callback: "Error in authentication callback.",
        OAuthAccountNotLinked: "This email is already associated with another account.",
        EmailSignin: "Error sending email for sign in.",
        CredentialsSignin: "Sign in failed. Check your credentials.",
        SessionRequired: "Authentication required. Please sign in.",
        default: "An unexpected authentication error occurred."
    };

    const message = error && errorMessages[error] ? errorMessages[error] : errorMessages.default;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl text-red-600">Authentication Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
                        <p className="text-red-700">{message}</p>
                        {error && (
                            <p className="text-xs text-gray-500 mt-2">
                                Error code: {error}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            This could be due to:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mt-2">
                            <li>Invalid OAuth credentials in your environment variables</li>
                            <li>OAuth callback URL mismatch</li>
                            <li>Network connectivity issues</li>
                            <li>Server configuration problems</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/login">Return to login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/test-auth">Try test page</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}