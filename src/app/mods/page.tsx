// /src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ScratchAuthGET_UserProfile } from "@/components/server/scratch";
import Footer from "@/components/client/elements/footer";
import Header from "@/components/client/elements/header";
import Loading from "@/components/client/elements/loading";
import { ElementGroup, Main } from "@/components/client/elements/main";
import Image from "next/image";
import { _locales } from "@/components/client/site/_locales";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContents } from "@/components/client/elements/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CommentsHTML,
  CommentsHtmlContents,
} from "@/components/client/elements/comments";
import {
  API_gas_backendApi_new_commentSend,
  Server_GetRequest_Comments,
} from "@/components/server/comments";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DarkModeSET } from "@/components/client/site/main";
import { AlertDialogCustomButton_loginUserOnly } from "@/components/client/site/AlertDialog";
import { HeadCustom_config } from "@/components/client/site/metaCustom";
import { _cfgSite } from "@/components/configs/siteLinks";
import {
  ContentsSET,
  ContentsGET_ModAll,
} from "@/components/client/elements/contents";
import { _cfg_logs } from "@/components/configs/config";
import { ScratchAuthGET_session } from "scratch-auth-react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const param_tab = searchParams.get('tab');
  const tab_defaultValue = (param_tab === 'all' || param_tab === 'list') ? param_tab : 'list';

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
  const [userData_profile_bio, set_userData_profile_bio] = useState<any | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          DarkModeSET();
          window.addEventListener("offline", (e) => {
            setNetworkStatus("offline");
          });
          window.addEventListener("online", (e) => {
            setNetworkStatus("online");
          });

          const storedUsername = await ScratchAuthGET_session(); // session(ユーザー名)を取得
          setUsername(storedUsername); // session(ユーザー名)を変数に保存
          if (_cfg_logs.scratchAuth_userData_log) {
            console.log("login:", storedUsername);
          }
          if (storedUsername) {
            const userData = await ScratchAuthGET_UserProfile(storedUsername);
            if (userData) {
              if (_cfg_logs.scratchAuth_userData_log) {
                console.log(userData);
              }
              setUserId(userData?.id || null);
              setUserImage(userData?.profile?.images["90x90"] || null);
              set_userData_profile_bio(userData?.profile?.bio || null);
              setUserData(userData);
            } else {
              console.warn("userData null");
            }
          }
        }
        setPageLoaded(true);
      } catch (error) {
        console.error("fetchUserData:", error);
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
    return (
      <>
        <h1>offline</h1>
      </>
    );
  }

  return (
    <>
      <div>
        <ElementGroup>
          <Header userData={userData} btmSpace />
          <Main>
            <section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
              <ContentsSET contentTitle={"mods"} />
              <Tabs
                defaultValue={tab_defaultValue}
                className="w-full shadow-lg animate-fade-up animate-once animate-duration-[350ms] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">{_locales("All")}</TabsTrigger>
                  <TabsTrigger value="list">{_locales("List")}</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ContentsGET_ModAll mode="all" />
                </TabsContent>
                <TabsContent value="list">
                  <ContentsGET_ModAll mode="list" />
                </TabsContent>
              </Tabs>
            </section>
          </Main>
        </ElementGroup>
        <Footer />
      </div>
    </>
  );
}

// <ContentsSET_ModList/>
