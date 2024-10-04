"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Books } from "@/lib/types"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { getBookByName, getChaptersByBookId, getVerseByChapterAndIndex } from "@/lib/query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { UserButton } from "@clerk/nextjs";
import { useAuth } from '@clerk/clerk-react'
import Link from "next/link";

type Props = {
    oldTestament: Books[];
    newTestament: Books[];
}

const SearchNav = ({ oldTestament, newTestament }: Props) => {
    const { isSignedIn, sessionId, userId } = useAuth();

    const params = useParams();
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const limit = 10;
    const [page, setPage] = useState(1);
    const [selectedBookId, setSelectedBookId] = useState(JSON.stringify(params) === '{}' ? oldTestament[0].books[0].id.toString() : params.id.toString())

    const inputRef = useRef<HTMLInputElement>(null);
    const [isSearching, startTransition] = useTransition();

    useEffect(() => {
        router.push(`/books/${selectedBookId}`)
    }, [router, selectedBookId]);

    const search = () => {
        var querySplit = query.split(":");

        if (querySplit.length > 1) {
            return getBookWithChapterAndVerse(querySplit, router);
        }

        startTransition(() => {
            router.push(`/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
            //setPage(page + 1);
        });
    };

    return (
        <>
            <div className="ml-4 mt-4 mb-4  w-full h-10 flex items-center justify-between">
                <div className="mr-6 relative h-10 z-10 rounded-md">
                    <Input
                        disabled={isSearching}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search();
                            }

                            if (e.key === 'Escape') {
                                inputRef?.current?.blur()
                            }
                        }}
                        ref={inputRef}
                        className=" inset-0 w-[320px]" />
                    <Button
                        disabled={isSearching}
                        onClick={search}
                        size="sm"
                        className="absolute right-0 inset-y-0 h-full rounded-l-none"
                    >
                        {isSearching ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
                    </Button>
                </div>
                <Select
                    value={JSON.stringify(params) === '{}' ? selectedBookId : params.id.toString()}
                    onValueChange={value => setSelectedBookId(value)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>--- Old Testament ---</SelectLabel>
                            {oldTestament[0].books.map((book) => (
                                <SelectItem key={book.id} value={book.id.toString()}>{book.displayName}</SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>--- New Testament ---</SelectLabel>
                            {newTestament[0].books.map((book) => (
                                <SelectItem key={book.id} value={book.id.toString()}>{book.displayName}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {!userId && (
                    <Link href="/sign-in" className="text-black hover:text-gray-700 mr-6 px-2">
                        Sign-in
                    </Link>
                )}
                {userId && (
                    <div className="mr-6 relative h-10 z-10 rounded-md px-2">
                        <UserButton />
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchNav;

const getBookWithChapterAndVerse = async (querySplit: any, router: AppRouterInstance) => {
    var scriptIdx = Number(querySplit[1]) - 1;
    var redirect = querySplit[0].split(" ");
    var chapterIdx = 0;
    var bookName;
    if (redirect.length > 2) {
        chapterIdx = Number(redirect[2]);
        bookName = redirect[0] + " " + redirect[1];
    } else {
        bookName = redirect[0]
        chapterIdx = Number(redirect[1])
    }

    const bookId = await getBookByName(bookName);
    const chapterId = await getChaptersByBookId(bookId!.id);
    const verseId = await getVerseByChapterAndIndex(chapterId!.id, chapterIdx)

    return router.push(`/books/${bookId!.id}/chapters/${chapterId!.id}/verses/${verseId!.id}?scriptIdx=${scriptIdx}`);
}