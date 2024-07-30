import {
    book,
    Prisma
} from '@prisma/client';

import {
    getBooks,
    getBookWithChapters,
} from '@/lib/query';

export type Books = Prisma.PromiseReturnType<typeof getBooks>[0]

export type BookWithChapters = Prisma.PromiseReturnType<typeof getBookWithChapters>;