// /src/components/frontend/elements/header.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import {
  BarChart2,
  Cat,
  CircleDot,
  Cloud,
  CreditCard,
  Eclipse,
  Fingerprint,
  Github,
  HomeIcon,
  Keyboard,
  LayoutGrid,
  LayoutPanelLeft,
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  MessageCircleMore,
  MessageSquare,
  Moon,
  Plus,
  PlusCircle,
  Settings,
  SunMoon,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { _locales } from "../site/_locales";
import {
  _cfgImages,
  _cfgLinks,
  _cfgSite,
  _cfgSiteLinks,
} from "@/components/configs/siteLinks";
import {
  getDecryptedSessionId,
  setEncryptedUsername,
} from "@/components/server/cookie";
import { DarkModeChange, DarkModeGET } from "../site/main";
import Image from "next/image";
import Link from "next/link";
import { HeaderBtmSpace } from "./main";
import { ScratchAuth_Login, ScratchAuth_Logout } from "scratch-auth-react";

const HeaderNav = [
  { name: _locales("Home"), href: _cfgSiteLinks.home, target: "_self" },
  { name: _locales("Game"), href: _cfgSiteLinks.games, target: "_self" },
  { name: _locales("MOD"), href: _cfgSiteLinks.mods, target: "_self" },
  { name: _locales("Shop"), href: _cfgSiteLinks.shop, target: "_self" },
  { name: _locales("Q&A"), href: _cfgSiteLinks.qa, target: "_self" },
];

export default function Header({
  userData,
  btmSpace,
  title,
}: {
  userData: any;
  btmSpace?: boolean;
  title?: null | string;
}) {
  const username = userData?.username || "";
  const user_image =
    userData?.profile?.images["90x90"] || _cfgImages.links_icon_user_guest_png;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-4 z-[49] flex justify-between items-center gap-4 rounded-lg backdrop-blur-md border-[1px] border-neutral-500/50 text-white bg-black/50 dark:bg-white/10 w-[95%] max-w-7xl m-auto h-[50px] px-4 py-2 animate-fade-down animate-once animate-duration-350 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards`}
      >
        <Link href={_cfgSiteLinks.home}>
          <div className="flex flex-row items-center gap-3">
            <Image
              priority
              src={_cfgImages.links_icon_png}
              alt={`Logo`}
              width={33}
              height={33}
            />
            <h1 className="font-semibold">{_locales(_cfgSite.title)}</h1>
          </div>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex flex-row items-center gap-3">
            {HeaderNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  target={item.target}
                  className={`uppercase hover:opacity-60 transition duration-200`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block h-[30px]">
          <MyAccount
            userData={userData}
            username={username}
            user_image={user_image}
          />
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger
              asChild
              className="flex border-none bg-transparent p-0"
            >
              <Button
                variant="outline"
                className="w-auto h-auto m-auto"
                aria-label="navigation"
              >
                <FontAwesomeIcon icon={faBars} className="text-[18px]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="border-neutral-300 dark:border-neutral-800 border-b-[1px] pb-3">
                <MyAccount
                  userData={userData}
                  username={username}
                  user_image={user_image}
                />
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
                      <Link
                        href={item.href}
                        target={item.target}
                        className={`hover:opacity-60 transition duration-200`}
                      >
                        {item.name}
                      </Link>
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
      {btmSpace ? <HeaderBtmSpace title={title ? title : null} /> : <></>}
    </>
  );
}

export function MyAccount({
  userData,
  username,
  user_image,
}: {
  userData: any;
  username: string;
  user_image: string;
}) {
  return (
    <DropdownMenu>
      <div className="flex items-center gap-3">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" bg-transparent border-[1px] rounded-full w-[30px] h-[30px] p-0 select-none"
          >
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage
                src={user_image}
                alt={username ? `@${username}` : "@guest"}
              />
              <AvatarFallback>ICO</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <span>{username}</span>
      </div>
      <DropdownMenuContent className="w-56 select-none">
        <DropdownMenuLabel>{_locales("My Account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {username ? (
            <>
              <Link
                href={`https://scratch.mit.edu/users/${username}/`}
                target="_block"
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{_locales("Profile")}</span>
                </DropdownMenuItem>
              </Link>
              <Link
                href={`https://scratch.mit.edu/accounts/settings/`}
                target="_block"
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{_locales("Settings")}</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : (
            <>
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                <span>{_locales("Profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>{_locales("Settings")}</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Eclipse className="mr-2 h-4 w-4" />
              <span>{_locales("Mode")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {DarkModeGET() === "true" ? (
                  <>
                    <DropdownMenuItem disabled>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>{_locales("dark")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => DarkModeChange("false")}>
                      <SunMoon className="mr-2 h-4 w-4" />
                      <span>{_locales("light")}</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => DarkModeChange("true")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>{_locales("dark")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <SunMoon className="mr-2 h-4 w-4" />
                      <span>{_locales("light")}</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={_cfgSiteLinks.issues}>
            <DropdownMenuItem>
              <CircleDot className="mr-2 h-4 w-4" />
              <span>{_locales("Report an Issue")}</span>
            </DropdownMenuItem>
          </Link>
          <Link
            href={`https://github.com/selcold/scratch-building/discussions`}
            target="_block"
          >
            <DropdownMenuItem>
              <MessageCircleMore className="mr-2 h-4 w-4" />
              <span>{_locales("Discussions")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LayoutGrid className="mr-2 h-4 w-4" />
              <span>{_locales("App")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled>
                  <LayoutPanelLeft className="mr-2 h-4 w-4" />
                  <span>{_locales("Sglid")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <LayoutPanelLeft className="mr-2 h-4 w-4" />
                  <span>{_locales("ScPay")}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Cat className="mr-2 h-4 w-4" />
              <span>{_locales("Scratch Auth")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link
                  href={_cfgLinks.scratch_auth_pageLink_home}
                  target="_block"
                >
                  <DropdownMenuItem>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>{_locales("Website")}</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={_cfgLinks.scratch_auth_stats_page} target="_block">
                  <DropdownMenuItem>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>{_locales("Status page")}</span>
                  </DropdownMenuItem>
                </Link>
                {username ? (
                  <>
                    <DropdownMenuItem disabled>
                      <Fingerprint className="mr-2 h-4 w-4" />
                      <span>{_locales("Auth")}</span>
                    </DropdownMenuItem>
                    {/*
                                    <Link href={`https://auth.itinerary.eu.org/auth?`} target="_block">
                                    </Link>
                                    */}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem disabled>
                      <Fingerprint className="mr-2 h-4 w-4" />
                      <span>{_locales("Auth")}</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {userData ? (
          <>
            <DropdownMenuItem onClick={() => ScratchAuth_Logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{_locales("Log out")}</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => ScratchAuth_Login()}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>{_locales("Login")}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
