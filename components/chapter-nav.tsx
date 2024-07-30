"use client";

import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBook } from '@/lib/query';

const ChapterNav = (
  {
    bookId,
    chapterIdx
  }: {
    bookId: number;
    chapterIdx?: number;
  }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const getCurrBook = async () => {
      const Book
        = await getBook(bookId);

      if (!Book) {
        return;
      }

      setTitle(chapterIdx ? Book.displayName + ' - Chapter ' + chapterIdx : Book.displayName as string)
    };
    getCurrBook();
  }, [bookId])


  const previous = (currChapter: number) => {
    console.log(currChapter)
  };

  const next = () => { };



  return (
    <nav>
      <div className="flex items-center justify-between  cursor-pointer text-white mb-4 rounded-lg overflow-hidden p-4 bg-slate-300">
        <Button variant="secondary" size="lg" onClick={() => { }}>
          <Typography
            text='Previous'
            variant='p'
          />
        </Button>

        <div className='items-center'>
          <Typography
            text={title}
            variant='h3'
            className='text-blue-700 '
          />
        </div>

        <Button variant="secondary" size="lg">
          <Typography
            text='Next'
            variant='p'
          />
        </Button>
      </div>
    </nav>
  )
}

export default ChapterNav
