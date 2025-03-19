// src/app/dashboard/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import IssueBarChart from '../(components)/IssueBarChart';
import IssueList from '../(components)/IssueList';
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const DashboardPage = () => {
    const [repositories, setRepositories] = useState<any[]>([]); // Use 'any' temporarily
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [stats, setStats] = useState<any>(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [repoName, setRepoName] = useState("");
    const [repoId, setRepoId] = useState("");
    const { toast } = useToast()


    useEffect(() => {
        // Redirect to login if not authenticated
        if (status === "unauthenticated") {
            router.push("/api/auth/signin"); // Redirect to NextAuth.js sign-in page
        }

        const fetchRepositories = async () => {
            if (session?.user) {
                try {
                    const response = await fetch('/api/diamond/repos');
                    if (response.ok) {
                        const data = await response.json();
                        setRepositories(data);
                        // If there's a selected repo in the query params, set it
                        if (data.length > 0) {
                            setSelectedRepo(data[0].githubId); // Default to the first repo
                        }

                    } else {
                        console.error('Failed to fetch repositories');
                    }
                } catch (error) {
                    console.error('Error fetching repositories:', error);
                }
            }
        };
        fetchRepositories();

    }, [session, status, router]);


    useEffect(() => {
        const fetchStats = async () => {
            if (selectedRepo) {
                try {
                    const response = await fetch(
                        `/api/diamond/issues/stats?repoId=${selectedRepo}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setStats(data);
                    } else {
                        console.error("Failed to fetch stats");
                        setStats(null); // Clear stats if fetch fails
                    }
                } catch (error) {
                    console.error("Error fetching stats:", error);
                    setStats(null); // Clear stats on error
                }
            } else {
                setStats(null); // Clear stats if no repo is selected
            }
        };

        fetchStats();
    }, [selectedRepo]);


    const handleAddRepository = async () => {
        try {
            const response = await fetch('/api/diamond/repos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: repoName, githubId: repoId }),
            });

            if (response.ok) {
                // Refresh the list of repositories
                const reposResponse = await fetch('/api/diamond/repos');
                if (reposResponse.ok) {
                    const updatedRepos = await reposResponse.json();
                    setRepositories(updatedRepos);
                }
                toast({
                    title: "Repository added",
                    description: "The repository has been added successfully.",
                });
                setOpen(false); // Close dialog on success

            } else {
                const errorData = await response.json();
                console.error('Failed to add repository:', errorData.error);
                toast({
                    title: "Error",
                    description: `Failed to add repository: ${errorData.error}`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error adding repository:', error);
        }
    };


    if (status === "loading") {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Repository
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Repository</DialogTitle>
                            <DialogDescription>
                                Enter the details of the GitHub repository you want to add.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Repository Name"
                                    value={repoName}
                                    onChange={(e) => setRepoName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    GitHub ID
                                </Label>
                                <Input
                                    id="repoId"
                                    placeholder="Repository ID (e.g., owner/repo)"
                                    value={repoId}
                                    onChange={(e) => setRepoId(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="button" onClick={handleAddRepository}>
                                Add
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Repository Dropdown */}
            <div className="mb-4">
                <select
                    value={selectedRepo || ""}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="" disabled>
                        Select a Repository
                    </option>
                    {repositories.map((repo) => (
                        <option key={repo.id} value={repo.githubId}>
                            {repo.name} ({repo.githubId})
                        </option>
                    ))}
                </select>
            </div>

            {/* Issue Summary (Bar Chart) */}
            {stats && (
                <div className="mb-4 p-4 border rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Issue Summary</h2>
                    <IssueBarChart stats={stats} />
                    <div className="mt-2">
                        <p>
                            <strong>{stats.counts.total}</strong> issues found
                        </p>
                        {/* Add more summary stats here if needed */}
                    </div>
                </div>
            )}

            {/* Issue List */}
            {selectedRepo && (
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Issues</h2>
                    <IssueList />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;