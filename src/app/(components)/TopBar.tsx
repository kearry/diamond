"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function TopBar() {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log("TopBar - Session status:", status);
        console.log("TopBar - Session data:", session);
    }, [session, status]);

    const handleSignOut = () => {
        console.log("Sign out clicked");
        signOut({ callbackUrl: '/login' });
    };

    const handleSignIn = () => {
        console.log("Sign in clicked");
        signIn('github', { callbackUrl: '/dashboard' });
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
            <div className="font-bold text-lg">Diamond: AI Code Reviewer</div>
            <div>
                {session?.user ? (
                    <>
                        <span className="mr-4">Logged in as {session.user.name || 'User'}</span>
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="hover:bg-red-50"
                        >
                            Sign out
                        </Button>
                    </>
                ) : (
                    <>
                        <span className="mr-4">Not signed in</span>
                        <Button
                            variant="outline"
                            onClick={handleSignIn}
                            className="hover:bg-blue-50"
                        >
                            Sign in
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopBar;