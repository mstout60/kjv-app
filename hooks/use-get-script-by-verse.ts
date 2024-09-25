import { getScriptByVerse } from "@/lib/query";

interface useGetScriptByVerseProps {
    verseId: number;
};

export const useGetScriptByVerse = ({ verseId }: useGetScriptByVerseProps) => {
    const data = getScriptByVerse(verseId);
    const isLoading = data === undefined;

    return data;
};