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
import { revalidatePath } from "next/cache";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
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

        //router.prefetch(`/books/${selectedBookId}`, {kind: PrefetchKind.FULL} );
        router.push(`/books/${selectedBookId}`)
        // router.replace(`/books/${selectedBookId}`)
        // router.refresh();
    }, [selectedBookId]);

    const handleSelectedBook = (value: string) => {
        //revalidatePath(`/books/${value}`)
        //router.prefetch(`/books/${value}`, { kind: PrefetchKind.FULL });

        setSelectedBookId(value);
        //router.refresh();
        // router.push(`/books/${value}`);
        // router.refresh();

    }


    return (
        <div className="ml-4 mb-4 mt-4">
            <Select
                value={selectedBookId}
                onValueChange={handleSelectedBook}

            //defaultValue={selectedBookId}
            // defaultOpen={true}

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