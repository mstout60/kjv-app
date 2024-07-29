import { Button, buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

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

  const versesBtn = [...Array(chapters?.verses[0].verseCnt)]
    .map((_, i) => {
      return i + 1;
    });

  // if (chapters?.verses[0]) {
  //   redirect(`/books/${chapters.bookId}/chapters/${params.chapterId}`)
  // }



  return (
    <div className="grid grid-cols-3 ml-4" >
      <>
        {versesBtn.map((btn) => {
          return (
            <Link className={buttonVariants({ variant: "outline" })}
              href={`/books/${chapters?.bookId}/chapters/${chapters?.id}/verses/${chapters?.verses[0].id}`}
              key={btn}
            >{btn}</Link >
          );
        })}

      </>
    </div>
  )
}

export default Chapters