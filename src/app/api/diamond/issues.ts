// src/app/api/diamond/issues.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDiamondIssues, resolveIssue, getIssueStats } from '@/lib/diamond-api';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';


// GET /api/diamond/issues?repoId=...  (Fetch issues for a repository)
export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const repoId = searchParams.get('repoId');

    if (!repoId) {
        return NextResponse.json({ error: "Missing repoId parameter" }, { status: 400 });
    }

    try {
        // Check if the repository exists and belongs to the user
        const repository = await prisma.repository.findUnique({
            where: { githubId: repoId, userId: user.id },
        });

        if (!repository) {
            return NextResponse.json({ error: "Repository not found or access denied" }, { status: 404 });
        }

        // Fetch issues (either from Prisma or your AI service)
        const issues = await getDiamondIssues(repoId);

        return NextResponse.json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
    }
}


// POST /api/diamond/issues  (Create a new issue - in a real app)
// You'd likely receive issue data from a webhook, not a direct POST from the frontend.
export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // ... (Implementation for creating issues - likely from a webhook)
    // This would involve receiving data from your AI service (e.g., via a webhook)
    // and saving it to your database using Prisma.  You'd need to parse the
    // data from the AI service and map it to your Issue model.
    try {
        const data = await request.json();

        // Basic validation (add more as needed)
        if (!data.repositoryId || !data.type || !data.description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if the repository exists and belongs to the user
        const repository = await prisma.repository.findUnique({
            where: { id: data.repositoryId, userId: user.id },
        });

        if (!repository) {
            return NextResponse.json({ error: 'Repository not found or access denied' }, { status: 404 });
        }
        const newIssue = await prisma.issue.create({
            data: {
                ...data,
                userId: user.id, // Associate the issue with the current user
            },
        });
        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating issues:", error);
        return NextResponse.json({ error: "Failed to create issues" }, { status: 500 });
    }

}

// PATCH /api/diamond/issues/:id  (Update an issue - e.g., mark as resolved)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const issueId = params.id;
    const { resolved } = await request.json(); // Get updated data

    try {
        const updatedIssue = await prisma.issue.update({
            where: { id: issueId, userId: user.id },
            data: { resolved },
        });

        return NextResponse.json(updatedIssue);
    } catch (error) {
        console.error("Error updating issue:", error);
        return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
    }
}

// GET /api/diamond/stats?repoId=... (Fetch issue statistics)
export async function GET_STATS(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const searchParams = request.nextUrl.searchParams;
    const repoId = searchParams.get('repoId');

    if (!repoId) {
        return NextResponse.json({ error: "Missing repoId parameter" }, { status: 400 });
    }
    try {
        const repository = await prisma.repository.findUnique({
            where: { githubId: repoId, userId: user.id },
        });

        if (!repository) {
            return NextResponse.json({ error: "Repository not found or access denied" }, { status: 404 });
        }

        const stats = await getIssueStats(repoId);
        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}