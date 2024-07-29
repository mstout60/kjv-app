import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getBooks } from "@/actions/get-books";

export default async function Home() {

  const oldTestamentBooks = await getBooks({ testamentId: 1 });
  const newTestamentBooks = await getBooks({ testamentId: 2 });

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
                <Link className={buttonVariants({ variant: "outline" })}
                  key={book.id}
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
                // <Button className="" variant="outline">{book.abbreviation}</Button >
                <Link className={buttonVariants({ variant: "outline" })}
                  key={book.id}
                  href={`/books/${book.id}`}
                >{book.abbreviation}</Link >
              )
            })}
          </>
        </TabsContent>
      </Tabs>

    </div>
  );
}
