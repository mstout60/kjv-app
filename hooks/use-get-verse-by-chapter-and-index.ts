import { getVerseByChapterAndIndex } from "@/lib/query";

interface useGetVerseByChapterAndIndexProps {
    chapterId: number;
    chapterIdx: number;
};

export const useGetVerseByChapterAndIndex = ({
    chapterId,
    chapterIdx,
}: useGetVerseByChapterAndIndexProps) => {
    const data = getVerseByChapterAndIndex(chapterId, chapterIdx);

    return data;
};