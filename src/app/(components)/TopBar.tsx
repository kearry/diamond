// src/app/(components)/TopBar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

function TopBar() {
    const { data: session } = useSession()
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
            <div className="font-bold text-lg">Diamond: AI Code Reviewer</div>
            <div>
                {session?.user ? (
                    <>
                        <span className="mr-4">Logged in as {session.user.name}</span>
                        <Button variant={"outline"} onClick={() => signOut()}>Sign out</Button>
                    </>
                ) : (
                    <Button variant={"outline"} onClick={() => signIn()}>Sign in</Button>
                )}
            </div>
        </div>
    );
}

export default TopBar;