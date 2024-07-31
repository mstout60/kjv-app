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
    chapterId?: number | undefined;
    chapterIdx?: number;
  }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [currBookId, setCurrBookId] = useState(bookId);
  const [currChapterId, setCurrChapterId] = useState(chapterId);
  const [chapterCnt, setChapterCnt] = useState(1);
  const [bookList, setBookList] = useState<AllBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const allBooks = async () => {
      const Books = await getAllBooks();

      if (!Books) {
        return null;
      }

      setBookList(Books);
      setIsLoading(false);
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

      setCurrBookId(Book.id)
      setCurrChapterId(chapterId)
      setChapterCnt(Book.chapters[0].chapterCnt)
      setTitle(chapterIdx ? Book.displayName + ' - Chapter ' + chapterIdx : Book.displayName as string)
    };
    getCurrBook();
  }, [bookId])

  const previous = async (currBookId: number, currChapter: number) => {

    if (bookList.some(book => currBookId - 1 === book.id)
      && chapterIdx === undefined) {
      setCurrBookId(currBookId - 1);

      return router.push(`/books/${currBookId}`)
    }

    if (chapterIdx! - 1 >= chapterCnt) {
      const idx = chapterIdx! - 1

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(currChapter, idx);

      return router.push(`/books/${currBookId}/chapters/${currChapter}/verses/${verse?.id}`)
    } else {
      chapterIdx = undefined;
      next(currBookId, 1);
    }
  };

  const next = async (currBookId: number, currChapter: number) => {

    if (bookList.some(book => currBookId + 1 === book.id)
      && chapterIdx === undefined) {
      setCurrBookId(currBookId + 1);

      return router.push(`/books/${currBookId}`)
    }

    if (chapterIdx! + 1 <= chapterCnt) {
      const idx = chapterIdx! + 1

      // Next query  verse for verseId by currChapter  and chapterIdx unique index
      const verse = await getVerseByChapterAndIndex(currChapter, idx);

      return router.push(`/books/${currBookId}/chapters/${currChapter}/verses/${verse?.id}`)
    } else {
      chapterIdx = undefined;
      next(currBookId, 1);
    }
  };

  return (
    <nav>
      <div className="flex items-center justify-between  cursor-pointer text-white mb-4 rounded-lg overflow-hidden p-4 bg-slate-300">
        <Button variant="secondary" size="lg" onClick={async () => { previous(currBookId, currChapterId!) }}>
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

        <Button variant="secondary" size="lg" onClick={async () => next(currBookId, currChapterId!)}>
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
