// src/app/(components)/IssueDetails.tsx  (Example)
"use client";

import { Issue } from '@/types/diamond';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast" // Import correctly


interface IssueDetailsProps {
    issue: Issue;
}


const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast()  // Destructure toast

    const handleResolve = async () => {
        // Call your API to mark the issue as resolved
        try {
            const response = await fetch(`/api/diamond/issues/${issue.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resolved: true }),
            });

            if (response.ok) {
                // Update your UI (e.g., refetch issues, update state)
                console.log('Issue resolved successfully');
                toast({ // Call the toast function
                    title: "Issue resolved",
                    description: "The issue has been marked as resolved.",
                    variant: "default",
                })
                setDialogOpen(false) //close the dialog
            } else {
                const errorData = await response.json();
                console.error("Failed to resolve issue:", errorData.error)
                toast({
                    title: "Error resolving issue",
                    description: `Something went wrong: ${errorData.error}`,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Error resolving issue:', error);
            toast({
                title: "Error resolving issue",
                description: "Something went wrong: ",
                variant: "destructive",
            })

        }
    };


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full text-left">
                    <div className="flex justify-between w-full">
                        <div>{issue.description}</div>
                        <Badge variant="outline">{issue.type}</Badge>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{issue.type}</DialogTitle>
                    <DialogDescription>
                        {issue.description}
                        {issue.codeSnippet && (
                            <pre className="bg-gray-100 p-2 rounded mt-2">
                                <code>{issue.codeSnippet}</code>
                            </pre>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleResolve}>Resolve</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default IssueDetails;