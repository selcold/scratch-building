// /src/components/frontend/elements/contents.tsx

'use client';

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { contents_json } from "../../../../contents/contentsObj";
import { CardContents } from "./card";
import Link from "next/link";

export function ContentsSET({ contentTitle }: { contentTitle: string }) {
    const contentsObj = contents_json;
    const selectedContents = contentsObj[contentTitle];

    return (
        <>
            {selectedContents && selectedContents.map((content: any, index: number) => (
            <CardContents durationPls={ 50 * index} key={index}>
                <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription className="whitespace-pre-line">{content.description}</CardDescription>
                </CardHeader>
                {content.actions ? (
                    <CardFooter className="flex flex-wrap gap-2">
                    {content.actions.map((action: any, index: number) => (
                        <Button
                            variant={action.variant} 
                            onClick={() => {
                                if (action.onclick) {
                                    eval(action.onclick); // onclick関数が定義されている場合は実行
                                }
                            }}
                            key={index}
                        >
                            {action.url ? (
                                <Link href={action.url} target={action.target || '_self'}>
                                    {action.label}
                                </Link>
                            ):(
                                action.label
                            )}
                        </Button>
                    ))}
                    </CardFooter>
                ):(
                    <></>
                )}
            </CardContents>
            ))}
        </>
    );
}