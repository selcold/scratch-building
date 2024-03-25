// /src/components/frontend/site/scratchAds.tsx

import { useEffect, useState } from "react";
import { ScratchStudioAd } from '@/components/backend/scratch/studioAds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { _locales, _localesContent } from '@/components/frontend/site/_locales';
import { CardContents } from '@/components/frontend/elements/card';
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { _cfgImages } from "@/components/configs/siteLinks";
import { CircleMinus, CirclePlus, Flag, Folder, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ScratchStudioAds({ className, durationPls }: { className?: null | string, durationPls?: null | number }) {
    
    const [ScratchAd, setScratchAds] = useState<any | null>(null);
    const [isAdsOpen, setAdsOpen] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const ads = await ScratchStudioAd(); // await キーワードを追加
                setScratchAds(ads);
            } catch (error) {
                console.error('ScratchAds fetchUserData:', error);
            }
        }
        fetchUserData();
    }, []);

    const handleOpenAds = (is?: boolean) => {
        if(!is){
            setAdsOpen(false);
        }else{
            setAdsOpen(true);
        }
    };

    function ScratchAdsDropdownMenu() {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hover:scale-105 transition-all duration-300 ease-in-out">
                        <Avatar className="h-10 w-10 rounded-full border border-neutral-500">
                            <AvatarImage src={ScratchAd.avatar['90x90']} alt={ScratchAd.username} className="rounded-full"/>
                            <AvatarFallback>ICO</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>{ScratchAd.username}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={`https://docs.google.com/forms/d/e/1FAIpQLSczKklgvbiyc3hkmjdELUPyvAL_1kZDkK5vYv83WDV06QqXsA/viewform?entry.1486506055=${_localesContent("日本語","English")}&entry.765880011=${ScratchAd.id}`} target="_block" aria-label="ScratchAds">
                                <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4"/>
                                    <span className="text-sm">{_locales('Report')}</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => isAdsOpen ? handleOpenAds(false) : handleOpenAds(true)}>
                                {isAdsOpen? (
                                    <CircleMinus className="mr-2 h-4 w-4"/>
                                ):(
                                    <CirclePlus className="mr-2 h-4 w-4"/>
                                )}
                                <span className="text-sm">{isAdsOpen? _locales('Close') : _locales('Open')}</span>
                            </DropdownMenuItem>
                            <Link href={`https://scratch.mit.edu/projects/${ScratchAd.id}/`} target="_block">
                                <DropdownMenuItem>
                                    <Folder className="mr-2 h-4 w-4"/>
                                    {_locales('View Advertising Projects')}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={`https://scratch.mit.edu/studios/34675120/`} target="_block">
                                <DropdownMenuItem>
                                    <FolderPlus className="mr-2 h-4 w-4"/>
                                    {_locales('Apply for Advertising')}
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    }

    if(!ScratchAd){
        return (
            <CardContents className={className? className : ""} durationPls={durationPls? durationPls : 0}>
                <Skeleton className="relative border max-w-[800px] min-h-[239.183px] md:min-h-[400px] h-full rounded-lg shadow-md select-none"/>
            </CardContents>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <Card className={`${className? className : "relative"}`}>
                    {isAdsOpen?
                    <>
                        <Link href={`https://scratch.mit.edu/projects/${ScratchAd.id}/`} target='_block' className="flex border bg-card text-card-foreground bg-no-repeat bg-cover bg-center max-w-[800px] min-h-[239.183px] md:min-h-[400px] w-full h-full rounded-lg shadow-md select-none" style={{backgroundImage: `url(${ScratchAd.image})`}}>
                        </Link>
                        <div className="absolute top-1 left-1 flex items-center gap-1">
                            <h2 className="rounded-md bg-neutral-200/90 dark:bg-neutral-800/90 font-semibold md:text-2xl px-[5px] py-[3px] break-all">{ScratchAd.title}</h2>
                        </div>
                        <section className="flex">
                            <div className="absolute bottom-1 left-1 flex items-center gap-2 p-1 rounded-full group hover:bg-neutral-200/80 hover:dark:bg-neutral-800/80 transition-all duration-300 ease-in-out">
                                <ScratchAdsDropdownMenu/>
                            </div>
                        </section>
                    </>
                    :
                    <>
                        <div className="flex items-center gap-2 p-3">
                            <ScratchAdsDropdownMenu/>
                            <span>Scratch Ads</span>
                        </div>
                    </>
                    }
                </Card>
            </div>
        </>
    );
};