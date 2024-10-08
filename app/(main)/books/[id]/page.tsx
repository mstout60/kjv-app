import ChapterNav from '@/components/chapter-nav'
import { buttonVariants } from '@/components/ui/button'

import { getAllBooks, getBookWithChapters, getComments, getFirstBookId, getUserAuthId } from '@/lib/query'
import { ChaptersWithComment } from '@/lib/types';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link'

const Book = async ({
  params
}:
  {
    params: { id: string }
  }) => {
  const { userId } = auth();

  console.log("User Id", userId)
  // console.log("Params Id: ", params.id)

  // let search = 0;
  // if (JSON.stringify(params) === '{}') {
  //   const result = await getFirstBookId();
  //   search = result?.id!;
  // } else {
  //   search = Number(params.id)
  // }

  // console.log("Book Page ", search)

  const search = Number(params.id)
  const response = await getBookWithChapters(search);

  if (!response) {
    return;
  }

  const Books = await getAllBooks();

  const chapterId = response[0].chapters[0].id.toString();

  let commentChapters = [] as ChaptersWithComment;
  if (userId) {
    const user = await getUserAuthId(userId);
    commentChapters = await getComments(user?.id!);
  }

  //console.log("comment list", commentChapters)

  const chaptersBtn = [...Array(response[0]?.chapters[0].chapterCnt)]
    .map((_, i) => {
      let j = "";
      if (commentChapters.length > 0) {
        commentChapters.map((comment) => {
          if (response[0].chapters[0].bookId === comment.bookId && response[0].chapters[0].id === comment.chapterId && comment.script.chapterIdx === i + 1) {
            j = i + 1 + "*"
          } else { j = Number(i + 1).toString() }
        });
      } else {
        j = Number(i + 1).toString()
      }
      return j;
    });

  return (
    <>
      <ChapterNav
        bookId={response[0].id}
        chapterId={Number(chapterId)}
        books={Books}
      />

      <div className="grid grid-cols-3 ml-4" >
        <>
          {chaptersBtn.map((btn) => {

            return (
              <Link className={buttonVariants({ variant: "outline" })}
                href={`/books/${response[0]?.id}/chapters/${chapterId}?chapteridx=${btn}`}
                key={btn}
              >
                {btn}
              </Link >
            )
          })}
        </>
      </div>
    </>
  );
};

export default Book