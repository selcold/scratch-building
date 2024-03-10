// /src/app/page.tsx

'use client';

import { useEffect, useState } from "react";
import { getDecryptedSessionId } from "@/components/backend/cookie";
import { ScratchAuthGET_UserProfile } from "@/components/backend/scratch";
import Footer from "@/components/frontend/elements/footer";
import Header from "@/components/frontend/elements/header";
import Loading from "@/components/frontend/elements/loading";
import { ElementGroup, Main } from "@/components/frontend/elements/main";
import Image from "next/image";
import { _locales } from "@/components/frontend/site/_locales";
import { ScratchAuth_logout, ScratchAuth_redirectToAuth } from "@/components/frontend/_scratch";

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CardContents } from "@/components/frontend/elements/card";
import { Textarea } from "@/components/ui/textarea";
import { CommentsHTML } from "@/components/frontend/elements/comments";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/backend/comments";

export default function Home() {

	const [NetworkStatus, setNetworkStatus] = useState<string>("online");
	const [isLangLoaded, setPageLoaded] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
	const [userId, setUserId] = useState<any | null>(null);
	const [userImage, setUserImage] = useState<any | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [userData_profile_bio, set_userData_profile_bio] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (typeof window !== 'undefined') {
					window.addEventListener("offline", (e) => {
						setNetworkStatus("offline")
					});
					window.addEventListener("online", (e) => {
						setNetworkStatus("online")
					});

                    const storedUsername = getDecryptedSessionId('username');
                    setUsername(storedUsername);
                    console.log('login:',storedUsername);
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
                        //console.log('> userData:',userData,'\n\n> profile.bio:',userData.profile.bio);
						if(userData){
							if(userData.id){
								setUserId(userData.id)
							}
							if(userData.profile.images["90x90"]){
								setUserImage(userData.profile.images["90x90"])
							}
							if(userData.profile.bio){
								set_userData_profile_bio(userData.profile.bio.replace(/\n/g, '<br>'));
							}
						}
                        setUserData(userData);
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!isLangLoaded) {
            fetchUserData();
        }
    }, [isLangLoaded]);

	const [comments, setComments] = useState<any>([]);
	const [commentsRes, setCommentsRes] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await Server_GetRequest_Comments(); // コメントデータを取得
				setComments(result); // 取得したコメントデータをstateにセット
				if(result.length > 0){
					const a = result["0"];
					if(a.request_mode){
						console.log(a.request_mode);
					}else{
						setCommentsRes(true);
					}
				}
			} catch (error) {
				console.error('コメントの取得中にエラーが発生しました:', error);
			}
		};
		fetchData();
	}, []);

	const [comment, setComment] = useState('');

	// コメント送信
	const CommentForm_send_ButtonClick = async () => {
		if (typeof window !== 'undefined') {
			if(username && userId && comment){
				const comment_reply_form_button = document.getElementById(`commentForm_send`);
				if(comment_reply_form_button){
					comment_reply_form_button.classList.add('pointer-events-none');
					comment_reply_form_button.innerText=(`送信中...`)
				}
				if(await API_gas_backendApi_new_commentSend(username, userId, "null", comment)){
					window.alert('コメントを投稿しました！');
					window.location.href=(`${window.location}`);
				}else{
					window.alert('スペース以外の文字を最低一文字入力してください！');
					if(comment_reply_form_button){
						comment_reply_form_button.classList.remove('pointer-events-none');
						comment_reply_form_button.innerText=(`コメントを投稿`)
					}
				}
			} else {
				window.alert('ユーザー情報の処理中です。');
			}
		}
	};

    if (!isLangLoaded) {
        return <Loading />;
    }

	if (isLangLoaded && NetworkStatus === "offline") {
		return (<><h1>offline</h1></>);
	}

	return (
		<>
			<div>
				<ElementGroup>
					<Header username={username} userData={userData}/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<CardContents>
								<CardHeader>
									<CardTitle>お知らせ</CardTitle>
									<CardDescription>ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！<br/>これからもビル経営ゲームをよろしくお願いします！</CardDescription>
								</CardHeader>
							</CardContents>
							<CardContents durationPls={50}>
								<CardHeader>
									<CardTitle>気軽にMOD開発！</CardTitle>
									<CardDescription>ビル経営ゲームのMODを作りたいと思ったことはありませんか？<br/>そんなあなたへ誰でも簡単にMODを作れるプロジェクトを見てみましょう！</CardDescription>
								</CardHeader>
								<CardFooter className="flex flex-wrap">
									<Button>ページを見る</Button>
								</CardFooter>
							</CardContents>
							<CardContents durationPls={100}>
								<CardHeader>
									<CardTitle>コメント</CardTitle>
								</CardHeader>
								{username? (
								<>
								<CardContent>
									<Textarea placeholder="コメント内容" onChange={(e) => setComment(e.target.value)} />
								</CardContent>
								<CardFooter className="flex flex-wrap gap-2">
									<Button onClick={CommentForm_send_ButtonClick}>投稿する</Button>
									<Button variant="outline">キャンセル</Button>
								</CardFooter>
								</>
								):(
								<>
								</>
								)}
								<section className="p-6 pt-0">
									<ul className="flex flex-col justify-center items-center gap-1 w-full mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1">
									{commentsRes? (
									<>
									{comments.length > 0 ? (
										<>
										{CommentsHTML(comments, username? username: '',userId,userImage)}
										</>
									) : (
										<>
											<li className='animated-slideIn-up p-2'>
												<h1 className='text-zinc-400 text-[1.2rem] m-auto'>コメントがまだ投稿されていません</h1>
											</li>
										</>
									)}
									</>
									):(
									<>
										<div className='w-full m-auto'>
											<div className='flex flex-col justify-center items-center gap-2 w-full m-auto'>
												<div className="animate-spin h-10 w-10 border-4 border-neutral-300 rounded-full border-t-transparent"></div>
												<span className='text-neutral-300 dark:text-neutral-700'>コメント取得中...</span>
											</div>
										</div>
									</>
									)}
									</ul>
								</section>
							</CardContents>
						</section>
					</Main>
				</ElementGroup>
				<Footer/>
			</div>
		</>
	);
}
