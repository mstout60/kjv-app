import ChapterNav from '@/components/chapter-nav';
import ScriptBody from '@/components/script-body';
import { useGetScriptByVerse } from '@/hooks/use-get-script-by-verse';
import { getAllBooks } from '@/lib/query';

const VersesPage = async ({
    params
}: {
    params: { id: string; chapterId: string; verseId: string }
}) => {
    const Books = await getAllBooks();
    const verse = await useGetScriptByVerse({ verseId: Number(params.verseId) });

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
            <ScriptBody
                verses={verse[0].scripts}
                isFiltered={false}
            />
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