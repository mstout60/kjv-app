import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { useGetBook } from "@/hooks/use-get-book";
import { ArrowLeftIcon } from "lucide-react";

interface HeaderProps {
    bookId: number;
    chapter: number;
    verse: number;
    script: string;
};

export const Header = async ({
    bookId,
    chapter,
    verse,
    script,
}: HeaderProps) => {
    const book = await useGetBook({ id: bookId })
    return (
        <div className="flex flex-col w-full">
            <div className="flex p-2 cursor-pointer text-sm font-semibold text-muted-foreground"> <ArrowLeftIcon className="size-6" /><BackButton backText="Back to search" /> </div>
            <div className="flex items-center justify-center text-4xl text-yellow-700">
                {book?.displayName} {chapter}:{verse}
            </div>
            <Separator />
            <div className='flex items-center justify-center p-4 font-bold'>{script}</div>
        </div>
    );
};