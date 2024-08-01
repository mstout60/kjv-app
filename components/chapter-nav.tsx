"use client";

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllBooks, getBook, getVerseByChapterAndIndex } from '@/lib/query';
import { AllBooks } from '@/lib/types';

const ChapterNav = (
  {
    bookId,
    chapterId,
    chapterIdx,
  }: {
    bookId: number;
    chapterId?: number;
    chapterIdx?: number;
  }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [chapterCnt, setChapterCnt] = useState(1);
  const [bookList, setBookList] = useState<AllBooks[]>([]);
  //const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const allBooks = async () => {
      const Books = await getAllBooks();

      if (!Books) {
        return null;
      }

      setBookList(Books);
      //setIsLoading(false);
    };

    allBooks();
  }, []);

  useEffect(() => {
    const getCurrBook = async () => {
      const Book
        = await getBook(bookId);

      if (!Book) {
        return;
      }

      setChapterCnt(Book.chapters[0].chapterCnt)
      setTitle(chapterIdx ? Book.displayName + ' - Chapter ' + chapterIdx : Book.displayName as string)
    };
    getCurrBook();
  }, [bookId])

  const previous = async (id: number, chapter: number, idx: number) => {
    console.log("Previous", id, chapter, idx, chapterCnt)

    if (bookList.some(book => id - 1 === book.id)
      && idx === undefined) {

      return router.push(`/books/${id - 1}`)
    }

    if (idx - 1 != 0 && idx - 1 <= chapterCnt) {
      const chapterIdx = idx - 1

      console.log("Get Verse By Chapter and Index", chapter, chapterIdx)

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(chapter, chapterIdx);

      return router.push(`/books/${id}/chapters/${chapter}/verses/${verse?.id}`)
    } else {
      previous(bookId, undefined!, undefined!);
    }
  };

  const next = async (id: number, chapter: number, idx: number) => {
    console.log("Next", id, chapter, idx)

    if (bookList.some(book => id + 1 === book.id)
      && idx === undefined) {

      return router.push(`/books/${id + 1}`)
    }

    if (idx + 1 <= chapterCnt) {
      const chapterIdx = idx + 1

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(chapter, chapterIdx);

      return router.push(`/books/${id}/chapters/${chapter}/verses/${verse?.id}`)
    } else {
      next(bookId, undefined!, undefined!);
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
