'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import links_config from '../../public/assets/data/links_config';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {

    return (
        <>
            <div className="hidden md:block">
                <div className="fadeDown fixed inset-x-0 top-4 z-50 w-[95%] m-auto bg-[your-background-color] backdrop-blur-md">
                    <div className="flex justify-between text-white max-w-7xl gap-4 mx-auto border border-[#FFFFFF]/[0.16] px-4 py-2 rounded-lg w-full inset-x-0 backdrop-blur-md z-50">
                        <a className="flex items-center space-x-2 flex-shrink-0 relative z-50" href={links_config.site_url_home}>
                            <img alt="Logo" loading="lazy" width="10" height="10" decoding="async" data-nimg="1" className="transition duration-300 transform blur-0 scale-100 h-5 w-5" style={{color:`transparent`}} src={links_config.ScratchBuilding_logo_url} />
                            <span className="text-lg text-[#CCCCCC] font-medium">{links_config.site_title}</span>
                        </a>
                        <div className="flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-2 space-x-6 text-sm items-center justify-center px-6 font-medium overflow-hidden">
                            <a rel="noopener noreferrer" href={links_config.site_url_home} className="relative group bg-transparent hover:text-white/[0.64] transition duration-200">ホーム</a>
                            <a rel="noopener noreferrer" href={links_config.site_url_mods} className="relative group bg-transparent hover:text-white/[0.64] transition duration-200">MOD</a>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>ログイン</SignInButton>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden">
                <div className="fixed top-4 w-full z-50 ">
                    <div className="items-center justify-between px-4 w-full flex">
                        <div id='headerMob' className="fadeDown w-full flex items-center justify-between  backdrop-blur-md border border-[#FFFFFF]/[0.16] px-4 py-2 rounded-full ">
                            <a className="flex items-center space-x-2 flex-shrink-0 relative z-50" href={links_config.site_url_home}>
                                <img alt="Cursor Logo" loading="lazy" width="10" height="10" decoding="async" data-nimg="1" className="transition duration-300 transform blur-0 scale-100 h-5 w-5" style={{color:`transparent`}} src={links_config.ScratchBuilding_logo_url} />
                                <span className="text-lg text-[#CCCCCC] font-medium">{links_config.site_title}</span>
                            </a>
                            <div className='flex items-center gap-1'>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className='bg-transparent border-none h-5 p-2'>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-white h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                                            </svg>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>{links_config.site_title}</SheetTitle>
                                            <SheetDescription>
                                            {links_config.site_description_short}
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4 items-center">
                                            <li>
                                                <a href={links_config.site_url_home} rel="noopener noreferrer" className="relative">
                                                ホーム
                                                </a>
                                            </li>
                                            <li>
                                                <a href={links_config.site_url_mods} rel="noopener noreferrer" className="relative">
                                                MOD
                                                </a>
                                            </li>
                                        </div>
                                        <SignedIn>
                                            <UserButton afterSignOutUrl="/" />
                                        </SignedIn>
                                        <SignedOut>
                                            <SignInButton>ログイン</SignInButton>
                                        </SignedOut>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button type="submit" className='button_border_1'>閉じる</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};