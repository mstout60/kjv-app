

import { Header } from '@/app/(main)/(search)/search/header';
import { Separator } from '@/components/ui/separator';
import Typography from '@/components/ui/typography';
import { getScriptByVerse } from '@/lib/query';
import { ScriptResults } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        id: number;
        chapterId: number;
        verseId: number;
        scriptId: number;
    };
}

const ScriptPage = async ({ params }: Props) => {

    //const requestParams = useParams();

    console.log("Detail params", params)

    const response = await getScriptByVerse(Number(params.verseId));

    const scriptsByVerse: { id: number; chapterIdx: number; verseIdx: number; script: string; verseId: number | null; }[][] = []
    response.forEach((s) => {
        scriptsByVerse.push(s.scripts)
    });

    const filtered = scriptsByVerse[0].filter(s => s.id == params.scriptId)

    const rangeFiltered = scriptsByVerse[0]
        .filter(i => i.verseIdx >= filtered[0].verseIdx - 2 && i.verseIdx <= filtered[0].verseIdx + 2)


    //console.log("Scripts By Verse", filtered)
    //console.log("Range script filter", rangeFiltered)

    return (
        <>
            <Header
                bookId={Number(params.id)}
                chapter={filtered[0].chapterIdx}
                verse={filtered[0].verseIdx}
                script={filtered[0].script}
            />

            <Separator />
            {/* <div>{JSON.stringify(rangeFiltered)}</div> */}
            <div className="flex flex-col items-start p-2 gap-4" >
                {rangeFiltered.map((verse) => {
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
                                    filtered[0].script === verse.script && "font-bold text-yellow-700"
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        </>

    )
}

export default ScriptPage;
