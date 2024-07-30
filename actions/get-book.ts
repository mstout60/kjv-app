"use server";

import prisma from "@/lib/db";
import { book } from "@prisma/client";

export const getBook = async ({
    bookId
}: {
    bookId: number;
}): Promise<book | null> => {
    const Book = await prisma.book.findUnique({
        select: {
            name: true,
            displayName: true,
        },
        where: {
            id: bookId,
        },
    });

    if (!Book) {
        return null;
    }

    return Book as book;
};