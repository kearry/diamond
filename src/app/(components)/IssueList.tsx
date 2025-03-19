// src/app/(components)/IssueList.tsx
"use client"

import React, { useEffect, useState } from 'react';
import { Issue } from '@/types/diamond';
import IssueDetails from './IssueDetails';
import { useSearchParams } from 'next/navigation';

const IssueList: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const searchParams = useSearchParams();
    const repoId = searchParams.get("repoId")

    useEffect(() => {
        const fetchIssues = async () => {
            if (!repoId) return;
            try {
                const response = await fetch(`/api/diamond/issues?repoId=${repoId}`);
                if (response.ok) {
                    const data = await response.json();
                    setIssues(data);
                } else {
                    console.error('Failed to fetch issues');
                }
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, [repoId]);


    return (
        <div>
            {issues.map((issue) => (
                <IssueDetails key={issue.id} issue={issue} />
            ))}
        </div>
    );
};

export default IssueList;