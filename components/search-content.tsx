"use client";

import Link from "next/link";
import {  useSearchParams } from "next/navigation";

import { ContentNotFound } from "./content-not-found";
import { SearchScript } from "@/lib/types";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchContentProps {
    currentPage: number;
    searchCount: number;
    totalPages: number;
    results: SearchScript;
}

export default function SearchContent({
    currentPage,
    searchCount,
    totalPages,
    results,
}: SearchContentProps) {
    const searchParam = useSearchParams();
    const highlight = searchParam.get('query') as string;
    const query = searchParam.get('query') as string;
    const page = Number(searchParam.get('page'));
    const limit = Number(searchParam.get('limit'));

    if ((results == undefined || !results[0])) return <ContentNotFound />;

    return (
        <div className='w-full mx-auto px-4 sm:pl-[5%] md:pl-[5%]'>
            <div className="flex items-start justify-between text-lg font-semibold text-muted-foreground p-2">
                {searchCount} instances - Pages {Math.ceil(totalPages)}
            </div>
            {results.map((result) => (
                <div className='mb-8 max-w-4xl' key={result.id}>
                    <div className='group flex flex-col'>
                        <Link
                            href={`/books/${result.verse?.chapter?.book?.id}/chapters/${result.verse?.chapter?.id}/verses/${result.verse?.id}/scripts/${result.id}`}
                            className='group-hover:underline decoration-blue-800 text-xl truncate font-medium text-blue-800'
                        >
                            {result.verse?.chapter?.book?.displayName}{" "}{result.chapterIdx}{":"}{result.verseIdx}
                        </Link>
                    </div>
                    <p className='text-gray-600'>{getHighlightedText(result.script, highlight)}</p>
                </div>
            ))}
            <div className="text-sm font-semibold text-muted-foreground">
                Page {page} of {Math.ceil(totalPages)}
            </div>
            <Pagination>
                <PaginationContent >
                    <PaginationItem>
                        <PaginationPrevious href={`/search?query=${encodeURIComponent(query)}&page=${page === 1 ? 1 : page - 1}&limit=${limit}`} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={currentPage == Math.ceil(totalPages)}
                            href={`/search?query=${encodeURIComponent(query)}&page=${page + 1}&limit=${limit}`}
                            className={
                                currentPage === Math.ceil(totalPages)
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}

function getHighlightedText(text: string, highlight: string,) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) => (
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {}} >
                    {part}
                </span>)
            )}
        </span>
    );
}