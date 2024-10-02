"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { searchDictionary } from "@/lib/query";
import { Dictionary } from "@/lib/types";

import Typography from "@/components/ui/typography";

import { DictonaryCard } from "./dictionary-card";

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
    filteredScript,
}: ScriptBodyProps) => {
    const [lookup, setLookup] = useState<Dictionary | null>(null);
    const handleMouseUp = async () => {
        const searchQuery = `${window.getSelection()!.toString().trim()}`;
        if (searchQuery === null || searchQuery === "") return;

        const results = await searchDictionary(searchQuery);
        setLookup(results);
    }

    return (
        <div className="w-full flex flex-col gap-2 p-3">
            <>
                {!!lookup && (
                    <div>
                        <DictonaryCard results={lookup} />
                    </div>
                )}
                {verses.map((verse) => {
                    return (
                        <div className="flex items-start gap-4" key={verse.verseIdx} onMouseUp={handleMouseUp} >
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

// function SelectableText({
//     children,
// }: { children: React.ReactNode }) {
//     if (process.platform === "linux") {
//         return <TextInput multiline editable={false}>{children}</TextInput>
//     } else {
//         return <Text selectable>{children}</Text>
//     }
// }