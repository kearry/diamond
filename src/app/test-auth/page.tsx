"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function TestAuth() {
    const { data: session, status, update } = useSession();

    useEffect(() => {
        // Force session refresh
        const refreshSession = async () => {
            if (status === "authenticated") {
                await update();
                console.log("Session refreshed");
            }
        };

        refreshSession();
    }, [status, update]);

    // Debug info
    useEffect(() => {
        console.log("Auth Status:", status);
        console.log("Session Data:", session);
    }, [session, status]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">NextAuth.js Test Page</h1>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
                <p className="mb-2"><strong>Status:</strong> {status}</p>

                {session?.user ? (
                    <div className="mt-4">
                        <p className="mb-2"><strong>Signed in as:</strong> {session.user.name || 'User'}</p>
                        <p className="mb-2"><strong>Email:</strong> {session.user.email || 'Not available'}</p>
                        <p className="mb-2"><strong>User ID:</strong> {session.user.id || 'Not available'}</p>

                        <pre className="bg-gray-100 p-4 rounded mt-4 overflow-auto max-h-40 text-xs">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <p className="mt-4">You are not signed in</p>
                )}

                <div className="mt-6 space-y-2">
                    {session?.user ? (
                        <Button
                            onClick={() => {
                                console.log("Signing out...");
                                signOut({ callbackUrl: '/test-auth' });
                            }}
                            className="w-full"
                            variant="destructive"
                        >
                            Sign out
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    console.log("Signing in with GitHub...");
                                    signIn('github', { callbackUrl: '/test-auth' });
                                }}
                                className="w-full"
                            >
                                Sign in with GitHub
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log("Signing in with Google...");
                                    signIn('google', { callbackUrl: '/test-auth' });
                                }}
                                className="w-full mt-2"
                                variant="outline"
                            >
                                Sign in with Google
                            </Button>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm">
                                <p><strong>Note:</strong> Make sure you&apos;ve properly configured your OAuth credentials in <code>.env.local</code></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}