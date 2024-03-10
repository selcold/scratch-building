// /src/components/frontend/elements/header.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogIn,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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

import { useEffect, useState } from "react";
import { ScratchAuth_logout, ScratchAuth_redirectToAuth } from "../_scratch";
import { _locales } from "../site/_locales";
import { _cfgSite } from "@/components/configs/siteLinks"

const HeaderNav = [
	{ name: _locales('Home'), href: _cfgSite.links_home, target: '_self' },
]

export default function Header({ userData }: { userData: any }) {
    let username = "";
    if(userData){
        username = userData.username;
    }

    return (
        <>
            <header className="fixed inset-x-0 top-4 z-50 flex justify-between items-center gap-4 rounded-lg backdrop-blur-md border-[1px] border-neutral-500/50 text-black dark:text-white w-[95%] max-w-7xl m-auto h-[48px] px-4 py-2 animate-fade-down animate-once animate-duration-350 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                <h1>Header</h1>
                <nav className="hidden md:block">
                    <ul className="flex flex-row items-center gap-3">
                        {HeaderNav.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                target={item.target}
                                className={`hover:text-neutral-500 dark:hover:text-neutral-400 transition duration-200`}
                            >
                                {item.name}
                            </a>
                        </li>
						))}
                    </ul>
                </nav>
                <div className="hidden md:block w-[30px] h-[30px]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className=" bg-transparent border-[1px] rounded-full w-[30px] h-[30px] p-0 select-none">
                                <Avatar className="w-[30px] h-[30px]">
                                    <AvatarImage src={userData? userData.profile.images['90x90'] : '/icons/scratch/scratch_guest.png'} alt={username? `@${username}` : '@guest'}/>
                                    <AvatarFallback>ICO</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 select-none">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {username? (
                                <>
                                    <DropdownMenuItem onClick={() => open(`https://scratch.mit.edu/users/${username}/`)}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => open(`https://scratch.mit.edu/accounts/settings/`)}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </>
                                ):(
                                <>
                                    <DropdownMenuItem disabled>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </>
                                )}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem disabled>
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Team</span>
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        <span>Invite users</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem disabled>
                                                <Mail className="mr-2 h-4 w-4" />
                                                <span>Email</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem disabled>
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                <span>Message</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem disabled>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                <span>More...</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <Cloud className="mr-2 h-4 w-4" />
                                <span>API</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {userData? (
                            <>
                                <DropdownMenuItem onClick={() => ScratchAuth_logout()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>{_locales('Log out')}</span>
                                </DropdownMenuItem>
                            </>
                            ):(
                            <>
                                <DropdownMenuItem onClick={() => ScratchAuth_redirectToAuth()}>
                                    <LogIn className="mr-2 h-4 w-4" />
                                    <span>{_locales('Login')}</span>
                                </DropdownMenuItem>
                            </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="block md:hidden">
                <Sheet>
                    <SheetTrigger asChild className="flex border-none bg-transparent p-0">
                        <Button variant="outline" className="w-auto h-auto m-auto"><FontAwesomeIcon icon={faBars} className="text-[18px]"/></Button>
                    </SheetTrigger>
                    <SheetContent>
                        <div className="border-neutral-300 border-b-[1px] pb-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className=" bg-transparent border-[1px] rounded-full w-[30px] h-[30px] p-0 select-none">
                                        <Avatar className="w-[30px] h-[30px]">
                                            <AvatarImage src={userData? userData.profile.images['90x90'] : '/icons/scratch/scratch_guest.png'} alt={username? `@${username}` : '@guest'}/>
                                            <AvatarFallback>ICO</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 select-none">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {username? (
                                        <>
                                            <DropdownMenuItem onClick={() => open(`https://scratch.mit.edu/users/${username}/`)}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => open(`https://scratch.mit.edu/accounts/settings/`)}>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </>
                                        ):(
                                        <>
                                            <DropdownMenuItem disabled>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem disabled>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </>
                                        )}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem disabled>
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Team</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                <span>Invite users</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem disabled>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        <span>Email</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem disabled>
                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                        <span>Message</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem disabled>
                                                        <PlusCircle className="mr-2 h-4 w-4" />
                                                        <span>More...</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem disabled>
                                        <LifeBuoy className="mr-2 h-4 w-4" />
                                        <span>Support</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        <Cloud className="mr-2 h-4 w-4" />
                                        <span>API</span>
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {userData? (
                                    <>
                                        <DropdownMenuItem onClick={() => ScratchAuth_logout()}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>{_locales('Log out')}</span>
                                        </DropdownMenuItem>
                                    </>
                                    ):(
                                    <>
                                        <DropdownMenuItem onClick={() => ScratchAuth_redirectToAuth()}>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            <span>{_locales('Login')}</span>
                                        </DropdownMenuItem>
                                    </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <SheetHeader>
                            {/*                            
                            <SheetTitle>{_cfgSite.title}</SheetTitle>
                            <SheetDescription>
                                
                            </SheetDescription>
                            */}
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <ul className="flex flex-col items-start gap-3">
                                {HeaderNav.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        target={item.target}
                                        className={`transition duration-200`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <SheetFooter>
                            {/*
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                            */}
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                </div>
            </header>
        </>
    );
}