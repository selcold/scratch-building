// /src/app/page.tsx

"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { DarkModeSET } from "@/components/client/site/main";
import { AlertDialogCustomButton_loginUserOnly } from "@/components/client/site/AlertDialog";
import { HeadCustom_config } from "@/components/client/site/metaCustom";
import { _cfgSite } from "@/components/configs/siteLinks";
import { ContentsSET } from "@/components/client/elements/contents";
import { _cfg_logs } from "@/components/configs/config";
import { ScratchStudioAds } from "@/components/client/site/scratchAds";
import { ScratchComment_Check } from "@/components/client/site/scratchComments";

import type { Viewport } from "next";
import { ScratchAuthGET_session } from "scratch-auth-react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

function Home() {
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

  const [comments, setComments] = useState<any>([]);
  const [commentsRes, setCommentsRes] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Server_GetRequest_Comments();
        setComments(result);
        if (result.length > 0) {
          const a = result["0"];
          if (a.request_mode) {
            console.log(a.request_mode);
          } else {
            setCommentsRes(true);
          }
        } else {
          setCommentsRes(true);
        }
      } catch (error) {
        console.error("コメントの取得中にエラーが発生しました:", error);
      }
    };
    fetchData();
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null); // HTMLTextAreaElement型でuseRefを初期化

  // コメント送信
  const CommentForm_send_ButtonClick = async () => {
    if (typeof window !== "undefined") {
      if (textareaRef.current) {
        const comment = textareaRef.current.value;
        if (userData.username && userData.id) {
          const comment_reply_form_button =
            document.getElementById(`commentForm_send`);
          if (comment_reply_form_button) {
            comment_reply_form_button.classList.add("pointer-events-none");
            comment_reply_form_button.innerText = _locales("Sending...");
          }

          const validationResult = ScratchComment_Check(
            userData.username,
            comment
          );
          if (validationResult.status) {
            if (
              await API_gas_backendApi_new_commentSend(
                userData.username,
                userData.id,
                validationResult.tag ? validationResult.tag : "null",
                validationResult.content
              )
            ) {
              window.alert(_locales("Comment posted!"));
              window.location.href = `${window.location}`;
            } else {
              window.alert(
                _locales("There was a problem posting the comment!")
              );
              if (comment_reply_form_button) {
                comment_reply_form_button.classList.remove(
                  "pointer-events-none"
                );
                comment_reply_form_button.innerText = _locales("Post");
              }
            }
          } else {
            window.alert(
              _locales(validationResult.content ? validationResult.content : "")
            );
            if (comment_reply_form_button) {
              comment_reply_form_button.classList.remove("pointer-events-none");
              comment_reply_form_button.innerText = _locales("Post");
            }
          }
        } else {
          window.alert(_locales("Processing user information!"));
        }
      }
    }
  };

  function CommentForm() {
    return (
      <>
        <CardHeader>
          <CardTitle>{_locales("Comments")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            ref={textareaRef}
            placeholder={_locales("Write a comment")}
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 animate-fade-down animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
          {userData ? (
            <Button
              id="commentForm_send"
              onClick={CommentForm_send_ButtonClick}
            >
              {_locales("Post")}
            </Button>
          ) : (
            <AlertDialogCustomButton_loginUserOnly>
              <Button>{_locales("Post")}</Button>
            </AlertDialogCustomButton_loginUserOnly>
          )}
          <Button variant="outline">{_locales("Cancel")}</Button>
        </CardFooter>
        <CommentsHtmlContents
          commentsRes={commentsRes}
          comments={comments}
          userData={userData}
        />
      </>
    );
  }

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
              <ContentsSET contentTitle={"home"} />
              <ScratchStudioAds />
              <CardContents durationPls={100}>
                <CommentForm />
              </CardContents>
            </section>
          </Main>
        </ElementGroup>
        <Footer />
      </div>
    </>
  );
}

export default Home;
