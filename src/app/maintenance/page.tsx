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
import { ScratchAuth_logout, ScratchAuth_redirectToAuth, Scratch_GET_user_image, ValidationCheck_comment } from "@/components/frontend/_scratch";

import { Terminal, CalendarDays, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert"
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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { formatDateTime } from "@/components/frontend/site/formatDateTime";
import { DarkModeSET } from "@/components/frontend/site/main";
import { HeadCustom_config } from "@/components/frontend/site/metaCustom";
import { _cfgSite } from "@/components/configs/siteLinks";

export default function Home() {

	// headカスタム
	const Head_config = {
		title: `${_locales('maintenance')} | ${_locales(_cfgSite.title)}`,
	};
	HeadCustom_config(Head_config);

	const [NetworkStatus, setNetworkStatus] = useState<string>("online");
	const [isLangLoaded, setPageLoaded] = useState(false);
    const [userData, setUserData] = useState<any | null>(null);
	const [requestUrl, setRequestUrl] = useState<string | null>(null);

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
                    console.log('login:',storedUsername);
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
						console.log(userData);
                        setUserData(userData);
                    }

					const paramsString = window.location.search;
                    const searchParams = new URLSearchParams(paramsString);
                    const requestUrl = searchParams.get("requestUrl");
					if(searchParams.get("requestUrl")){
						setRequestUrl(requestUrl);
					}else{
						window.location.href = `/`
					}

					const currentDate = new Date();

					toast(_locales('Access Denied!'), {
						description: `${formatDateTime(currentDate)}`,
						action: {
							label: _locales('Close'),
							onClick: () => console.log("Close"),
						},
					})
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

	return (
		<>
			<div>
				<ElementGroup>
					<Header userData={userData} btmSpace/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<Alert>
								<Terminal className="h-4 w-4" />
								<AlertTitle>Request Error !</AlertTitle>
								<AlertDescription>
								{`The GET request you sent to ${requestUrl} was blocked.`}
								</AlertDescription>
							</Alert>
							<CardContents durationPls={0}>
								<CardHeader className="text-center break-all">
									<CardTitle>{requestUrl}</CardTitle>
									<CardDescription>{_locales('The page you accessed is currently under maintenance or inaccessible!')}</CardDescription>
								</CardHeader>
								<CardFooter className="flex flex-wrap justify-center">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button>{_locales('Refresh')}</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>{_locales('Reload')}</AlertDialogTitle>
												<AlertDialogDescription>
												{_locales('The page you accessed is currently under maintenance or inaccessible!')}
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel onClick={() => window.location.href = `/`}>{_locales('Go to Home')}</AlertDialogCancel>
												<AlertDialogAction onClick={() => window.location.href = `${requestUrl}`}>{_locales('Refresh Page')}</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</CardFooter>
							</CardContents>
							<CardContents durationPls={50}>
								<CardHeader>
									<CardTitle>{_locales('Questions & Answers')}</CardTitle>
								</CardHeader>
								<CardContent>
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger>{_locales('Why am I seeing this page?')}</AccordionTrigger>
											<AccordionContent>
											{_locales('This page is redirected to when the accessed page is under maintenance or inaccessible.')}
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2">
											<AccordionTrigger>{_locales('When will maintenance be completed?')}</AccordionTrigger>
											<AccordionContent>
											{_locales('For the completion date and time of maintenance, please contact directly the site management or development team members.')}
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3">
											<AccordionTrigger>{_locales(`Can't access anymore?`)}</AccordionTrigger>
											<AccordionContent>
											{_locales(`That's not the case. If the page you accessed is under maintenance or inaccessible, this page will be displayed, indicating temporary access restriction.`)}
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</CardContent>
							</CardContents>
							<CardContents durationPls={100}>
								<CardHeader>
									<CardTitle>{_locales('Management & Developers')}</CardTitle>
								</CardHeader>
								<CardContent>
									<HoverCard>
										<HoverCardTrigger asChild>
											<Button variant="link">@selcold</Button>
										</HoverCardTrigger>
										<HoverCardContent className="w-80">
											<div className="flex justify-between space-x-4">
												<Avatar>
													<AvatarImage src="https://github.com/selcold.png" />
													<AvatarFallback>SL</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<h4 className="text-sm font-semibold">@selcold</h4>
													<p className="text-sm">
													Feel free to explore our projects and contribute to our community.
													</p>
													<div className="flex items-center pt-2">
													<MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
													<span className="text-xs text-muted-foreground">
														Japan
													</span>
													</div>
												</div>
											</div>
										</HoverCardContent>
									</HoverCard>
									<HoverCard>
										<HoverCardTrigger asChild>
											<Button variant="link">@fun117</Button>
										</HoverCardTrigger>
										<HoverCardContent className="w-80">
											<div className="flex justify-between space-x-4">
												<Avatar>
													<AvatarImage src="https://github.com/fun117.png" />
													<AvatarFallback>FN</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<h4 className="text-sm font-semibold">@fun117</h4>
													<p className="text-sm">
													A passionate Programmer from Japan
													</p>
													<div className="flex items-center pt-2">
													<MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
													<span className="text-xs text-muted-foreground">
														Japan
													</span>
													</div>
												</div>
											</div>
										</HoverCardContent>
									</HoverCard>
									<HoverCard>
										<HoverCardTrigger asChild>
											<Button variant="link">@Masaabu</Button>
										</HoverCardTrigger>
										<HoverCardContent className="w-80">
											<div className="flex justify-between space-x-4">
												<Avatar>
													<AvatarImage src="https://github.com/Masaabu.png" />
													<AvatarFallback>MA</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<h4 className="text-sm font-semibold">@Masaabu</h4>
													<p className="text-sm">
													フォロバなしで生きていく暇人 - 宣伝やめてね(‾◡◝)
													</p>
													<div className="flex items-center pt-2">
													<MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
													<span className="text-xs text-muted-foreground">
														Japan
													</span>
													</div>
												</div>
											</div>
										</HoverCardContent>
									</HoverCard>
								</CardContent>
							</CardContents>
						</section>
					</Main>
				</ElementGroup>
				<Footer/>
			</div>
		</>
	);
}
