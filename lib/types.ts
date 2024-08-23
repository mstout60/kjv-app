import {
    book,
    Prisma
} from '@prisma/client';

import {
    getAllBooks,
    getBooks,
    getBookWithChapters,
    getChapterWithVerses,
    getScriptByVerse,
    getVerseByChapterAndIndex,
    searchScript,
} from '@/lib/query';

export type Books = Prisma.PromiseReturnType<typeof getBooks>[0];

export type AllBooks = Prisma.PromiseReturnType<typeof getAllBooks>[0];

export type BookWithChapters = Prisma.PromiseReturnType<typeof getBookWithChapters>;

export type ChapterWithVerses = Prisma.PromiseReturnType<typeof getChapterWithVerses>;

export type VereseWithScripts = Prisma.PromiseReturnType<typeof getScriptByVerse>

export type VerseByChapterAndIndex = Prisma.PromiseReturnType<typeof getVerseByChapterAndIndex>

export type SearchScript = Prisma.PromiseReturnType<typeof searchScript>;