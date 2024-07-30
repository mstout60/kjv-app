import prisma from '@/lib/db';

import { redirect } from 'next/navigation';

const Chapters = async ({
  params,
  searchParams,
}: {
  params: { id: string; chapterId: string }
  searchParams: { chapteridx: string }
}) => {

  const chapters = await prisma.chapter.findUnique({
    select: {
      id: true,
      bookId: true,
      verses: {
        where: {
          chapterIdx: Number(searchParams.chapteridx)
        },
      },
    },
    where: {
      id: Number(params.chapterId)
    },
  });

  console.log("Chapters", chapters)

  return redirect(`/books/${chapters?.bookId}/chapters/${chapters?.id}/verses/${chapters?.verses[0].id}`);
}

export default Chapters