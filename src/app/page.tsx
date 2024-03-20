// /src/app/page.tsx

'use client';

import { useEffect, useState } from "react";
import { getDecryptedSessionId, setEncryptedUsername } from "@/components/backend/cookie";
import { ScratchAuthGET_UserProfile } from "@/components/backend/scratch";
import Footer from "@/components/frontend/elements/footer";
import Header from "@/components/frontend/elements/header";
import Loading from "@/components/frontend/elements/loading";
import { ElementGroup, Main } from "@/components/frontend/elements/main";
import Image from "next/image";
import { _locales } from "@/components/frontend/site/_locales";
import { ScratchAuth_logout, ScratchAuth_redirectToAuth, Scratch_GET_user_image, ValidationCheck_comment } from "@/components/frontend/_scratch";

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
import { CommentsHTML, CommentsHtmlContents } from "@/components/frontend/elements/comments";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/backend/comments";
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
import { DarkModeSET } from "@/components/frontend/site/main";
import { AlertDialogCustomButton_loginUserOnly } from "@/components/frontend/site/AlertDialog";
import { HeadCustom_config } from "@/components/frontend/site/metaCustom";
import { _cfgSite } from "@/components/configs/siteLinks";
import { ContentsSET } from "@/components/frontend/elements/contents";
import { _cfg_logs } from "@/components/configs/config";
import { ScratchStudioAds } from "@/components/frontend/site/scratchAds";

export default function Home() {

	// headカスタム
	const Head_config = {
		title: _locales(_cfgSite.title),
	};
	HeadCustom_config(Head_config);

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
					DarkModeSET();
					window.addEventListener("offline", (e) => {
						setNetworkStatus("offline")
					});
					window.addEventListener("online", (e) => {
						setNetworkStatus("online")
					});

                    const storedUsername = getDecryptedSessionId('username');
                    setUsername(storedUsername);
					if(_cfg_logs.scratchAuth_userData_log){
						console.log('login:',storedUsername);
					}
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
						if(_cfg_logs.scratchAuth_userData_log){
							console.log(userData);
						}
						setUserId(userData?.id || null)
						setUserImage(userData?.profile?.images['90x90'] || null);
						set_userData_profile_bio(userData?.profile?.bio || null);
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
				const result = await Server_GetRequest_Comments();
				setComments(result);
				if(result.length > 0){
					const a = result["0"];
					if(a.request_mode){
						console.log(a.request_mode);
					}else{
						setCommentsRes(true);
					}
				}else{
					setCommentsRes(true);
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
			if(userData.username && userData.id){
				const comment_reply_form_button = document.getElementById(`commentForm_send`);
				if(comment_reply_form_button){
					comment_reply_form_button.classList.add('pointer-events-none');
					comment_reply_form_button.innerText=(_locales('Sending...'))
				}
				if(ValidationCheck_comment(comment)) {					
					if(await API_gas_backendApi_new_commentSend(userData.username, userData.id, "null", comment)){
						window.alert(_locales('Comment posted!'));
						window.location.href=(`${window.location}`);
					}else{
						window.alert(_locales('There was a problem posting the comment!'));
						if(comment_reply_form_button){
							comment_reply_form_button.classList.remove('pointer-events-none');
							comment_reply_form_button.innerText=(_locales('Post'))
						}
					}
				}else{
					window.alert(_locales('At least one non-space character is required!'));
					if(comment_reply_form_button){
						comment_reply_form_button.classList.remove('pointer-events-none');
						comment_reply_form_button.innerText=(_locales('Post'))
					}
				}
			} else {
				window.alert(_locales('Processing user information!'));
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
					<Header userData={userData} btmSpace/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<ContentsSET contentTitle={"home"}/>
							<ScratchStudioAds/>
							<CardContents durationPls={100}>
								<CardHeader>
									<CardTitle>{_locales('Comments')}</CardTitle>
								</CardHeader>
								<CardContent>
									<Textarea placeholder={_locales('Write a comment')} onChange={(e) => setComment(e.target.value)} />
								</CardContent>
								<CardFooter className="flex flex-wrap gap-2 animate-fade-down animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
									{userData? (
										<Button id="commentForm_send" onClick={CommentForm_send_ButtonClick}>{_locales('Post')}</Button>
									):(									
										<AlertDialogCustomButton_loginUserOnly>
											<Button>{_locales('Post')}</Button>
										</AlertDialogCustomButton_loginUserOnly>
									)}
									<Button variant="outline">{_locales('Cancel')}</Button>
								</CardFooter>
								<CommentsHtmlContents commentsRes={commentsRes} comments={comments} userData={userData}/>
							</CardContents>
						</section>
					</Main>
				</ElementGroup>
				<Footer/>
			</div>
		</>
	);
}
