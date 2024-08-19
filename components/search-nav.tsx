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
import { useEffect, useState } from "react";

type Props = {
    oldTestament: Books[];
    newTestament: Books[];
}

const SearchNav = ({ oldTestament, newTestament }: Props) => {
    const params = useParams();
    const router = useRouter();
    const [selectedBookId, setSelectedBookId] = useState(JSON.stringify(params) === '{}' ? oldTestament[0].books[0].id.toString() : params.id.toString())

    useEffect(() => {
        router.push(`/books/${selectedBookId}`)
    }, [router, selectedBookId]);

    const handleSelectedBook = (value: string) => {
        setSelectedBookId(value);
    }

    return (
        <div className="ml-4 mb-4 mt-4">
            <Select
                value={selectedBookId}
                onValueChange={handleSelectedBook}
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
        </div>
    )
}

export default SearchNav;