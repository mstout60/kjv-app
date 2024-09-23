import { getBook } from "@/lib/query";

interface UseGetBookProps {
    id: number;
};

export const useGetBook = ({ id }: UseGetBookProps) => {
    const data = getBook(id);

    return data;
}