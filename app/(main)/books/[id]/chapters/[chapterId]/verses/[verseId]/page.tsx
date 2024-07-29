import ChapterNav from '@/components/chapter-nav';
import Typography from '@/components/ui/typography';
import prisma from '@/lib/db';
import React from 'react'

const VersesPage = async ({
    params
}: {
    params: { id: string; chapterid: string; verseId: string }
}) => {
    console.log(params)

    const verses = await prisma.verse.findMany({
        select: {
            id: true,
            scripts: {
                select: {
                    script: true,
                    verseIdx: true,
                },
                orderBy: {
                    verseIdx: 'asc'
                }
            },
        },
        where: {
            id: Number(params.verseId)
        },
    });

    // const verses = await prisma.verse.findMany({
    //     select: {
    //         id: true,
    //         scripts: {
    //             select: {
    //                 script: true,
    //                 verseIdx: true,
    //             },
    //             orderBy: {
    //                 verseIdx: 'asc'
    //             }
    //         },
    //     },
    //     where: {
    //         id: Number(params.verseId)
    //     },
    // });


    return (
        <>
            <ChapterNav />
            <div className="w-full flex flex-col gap-2 p-3">
                <>
                    {verses[0].scripts.map((verse) => {
                        return (
                            <div className="flex items-start gap-4">
                                <Typography
                                    variant='h4'
                                    text={verse.verseIdx.toString()}
                                    className='text-yellow-400'
                                    key={verse.verseIdx}
                                />
                                <Typography
                                    text={verse.script}
                                    variant='h6'
                                    className='font-semibold'
                                />
                            </div>
                        );
                    })}
                </>

            </div>
        </>

    )
}

export default VersesPage