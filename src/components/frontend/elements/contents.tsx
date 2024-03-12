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
                                if (action.url) {
                                    const newTab = window.open(action.url, action.target || '_self'); // URLがある場合は新しいタブで開く
                                    if (action.target === '_blank') {
                                        newTab?.focus(); // 新しいタブが開かれたらフォーカスする
                                    }
                                }
                                if (action.onclick) {
                                    eval(action.onclick); // onclick関数が定義されている場合は実行
                                }
                            }}
                            key={index}
                        >
                            {action.label}
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