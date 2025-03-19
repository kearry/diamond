// types/diamond.ts
export interface Issue {
    id: string;
    repositoryId: string; // Add a repository ID
    userId: string;
    type: string;
    description: string;
    codeSnippet?: string;
    lineNumberStart?: number;
    lineNumberEnd?: number;
    createdAt: Date;
    updatedAt: Date;
    resolved: boolean;
    comments: Comment[]
}

export interface Comment {
    id: string;
    issueId: string;
    userId: string;
    text: string;
    createdAt: Date
}