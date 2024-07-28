import prisma from "@/lib/db";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {

  const oldTestamentBooks = await prisma.testament.findMany({
    select: {
      name: true,
      id: true,
      books: true,
    },
    where: {
      id: 1,
    }
  });

  const newTestamentBooks = await prisma.testament.findMany({
    select: {
      name: true,
      id: true,
      books: true,
    },
    where: {
      id: 2,
    }
  });

  console.log(oldTestamentBooks, newTestamentBooks)


  return (
    <div>
      <Tabs defaultValue={`${oldTestamentBooks[0].id}`} className="w-[400px]">
        <TabsList>

          <TabsTrigger value={`${oldTestamentBooks[0].id}`}>Old</TabsTrigger>
          <TabsTrigger value={`${newTestamentBooks[0].id}`}>New</TabsTrigger>
        </TabsList>
        <TabsContent className="grid grid-cols-3 ml-4" value={`${oldTestamentBooks[0].id}`}>

          <>

            {oldTestamentBooks[0].books.map((book) => {
              return (
                <Link className={buttonVariants({variant: "outline"})} 
                href={`/books/${book.id}`}
                >{book.abbreviation}</Link >
              )
            })}
          </>

        </TabsContent>
        <TabsContent className="grid grid-cols-3 ml-4" value={`${newTestamentBooks[0].id}`}>
          <>

            {newTestamentBooks[0].books.map((book) => {
              return (
                <Button className="" variant="outline">{book.abbreviation}</Button >
              )
            })}
          </>
        </TabsContent>
      </Tabs>

    </div>
  );
}
