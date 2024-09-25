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
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";

type Props = {
    oldTestament: Books[];
    newTestament: Books[];
}

const SearchNav = ({ oldTestament, newTestament }: Props) => {
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
        startTransition(() => {
            router.push(`/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
            //setPage(page + 1);
        });
    }

    return (
        <>
            <div className="ml-4 mt-4 mb-4  w-full h-10 flex items-center justify-between">
                <Select
                    value={JSON.stringify(params) === '{}' ? selectedBookId : params.id.toString()}
                    onValueChange={value => setSelectedBookId(value)}
                >
                    <SelectTrigger className="w-[280px]">
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
                <div className="mr-6 relative h-10 z-10 rounded-md">
                    {/* <Input  placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} /> */}
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
                        className=" inset-0 w-[280px]" />
                    <Button
                        disabled={isSearching}
                        onClick={search}
                        size="sm"
                        className="absolute right-0 inset-y-0 h-full rounded-l-none"
                    >
                        {isSearching ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

        </>
    )
}

export default SearchNav;