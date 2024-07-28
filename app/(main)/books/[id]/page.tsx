import { Button, buttonVariants } from '@/components/ui/button'
import prisma from '@/lib/db'
import Link from 'next/link'
import React from 'react'

const Book = async ({
  params
}:
  {
    params: { id: string }
  }) => {
  const search = Number(params.id)
  console.log(search)
  const book = await prisma.book.findUnique({
    select: {
      name: true,
      id: true,
      chapters: true,
    },
    where: {
      id: search
    },

  })

  console.log(book)

  const chaptersBtn = [...Array(book?.chapters[0].chapterCnt)]
    .map((_, i) => {
      return i + 1;
    });


  return (

    <div className="grid grid-cols-3 ml-4" >
      <>
        {chaptersBtn.map((btn) => {
          return (
            <Link className={buttonVariants({ variant: "outline" })}
              href={`/books/${book?.id}/chapters/${btn}`}
              key={btn}
            >{btn}</Link >
          )
        })}

      </>
    </div>
  )

}

export default Book