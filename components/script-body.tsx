"use client";

import { cn } from "@/lib/utils";
import Typography from "./ui/typography";

interface ScriptBodyProps {
    verses: {
        id: number;
        chapterIdx: number;
        verseIdx: number;
        script: string;
        verseId: number | null;
    }[];
    isFiltered: boolean;
    filteredScript?: string;
};

const ScriptBody = ({
    verses,
    isFiltered = false,
    filteredScript
}: ScriptBodyProps) => {
    return (
        <div className="w-full flex flex-col gap-2 p-3">
            <>
                {verses.map((verse) => {
                    return (
                        <div className="flex items-start gap-4" key={verse.verseIdx} >
                            <Typography
                                variant='h4'
                                text={verse.verseIdx.toString()}
                                className='text-yellow-400'
                            />
                            <Typography
                                text={verse.script}
                                variant='h6'
                                className={cn('font-semibold hover:text-blue-600',
                                    isFiltered && filteredScript === verse.script && "font-bold text-yellow-700"
                                )}
                            />
                        </div>
                    );
                })}
            </>
        </div>
    );
};

export default ScriptBody;