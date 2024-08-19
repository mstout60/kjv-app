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
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    oldTestament: Books[];
    newTestament: Books[];
}

const SearchNav = ({ oldTestament, newTestament }: Props) => {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const [selectedBookId, setSelectedBookId] = useState(JSON.stringify(params) === '{}' ? oldTestament[0].books[0].id.toString() : params.id.toString())

    //setSelectedBookId(params.id.toString())
    console.log("pathname", pathname, params.id)

    useEffect(() => {
        router.push(`/books/${selectedBookId}`)
    }, [router, selectedBookId]);

    // const handleSelectedBook = (value: string) => {
    //     setSelectedBookId(value);
    // }

    return (
        <div className="ml-4 mb-4 mt-4">
            <Select
                //value={selectedBookId}
                value={JSON.stringify(params) === '{}' ? selectedBookId : params.id.toString()}
                //onValueChange={handleSelectedBook}
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
        </div>
    )
}

export default SearchNav;