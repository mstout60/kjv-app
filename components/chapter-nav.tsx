"use client";

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBook, getVerseByChapterAndIndex } from '@/lib/query';
import { AllBooks } from '@/lib/types';
import useMediaQuery from '@/hooks/use-media-query';

const ChapterNav = (
  {
    bookId,
    chapterId,
    chapterIdx,
    books
  }: {
    bookId: number;
    chapterId?: number;
    chapterIdx?: number;
    books: AllBooks[];
  }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [chapterCnt, setChapterCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    let isCancelled = false;

    const getCurrBook = async () => {
      const Book
        = await getBook(bookId);

      if (!Book) {
        return;
      }
      if (!isCancelled) {
        setChapterCnt(Book.chapters[0].chapterCnt)
        setTitle(chapterIdx ?
          !isMobile ? Book.abbreviation + ' Ch. ' + chapterIdx :
            Book.displayName + ' - Chapter ' + chapterIdx
          : !isMobile ? Book.abbreviation as string : Book.displayName as string)

      }
    };
    getCurrBook();

    return () => {
      isCancelled = true;
    }
  }, [bookId, chapterIdx, isMobile])

  const previous = async (id: number, chapter: number, idx: number) => {
    console.log("Previous", id, chapter, idx, chapterCnt)

    if (books.some(book => id - 1 === book.id)
      && idx === undefined) {

      return router.push(`/books/${id - 1}`)
    }

    if (idx - 1 != 0 && idx - 1 <= chapterCnt) {
      const chapterIdx = idx - 1

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(chapter, chapterIdx);

      return router.push(`/books/${id}/chapters/${chapter}/verses/${verse?.id}`)
    } else {
      if (books.some(book => id - 1 === book.id)) {
        previous(bookId, undefined!, undefined!);
      }
    }
  };

  const next = async (id: number, chapter: number, idx: number) => {
    console.log("Next", id, chapter, idx)

    if (books.some(book => id + 1 === book.id)
      && idx === undefined) {

      return router.push(`/books/${id + 1}`)
    }

    if (idx + 1 <= chapterCnt) {
      const chapterIdx = idx + 1

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(chapter, chapterIdx);

      return router.push(`/books/${id}/chapters/${chapter}/verses/${verse?.id}`)
    } else {
      if (books.some(book => id + 1 === book.id)) {
        next(bookId, undefined!, undefined!);
      }
    }
  };

  return (
    <nav>
      <div className="flex items-center justify-between  cursor-pointer text-white mb-4 rounded-lg overflow-hidden p-4 bg-slate-300">
        <Button variant="secondary" size="lg" onClick={async () => { previous(bookId, chapterId!, chapterIdx!) }}>
          <Typography
            text='Previous'
            variant='p'
            className='font-semibold'
          />
        </Button>

        <div className='items-center'>
          <Typography
            text={title}
            variant='h3'
            className='text-blue-700 '
          />
        </div>

        <Button variant="secondary" size="lg" onClick={async () => next(bookId, chapterId!, chapterIdx!)}>
          <Typography
            text='Next'
            variant='p'
            className='font-semibold'
          />
        </Button>
      </div>
    </nav>
  )
}

export default ChapterNav
