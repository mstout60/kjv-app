"use server";

import prisma from "@/lib/db";

export const getBook = async (bookId: number) => {
    const book = await prisma.book.findUnique({
        where: { id: bookId }
    });
    return book;
};

export const getBooks = async (testamentId: number) => {
    const books = await prisma.testament.findMany({
        where: { id: testamentId },
        include: {
            books: {
                orderBy: { id: "asc" },
            }
        },
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