
// Add this to package.json to process seed.ts
//   "prisma": {
//     "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
//   },

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dict = [
    {
        "word": "Zealously",
        "pronunciation": "ZEALOUSLY",
        "definitions": [
            {
                "type": "adverb",
                "text": "Zelusly. With passionate ardor; with eagerness. It is good to be zealously affected always in good thing. Galatians 4:17."
            }
        ]
    }
]

async function main() {

    for (const w of dict) {
        const data = await prisma.dictionary.upsert({
            where: {
                word: w.word,
            },
            update: {},
            create: {
                word: w.word,
                pronunciation: w.pronunciation,
                definitions: {
                    createMany: {
                        data: w.definitions,
                    },
                },
            },
        });
    };
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })