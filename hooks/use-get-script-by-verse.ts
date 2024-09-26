import { getScriptByVerse } from "@/lib/query";

interface useGetScriptByVerseProps {
    verseId: number;
};

export const useGetScriptByVerse =  async ({ verseId }: useGetScriptByVerseProps) => {
    const data =  await getScriptByVerse(verseId);


    return data ;
};