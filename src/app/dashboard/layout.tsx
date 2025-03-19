// src/app/dashboard/layout.tsx
import Sidebar from '../(components)/Sidebar';
import TopBar from '../(components)/TopBar';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"  // Import Toaster


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/api/auth/signin")
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
            <Toaster />
        </div>
    );
}