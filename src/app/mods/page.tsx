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
import { contentObj_mods_json } from "../../../contents/contentObj_mods";

export default function Home() {

	// headカスタム
	const Head_config = {
		title: `MOD | ${_locales(_cfgSite.title)}`,
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
                    console.log('login:',storedUsername);
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
						console.log(userData);
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

    if (!isLangLoaded) {
        return <Loading />;
    }

	if (isLangLoaded && NetworkStatus === "offline") {
		return (<><h1>offline</h1></>);
	}

	console.log(contentObj_mods_json)

	return (
		<>
			<div>
				<ElementGroup>
					<Header userData={userData} btmSpace/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<ContentsSET contentTitle={"home"}/>
						</section>
					</Main>
				</ElementGroup>
				<Footer/>
			</div>
		</>
	);
}
