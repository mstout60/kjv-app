import { Separator } from '@/components/ui/separator';
import { getScriptByVerse } from '@/lib/query';
import { ScriptResults } from '@/lib/types';
import React from 'react'

type Props = {
    params: {
        bookid: number;
        chapterId: number;
        verseId: number;
        scriptId: number;
    };
}

const ScriptPage = async ({ params }: Props) => {

    console.log("params", params)

    const response = await getScriptByVerse(Number(params.verseId));

    const scriptsByVerse: { id: number; chapterIdx: number; verseIdx: number; script: string; verseId: number | null; }[][] = []
    response.forEach((s) => {
        scriptsByVerse.push(s.scripts)
    });


    const filtered = scriptsByVerse[0].filter(s => s.id == params.scriptId)

    const rangeFiltered = scriptsByVerse[0]
        .filter(i => i.verseIdx >= filtered[0].verseIdx - 2 && i.verseIdx <= filtered[0].verseIdx + 2)


    //console.log("Scripts By Verse", filtered)
    console.log("Range script filter", rangeFiltered)

    return (
        <>
        <div className='font-semibold'>{filtered[0].script}</div>
        <Separator />
        <div>{JSON.stringify(rangeFiltered)}</div>
        </>

    )
}

export default ScriptPage;
