// src/app/api/diamond/repos.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET /api/diamond/repos (Fetch repositories for the current user)
export async function GET(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const repositories = await prisma.repository.findMany({
            where: { userId: user.id },
        });
        return NextResponse.json(repositories);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
    }
}
// POST /api/diamond/repos (Add a new repository)
export async function POST(request: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        const { name, githubId } = await request.json();

        // Check if the repository already exists
        const existingRepo = await prisma.repository.findUnique({
            where: { githubId: githubId },
        });

        if (existingRepo) {
            return NextResponse.json({ error: 'Repository already exists' }, { status: 409 });
        }

        const newRepository = await prisma.repository.create({
            data: {
                name,
                githubId,
                userId: user.id,
            },
        });

        return NextResponse.json(newRepository, { status: 201 });
    } catch (error) {
        console.error('Error adding repository:', error);
        return NextResponse.json({ error: 'Failed to add repository' }, { status: 500 });
    }
}

// PATCH /api/diamond/repos/:id (Update repository settings, e.g., enable/disable)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const repoId = params.id;
    const { isEnabled } = await request.json();

    try {
        const updatedRepo = await prisma.repository.update({
            where: { id: repoId, userId: user.id },
            data: { isEnabled },
        });
        return NextResponse.json(updatedRepo);
    } catch (error) {
        console.error("Error updating repository:", error);
        return NextResponse.json({ error: "Failed to update repository" }, { status: 500 });
    }
}