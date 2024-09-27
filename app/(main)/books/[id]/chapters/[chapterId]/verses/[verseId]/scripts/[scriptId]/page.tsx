import React from 'react'

import { useGetScriptByVerse } from '@/hooks/use-get-script-by-verse';

import { Separator } from '@/components/ui/separator';
import ScriptBody from '@/components/script-body';

import { Header } from '@/app/(main)/(search)/search/header';
import { searchDictionary } from '@/lib/query';

type Props = {
    params: {
        id: number;
        chapterId: number;
        verseId: number;
        scriptId: number;
    };
};

const ScriptPage = async ({ params }: Props) => {
    const response = await useGetScriptByVerse({ verseId: Number(params.verseId) });
    //const results = await searchDictionary("Apollyon");

    const scriptsByVerse: { id: number; chapterIdx: number; verseIdx: number; script: string; verseId: number | null; }[][] = []
    response.forEach((s) => {
        scriptsByVerse.push(s.scripts)
    });

    const filtered = scriptsByVerse[0].filter(s => s.id == params.scriptId)

    const rangeFiltered = scriptsByVerse[0]
        .filter(i => i.verseIdx >= filtered[0].verseIdx - 2 && i.verseIdx <= filtered[0].verseIdx + 2)

    return (
        <>
            <Header
                bookId={Number(params.id)}
                chapterId={response[0].chapterId!}
                verseId={response[0].id}
                chapter={filtered[0].chapterIdx}
                verse={filtered[0].verseIdx}
                script={filtered[0].script}

            />
            <Separator />
            <ScriptBody
                verses={rangeFiltered}
                isFiltered={true}
                filteredScript={filtered[0].script}
            />
        </>
    );
};

export default ScriptPage;
