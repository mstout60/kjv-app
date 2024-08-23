import { ContentNotFound } from "@/components/content-not-found";
import SearchContent from "@/components/search-content";
import { searchScript } from "@/lib/query";
import { redirect } from "next/navigation";

interface SearchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const SearchPage = async ({ searchParams }: SearchProps) => {
    const query = searchParams.query;

    if (Array.isArray(query) || !query) {
        return redirect('/');
    }

    const results = await searchScript(query);

    //if ((results == undefined || !results[0]) ) return <ContentNotFound/>;

    return (
        <SearchContent
            results={results}
        />

        /* <div>SearchPage with query params {query}</div>
        <div>{JSON.stringify(results)}</div> */


    )
}

export default SearchPage