import prisma from "@/app/lib/prisma";
import { placeholderData } from "./placeholder-data";
import { ComplexitySupportDB } from "@/types";

async function createUsers() {    
    for (const user of placeholderData.User) {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { id: user.id }
            });
        
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }
                });
            }
        } catch (error) {
            console.error(`Error creating user ${user.id}:`, error);
            throw error;
        }
    }
}

async function createSnippets() {    
    for (const snippet of placeholderData.Snippet) {
        try {
            const existingSnippet = await prisma.snippet.findUnique({
                where: { id: snippet.id }
            });
            if (!existingSnippet) {
                await prisma.snippet.create({
                    data: {
                        id: snippet.id,
                        title: snippet.title,
                        description: snippet.description,
                        code: snippet.code,
                        createdAt: snippet.createdAt,
                        language: snippet.language,
                        languageVersion: snippet.languageVersion,
                        complexity: (ComplexitySupportDB as any)[snippet.complexity],
                        userId: snippet.userId
                    }
                });
            }
        } catch (error) {
            console.error(`Error creating snippet ${snippet.id}:`, error);
            throw error;
        }
    }
}

async function createDependencies() {    
    for (const dependency of placeholderData.Dependency) {
        try {
            const existingDependency = await prisma.dependency.findUnique({
                where: { id: dependency.id }
            });
            if (!existingDependency) {
                await prisma.dependency.create({
                    data: {
                        id: dependency.id,
                        name: dependency.name,
                        snippetId: dependency.snippetId
                    }
                });
            }
        } catch (error) {
            console.error(`Error creating dependency ${dependency.id}:`, error);
            throw error;
        }
    }
}

async function createKeywords() {    
    for (const keyword of placeholderData.Keyword) {
        try {
            const existingKeyword = await prisma.keyword.findUnique({
                where: { id: keyword.id }
            });
            if (!existingKeyword) {
                await prisma.keyword.create({
                    data: {
                        id: keyword.id,
                        name: keyword.name,
                        snippetId: keyword.snippetId
                    }
                });
            }
        } catch (error) {
            console.error(`Error creating keyword ${keyword.id}:`, error);
            throw error;
        }
    }
}

async function createVotes() {    
    for (const vote of placeholderData.Vote) {
        try {
            const existingVote = await prisma.vote.findUnique({
                where: { id: vote.id }
            });
            if (!existingVote) {
                await prisma.vote.create({
                    data: {
                        id: vote.id,
                        vote: vote.vote,
                        snippetId: vote.snippetId,
                        userId: vote.userId
                    }
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

export async function GET() {
    try {        
        // console.log('🧹 Cleaning existing data...');
        // await prisma.vote.deleteMany({});
        await prisma.keyword.deleteMany({});
        await prisma.dependency.deleteMany({});
        await prisma.snippet.deleteMany({});
        await prisma.user.deleteMany({});
        
        await createUsers();
        await createSnippets();
        await createDependencies();
        await createKeywords();
        await createVotes();
        
        console.log('✅ Database seeded successfully');
        return Response.json({ 
            message: 'Database seeded successfully',
            counts: {
                users: placeholderData.User.length,
                snippets: placeholderData.Snippet.length,
                dependencies: placeholderData.Dependency.length,
                keywords: placeholderData.Keyword.length,
                votes: placeholderData.Vote.length
            }
        });
        
    } catch (error) {
        console.error('Error seeding database:', error);
        return Response.json({ 
            error: error.message,
            details: error 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}