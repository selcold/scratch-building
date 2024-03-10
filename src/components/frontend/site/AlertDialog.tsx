import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScratchAuth_redirectToAuth } from "../_scratch";

export function AlertDialogCustomButton_loginUserOnly({ children, title, description }: { children: React.ReactNode, title?: string, description?: string }) {
    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title? title : "あなたはこの機能を利用できません！"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description? description : "この機能はScratchアカウントでログインすることで、利用ができるようになります。もしScratchアカウントがない場合はアカウントを作成し、ログインしてから利用してください。"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>閉じる</AlertDialogCancel>
                    <AlertDialogAction onClick={() => ScratchAuth_redirectToAuth()}>ログイン</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}

export function AlertDialogCustomButton_NotRelease({ children, title, description }: { children: React.ReactNode, title?: string, description?: string }) {
    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title? title : "この機能は現在使用できません！"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description? description : "この機能は現在製作中、または一時的に無効化されている機能の為使用することはできません。"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>閉じる</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}