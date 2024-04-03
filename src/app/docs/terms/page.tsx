// /src/app/page.tsx

'use client';

import { useEffect, useState } from "react";
import { ScratchAuthGET_UserProfile } from "@/components/server/scratch";
import Footer from "@/components/client/elements/footer";
import Header from "@/components/client/elements/header";
import Loading from "@/components/client/elements/loading";
import { ElementGroup, Main } from "@/components/client/elements/main";
import Image from "next/image";
import { _locales } from "@/components/client/site/_locales";

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
import { CardContents } from "@/components/client/elements/card";
import { Textarea } from "@/components/ui/textarea";
import { CommentsHTML, CommentsHtmlContents } from "@/components/client/elements/comments";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/server/comments";
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
} from "@/components/ui/alert-dialog";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DarkModeGET, DarkModeSET } from "@/components/client/site/main";
import { AlertDialogCustomButton_loginUserOnly } from "@/components/client/site/AlertDialog";
import { HeadCustom_config } from "@/components/client/site/metaCustom";
import { _cfgSite, _cfgSiteLinks } from "@/components/configs/siteLinks";
import { ContentsSET } from "@/components/client/elements/contents";
import { _cfg_logs } from "@/components/configs/config";
import { ScratchAuthGET_session } from "scratch-auth-react";

export default function Home() {

	// headカスタム
	const Head_config = {
		title: `${_locales('Terms of Use')} | ${_locales(_cfgSite.title)}`,
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

					const storedUsername = await ScratchAuthGET_session(); // session(ユーザー名)を取得
                    setUsername(storedUsername);// session(ユーザー名)を変数に保存
					if(_cfg_logs.scratchAuth_userData_log){
						console.log('login:',storedUsername);
					}
					if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
						if(userData){
							if(_cfg_logs.scratchAuth_userData_log){
								console.log(userData);
							}
							setUserId(userData?.id || null)
							setUserImage(userData?.profile?.images['90x90'] || null);
							set_userData_profile_bio(userData?.profile?.bio || null);
							setUserData(userData);
						}else{
							console.warn('userData null');
						}
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('fetchUserData:', error);
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

	return (
		<>
			<div>
				<ElementGroup>
					<Header userData={userData} btmSpace/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<ContentsSET contentTitle={"terms"}/>
							<CardContents className="p-5">
								<section className="flex flex-col gap-3">
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Acceptance of Terms of Use')}</CardTitle>
										<CardDescription>
											<li>{_locales('Before using this website, please read these terms of use carefully. By agreeing to these terms of use, you may use this website. By using this website, users are deemed to have agreed to these terms of use.')}</li>
										</CardDescription>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Site Usage')}</CardTitle>
										<CardDescription>
											<li>{_locales('This site is intended to provide users with access to games and content. Users are expected to use this site legally and in accordance with the terms of service.')}</li>
											<li>{_locales('Modification, reproduction, reprinting, sale, or unauthorized use of all or part of this site is prohibited.')}</li>
										</CardDescription>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Community Rules')}</CardTitle>
										<CardDescription>
											<li>{_locales(`Users participating in this site's community are expected to adhere to the community guidelines. Posting inappropriate behavior or content is prohibited.`)}</li>
										</CardDescription>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Disclaimer')}</CardTitle>
										<CardDescription>
											<li>{_locales(`The use of this website is at the user's own risk, and the website administrator shall not be held responsible for any damages incurred by the user's use of this website.`)}</li>
										</CardDescription>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Changes to the Terms of Use')}</CardTitle>
										<CardDescription>
											<li>{_locales(`This Terms of Service may be subject to change at the discretion of the site administrator. Users are encouraged to regularly review this Terms of Service.`)}</li>
										</CardDescription>
									</div>
									<div className="flex flex-col gap-2 w-full">
										<CardTitle>{_locales('Contact')}</CardTitle>
										<CardDescription>
											<li>{_locales('For inquiries or contact regarding this website, please contact the site administrator or management team.')}</li>
										</CardDescription>
									</div>
								</section>
							</CardContents>
						</section>
					</Main>
				</ElementGroup>
				<Footer
					Breadcrumb={
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href={_cfgSiteLinks.home}>{_locales('Home')}</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href={_cfgSiteLinks.docs}>{_locales('Docs')}</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{_locales('Terms of Use')}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					}
				/>
			</div>
		</>
	);
}
