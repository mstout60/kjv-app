import ChapterNav from '@/components/chapter-nav';
import Typography from '@/components/ui/typography';
import { getAllBooks, getScriptByVerse } from '@/lib/query';
import { AllBooks } from '@/lib/types';

const VersesPage = async ({
    params
}: {
    params: { id: string; chapterId: string; verseId: string }
}) => {
    const Books = await getAllBooks();
    const verse = await getScriptByVerse(Number(params.verseId))

    return (
        <>
            <header >
                <ChapterNav
                    bookId={Number(params.id)}
                    chapterId={Number(params.chapterId)}
                    chapterIdx={verse[0].chapterIdx}
                    books={Books}
                />
            </header>
            <div className="w-full flex flex-col gap-2 p-3">
                <>
                    {verse[0].scripts.map((verse) => {
                        return (
                            <div className="flex items-start gap-4" key={verse.verseIdx} >
                                <Typography
                                    variant='h4'
                                    text={verse.verseIdx.toString()}
                                    className='text-yellow-400'
                                />
                                <Typography
                                    text={verse.script}
                                    variant='h6'
                                    className='font-semibold hover:text-blue-600'
                                />
                            </div>
                        );
                    })}
                </>
            </div>
            <footer>
                <ChapterNav
                    bookId={Number(params.id)}
                    chapterId={Number(params.chapterId)}
                    chapterIdx={verse[0].chapterIdx}
                    books={Books}
                />
            </footer>
        </>
    )
}

export default VersesPage;