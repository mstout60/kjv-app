"use server";

import prisma from "@/lib/db";

export const getBooks = async ({
    testamentId
}: {
    testamentId: number;
}) => {
    const Books = await prisma.testament.findMany({
        select: {
            name: true,
            id: true,
            books: {
                orderBy: {
                    id: "asc"
                }
            }
        },
        where: {
            id: testamentId,
        }
    });

    return Books;
};
