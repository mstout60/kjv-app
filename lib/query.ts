"use server";

import prisma from "@/lib/db";

export const getBook = async (bookId: number) => {
    const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: {
            chapters: true,
        },
    });
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