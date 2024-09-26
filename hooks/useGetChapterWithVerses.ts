import { getChapterWithVerses } from "@/lib/query";

interface useGetChaterWithVersesProps {
    chapterId: number;
    chapterIdx: number;
};

export const useGetChapterWithVerses = ({
    chapterId,
    chapterIdx,
}: useGetChaterWithVersesProps) => {
    const data = getChapterWithVerses(chapterId, chapterIdx);

    return data;
};