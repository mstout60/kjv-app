import { Dictionary } from "@/lib/types";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


interface DictionaryCardProps {
    results: Dictionary;
};

export const DictonaryCard = ({ results }: DictionaryCardProps) => {
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    {results?.word}
                </CardTitle>
                <Separator />
                <CardDescription>
                    {results?.pronunciation}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                {results?.definitions.map((def) => (
                    <div key={results.word}>
                        {def.type} {def.text}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};