"use server";

import prisma from "@/lib/db";

export const getBook = async ({
    bookId
}: {
    bookId: number;
}) => {
    const Book = await prisma.book.findUnique({
        select: {
            name: true,
            displayName: true,
        },
        where: {
            id: bookId,
        }

    });

    return Book;
};