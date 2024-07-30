import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { getBook } from '@/actions/get-book'

const ChapterNav = async (
  {
    bookId,
    chapterIdx
  }: {
    bookId: number;
    chapterIdx: number;
  }) => {

  console.log(chapterIdx)

  const book = await getBook({ bookId: bookId })

  if (!book) {
    return;
  }

  const title = book.displayName + ' - Chapter ' + chapterIdx

  console.log("Book", book)
  return (
    <nav>
      <div className="flex items-center justify-between  cursor-pointer text-white mb-4 rounded-lg overflow-hidden p-4 bg-slate-300">
        <Button variant="secondary" size="lg">
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
