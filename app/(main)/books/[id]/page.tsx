import ChapterNav from '@/components/chapter-nav'
import { buttonVariants } from '@/components/ui/button'

import { getBookWithChapters } from '@/lib/query'
import Link from 'next/link'
import React from 'react'


const Book = async ({
  params
}:
  {
    params: { id: string }
  }) => {
  const search = Number(params.id)

  const response = await getBookWithChapters(search);

  if (!response) {
    return;
  }

  const chapterId = response[0].chapters[0].id.toString();

  console.log("Book", response)

  const chaptersBtn = [...Array(response[0]?.chapters[0].chapterCnt)]
    .map((_, i) => {
      return i + 1;
    });

  return (
    <>
      <ChapterNav
        bookId={response[0].id}
      />

      <div className="grid grid-cols-3 ml-4" >
        <>
          {chaptersBtn.map((btn) => {
            return (
              <Link className={buttonVariants({ variant: "outline" })}
                href={`/books/${response[0]?.id}/chapters/${chapterId}?chapteridx=${btn}`}
                key={btn}
              >{btn}</Link >
            )
          })}

        </>
      </div>
    </>
  )

}

export default Book