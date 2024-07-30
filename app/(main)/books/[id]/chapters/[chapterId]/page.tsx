import { getChapterWithVerses } from '@/lib/query';

import { redirect } from 'next/navigation';

const Chapters = async ({
  params,
  searchParams,
}: {
  params: { id: string; chapterId: string }
  searchParams: { chapteridx: string }
}) => {

  const chapter = await getChapterWithVerses(Number(params.chapterId), Number(searchParams.chapteridx))

  return redirect(`/books/${chapter?.bookId}/chapters/${chapter?.id}/verses/${chapter?.verses[0].id}`);
}

export default Chapters