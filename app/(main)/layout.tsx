import ChapterNav from "@/components/chapter-nav";
import SearchNav from "@/components/search-nav";
import { getAllBooks, getBooks } from "@/lib/query";

const Layout = async ({ children }: { children: React.ReactNode }) => {

    const oldTestamentBooks = await getBooks(1);
    const newTestamentBooks = await getBooks(2);



    return (
        <main>
            <SearchNav
                oldTestament={oldTestamentBooks}
                newTestament={newTestamentBooks}
            />
            {children}
        </main>
    );
};

export default Layout;