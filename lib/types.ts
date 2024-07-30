import {
    book,
    Prisma
} from '@prisma/client';

import {
    getBooks,
    getBookWithChapters,
    getChapterWithVerses,
} from '@/lib/query';

export type Books = Prisma.PromiseReturnType<typeof getBooks>[0]

export type BookWithChapters = Prisma.PromiseReturnType<typeof getBookWithChapters>;

export type ChapterWithVerses = Prisma.PromiseReturnType<typeof getChapterWithVerses>;