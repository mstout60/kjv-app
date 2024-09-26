import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useGetBook } from "@/hooks/use-get-book";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";


interface HeaderProps {
    bookId: number;
    chapterId: number;
    verseId: number;
    chapter: number;
    verse: number;
    script: string;
};

export const Header = async ({
    bookId,
    chapterId,
    verseId,
    chapter,
    verse,
    script,
}: HeaderProps) => {
    const book = await useGetBook({ id: bookId });

    let displayText = book?.displayName + " " + chapter + ":" + verse;

    return (
        <div className="flex flex-col w-full">
            <div className="flex p-2 cursor-pointer text-sm font-semibold text-muted-foreground"> <ArrowLeftIcon className="size-6" /><BackButton backText="Back to search" /> </div>
            <div className="flex items-center justify-center">
                <Button
                    asChild
                    size="sm"
                    variant="link"
                    className="text-4xl"
                >
                    <Link
                        href={`/books/${bookId}/chapters/${chapterId}/verses/${verseId}`}
                        className='text-yellow-700 '
                    >
                        {displayText}
                    </Link>
                </Button>
            </div>
            <Separator />
            <div className='flex items-center justify-center p-4 font-bold'>{script}</div>
        </div>
    );
};