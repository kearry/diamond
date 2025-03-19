"use client";

import Sidebar from '../(components)/Sidebar';
import TopBar from '../(components)/TopBar';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log("Dashboard layout - Auth status:", status);

        // Only redirect if we're definitely not authenticated
        if (status === "unauthenticated") {
            console.log("Not authenticated, redirecting to login");
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}