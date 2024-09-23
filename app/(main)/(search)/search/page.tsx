import { ContentNotFound } from "@/components/content-not-found";
import SearchContent from "@/components/search-content";
import { searchScript, searchScriptCount } from "@/lib/query";
import { redirect } from "next/navigation";
import { Header } from "./header";

interface SearchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const SearchPage = async ({ searchParams }: SearchProps) => {
    const query = searchParams.query;
    const page = Number(searchParams.page);
    const limit = Number(searchParams.limit);

    if (Array.isArray(query) || !query) {
        return redirect('/');
    }

    const searchCount = await searchScriptCount(query);
    const results = await searchScript(query, page, limit);

    //if ((results == undefined || !results[0]) ) return <ContentNotFound/>;

    return (
        <div className="flex flex-col h-full">

            <SearchContent
                searchCount={searchCount}
                results={results}
            />
        </div>

    );
}

export default SearchPage