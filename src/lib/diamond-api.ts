// lib/diamond-api.ts
import { Issue } from "@/types/diamond";
// Mocked data for demonstration purposes

const mockIssues: Issue[] = [
    {
        id: "1",
        type: "Logic bug",
        description: "Inverted access control logic.",
        codeSnippet: `
      hostId: host.id,
      });
      // Only enable if not blocked and within rollout percentage
      return !isOrgBlocked && Math.random() <
        agenticPipelineRolloutPercentage;
    `,
        lineNumberStart: 737,
        lineNumberEnd: 741,
        repositoryId: "repo1", // Add a repository ID
        userId: "user1",
        resolved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
    },
    {
        id: "2",
        type: "Performance issue",
        description: "Making many parallel API calls that could hit rate limits.",
        codeSnippet: `
      // LOGIC VIOLATION: Making many parallel API calls that could hit
      // rate limits
      const activationResults = await Promise.all(users.mapUser =>
          socialAssistant.getUserActivitiesUserSocially)
        );

      // The parallel API calls use Promise.all, potentially triggering rate limiting
    `,
        lineNumberStart: 36,
        lineNumberEnd: 40,
        repositoryId: "repo1", // Add a repository ID
        userId: "user1",
        resolved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
    },
    {
        id: "3",
        type: "Logic bug",
        description: "Change the port from 3000 to 8000",
        codeSnippet: `
       const express = require('express');
       const app = express();
       const port = 3000;
    `,
        lineNumberStart: 1,
        lineNumberEnd: 3,
        repositoryId: "repo1", // Add a repository ID
        userId: "user1",
        resolved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
    },
    // ... more mock issues ...
];

// Mock function to simulate fetching issues from the Diamond API
export async function getDiamondIssues(repositoryId: string): Promise<Issue[]> {
    // In a real application, you would make an API call here
    // to your AI code review service.
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    // Filter mock issues by repository ID
    return mockIssues.filter((issue) => issue.repositoryId === repositoryId);
}

// Mock function to get issue statistics
export async function getIssueStats(repositoryId: string) {
    const issues = await getDiamondIssues(repositoryId);

    const counts = {
        "Logic bug": 0,
        "Security issue": 0,
        "Accidentally committed code": 0,
        "Performance issue": 0,
        "Code quality/style": 0,
        "Documentation issue": 0,
        "Potential edge case": 0,
        total: issues.length,
    };

    issues.forEach(issue => {
        counts[issue.type as keyof typeof counts]++;
    });
    const percentages = Object.fromEntries(
        Object.entries(counts).map(([key, value]) => [
            key,
            counts.total > 0 ? ((value / counts.total) * 100).toFixed(1) : "0.0",
        ])
    );
    return { counts, percentages }

}

// Mock function to resolve an issue (in a real app, this would update the AI service)
export async function resolveIssue(issueId: string): Promise<void> {
    // Simulate resolving the issue
    await new Promise((resolve) => setTimeout(resolve, 200));
    const issueIndex = mockIssues.findIndex((issue) => issue.id === issueId);
    if (issueIndex !== -1) {
        mockIssues[issueIndex].resolved = true;
    }
}