"use client";

import { useRef } from "react";
import { ContentNotFound } from "./content-not-found";
import { SearchScript } from "@/lib/types";
import Parser from "html-react-parser";

import { ContentLoading } from "./content-loading";
import Typography from "./ui/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function SearchContent({ results }: { results: SearchScript }) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const searchParam = useSearchParams();
    const highlight = searchParam.get('query') as string;

    if ((results == undefined || !results[0])) return <ContentNotFound />;

    return (
        <div className='w-full mx-auto px-4 sm:pl-[5%] md:pl-[5%]'>
            {results.map((result) => (
                <div className='mb-8 max-w-xl' key={result.id}>
                    <div className='group flex flex-col'>
                        {/* <Link href={result.}>{result.formattedUrl}</Link> */}
                        <Link
                            href={`/books/${result.verse?.chapter?.book?.id}/chapters/${result.verse?.chapter?.id}/verses/${result.verse?.id}`}
                            className='group-hover:underline decoration-blue-800 text-xl truncate font-medium text-blue-800'
                        >
                            {result.verse?.chapter?.book?.displayName}{" "}{result.chapterIdx}{":"}{result.verseIdx}
                        </Link>
                    </div>
                    <p className='text-gray-600'>{getHighlightedText(result.script, highlight)}</p>
                </div>
            ))}
            {/* <PaginationButtons /> */}
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