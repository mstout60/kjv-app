"use server";

import prisma from "@/lib/db";
import { revalidatePath, unstable_noStore } from "next/cache";

export const getBook = async (bookId: number) => {
    unstable_noStore();
    const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: {
            chapters: true,
        },
    });
    //revalidatePath(`/books/${bookId}`, 'page');
    return book;
};

export const getBooks = async (testamentId: number) => {
    const books = await prisma.testament.findMany({
        where: { id: testamentId },
        include: {
            books: {
                orderBy: { id: "asc" },
            },
        },
    });

    return books;
}

export const getAllBooks = async () => {
    const books = await prisma.book.findMany({
        select: { id: true },
        orderBy: { id: "asc" },
    });

    return books;
}

export const getBookWithChapters = async (bookId: number) => {
    const response = await prisma.book.findMany({
        where: {
            id: bookId
        },
        include: { chapters: true }
    });

    return response;
}

export const getChapterWithVerses = async (chapterId: number, chapterIdx: number) => {
    const response = await prisma.chapter.findUnique({
        where: {
            id: chapterId
        },
        include: {
            verses: {
                where: {
                    chapterIdx: chapterIdx
                },
            },
        },
    });

    return response;
}

export const getVerseByChapterAndIndex = async (chapterId: number, chapterIdx: number) => {
    const response = await prisma.verse.findUnique({
        where: {
            verse_chapter_idx: {
                chapterId: chapterId,
                chapterIdx: chapterIdx,
            },
        },
        select: {
            id: true
        },
    });
    return response;
}

export const getScriptByVerse = async (verseId: number) => {
    const response = await prisma.verse.findMany({
        where: {
            id: verseId
        },
        include: {
            scripts: {
                orderBy: {
                    verseIdx: 'asc'
                },
            },
        },
    });

    return response;
}

export async function searchScriptCount(query: string) {
 const searchCount = await prisma.script.count({
    where: {
        script: {
            search: query,
        },
    },
 });

 return searchCount;
};

export async function searchScript(query: string, page: number, limit: number) {

    const skip = (page - 1) * limit;
    const take = limit;
    const results = await prisma.script.findMany({
        take,
        skip,
        where: {
            script: {
                search: query
            },
        },
        select: {
            chapterIdx: true,
            verseIdx: true,
            script: true,
            id: true,
            verse: {
                select: {
                    id: true,
                    chapter: {
                        select: {
                            id: true,
                            book: {
                                select: {
                                    id: true,
                                    displayName: true,
                                    abbreviation: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return results;
}