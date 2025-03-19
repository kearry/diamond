"use client";

import { signIn } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AccountLinkingPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const provider = searchParams.get("provider") || "the other";

    const handleSignIn = (provider: string) => {
        signIn(provider, { callbackUrl: "/dashboard" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="text-xl">Account Linking Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-4">
                        <p className="text-amber-800">
                            The email address <strong>{email}</strong> is already associated with {provider} account,
                            but you're trying to sign in with a different provider.
                        </p>
                    </div>

                    <p className="mb-4">
                        To continue, you can:
                    </p>

                    <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Sign in with the original provider you used previously</li>
                        <li>Sign in with a different email address</li>
                        <li>We've updated our system to allow signing in with multiple providers using the same email address - try again</li>
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button
                        className="w-full"
                        onClick={() => handleSignIn('github')}
                    >
                        Try Again with GitHub
                    </Button>
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => handleSignIn('google')}
                    >
                        Try Again with Google
                    </Button>
                    <Link href="/login" className="text-sm text-blue-500 mt-2">
                        Return to login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}