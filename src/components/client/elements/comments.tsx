'use client'

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faReply } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/server/comments";
import { formatDateTime } from "../site/formatDateTime";
import { Button } from "@/components/ui/button";
import { Scratch_GET_user_image } from "../_scratch";
import { AlertDialogCustomButton_NotRelease, AlertDialogCustomButton_loginUserOnly } from "../site/AlertDialog";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import { _locales } from "../site/_locales";
import { ScratchComment_Check } from "../site/scratchComments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// コピーされた後にテキストを変更する処理
async function handleCopy(uuid: string,text: string) {
    try {
        await navigator.clipboard.writeText(text);

        const copyHtml = document.getElementById(`handleCopy_${uuid}`)
        // コピーされたら状態を更新してテキストを変更
        if(copyHtml){
            copyHtml.innerText=_locales('Copy completed');
            // 一定時間後にテキストを元に戻す
            setTimeout(() => {
                copyHtml.innerText=_locales('Copy');
            }, 3000); // 3000ミリ秒 = 3秒後に元に戻す
        };
        return true
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false
    }
    
};

interface Comments {
    timestamp: Date,
    id: string,
    content: string,
    reply_Id: string | null,
    reply_group_id: string | null,
    visibility: string,
    author: {
        id: string,
        username: string,
        tag: string,
        image: string,
    },
};
export function CommentsHTML({ CommentsData, username, userId, userImage }: { CommentsData: Comments[], username: string, userId: string, userImage: string } ): JSX.Element[] {

    // コメントごとに返信コメントの数を数える関数
    const countReplies = (commentsData: Comments[], commentId: string): Comments[] => {
        return commentsData.filter(c => c.reply_group_id === commentId);
    };

    const [showRepliesMap, setShowRepliesMap] = useState<{ [key: string]: boolean }>({});
    const [commentReplies, setCommentReplies] = useState<{ [key: string]: Comments[] }>({});

    useEffect(() => {
        if (CommentsData.length > 0) {
            const countedReplies: { [key: string]: Comments[] } = {};
            CommentsData.forEach(comment => {
                countedReplies[comment.id] = countReplies(CommentsData, comment.id);
            });
            setCommentReplies(countedReplies);
        }
    }, [CommentsData]);

    var obj_commentsId: Record<string, any> = {};
    var obj_comments: Record<string, any> = {};
    var obj_comments_reply: Record<string, any> = {};
    // コメントデータのタイムスタンプを日時オブジェクトに変換
    CommentsData.forEach(comment => {
        comment.timestamp = new Date(comment.timestamp);
        obj_commentsId[comment.id] = comment;
        if (comment.reply_group_id) {
            obj_comments_reply[comment.id] = comment;
        } else {
            obj_comments[comment.id] = comment;
        }
    });
    var obj_comments_Array = Object.values(obj_comments);
    //var obj_comments_reply_Array = Object.values(obj_comments_reply);
    // タイムスタンプの新しい順にコメントデータをソート
    obj_comments_Array.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    // コメントを格納する変数
    let commentsHtml: JSX.Element[] = [];

    // コメントデータをループしてコメントごとにHTMLを生成
    obj_comments_Array.forEach(comment => {
        const formattedTimestamp = formatDateTime(comment.timestamp);
        
        // コメントフォーム
        function set_comment_reply_form(ComRepFo_mode: string, ComRepFo_group: string, ComRepFo_id: string, ComRepFo_user_tag: string, ComRepFo_replyUser: string = '') {
            const HtmlreplyForm = document.getElementById(`comment_reply_${ComRepFo_id}`);
            if (HtmlreplyForm) {
                if (HtmlreplyForm.children.length > 0) {
                    // 子要素がある場合は削除
                    HtmlreplyForm.innerHTML = '';
                } else {
                    if (ComRepFo_mode === 'comment') {
                        const root = createRoot(HtmlreplyForm);
                        root.render(
                            <div id={`comment_reply_form_${ComRepFo_id}`} className="relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem] animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                                <span className='select-none pointer-events-none'>
                                    <Image
                                    priority
                                    src={userImage}
                                    alt="ico"
                                    width={48}
                                    height={48}
                                    className="border-neutral-200 dark:border-neutral-800 border-[1px] mr-[0.5rem] overflow-clip rounded-[5px] shadow-lg"
                                    unoptimized={true}
                                    />
                                </span>
                                <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full bg-card text-card-foreground'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>
                                                <textarea id={`comment_reply_form_textarea_${ComRepFo_id}`} placeholder={_locales('Write a comment')} className='relative ml-[0.6rem] p-[0.75rem] border-[1px] bg-neutral-100 dark:bg-neutral-900 border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => replyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>{_locales('Post')}</Button>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} variant="outline" onClick={() => set_comment_reply_form('comment',ComRepFo_group, ComRepFo_id, ComRepFo_user_tag)}>{_locales('Cancel')}</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        const root = createRoot(HtmlreplyForm);
                        root.render(
                            <div id={`comment_reply_form_${ComRepFo_id}`} className="relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem] animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                                <span className='select-none pointer-events-none'>
                                    <Image
                                    priority
                                    src={userImage}
                                    alt="ico"
                                    width={48}
                                    height={48}
                                    className="border-neutral-200 dark:border-neutral-800 border-[1px] mr-[0.5rem] overflow-clip rounded-[5px] shadow-lg"
                                    unoptimized={true}
                                    />
                                </span>
                                <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full bg-card text-card-foreground'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>
                                                <textarea id={`comment_reply_form_textarea_${ComRepFo_id}`} placeholder={_locales('Write a comment')} className='relative ml-[0.6rem] p-[0.75rem] border-[1px] bbg-neutral-100 dark:bg-neutral-900 border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => replyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>{_locales('Post')}</Button>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} variant="outline" onClick={() => set_comment_reply_form('comment', ComRepFo_group, ComRepFo_id, ComRepFo_user_tag)}>{_locales('Cancel')}</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };
    
        async function replyForm_send_ButtonClick(FoSendBtCl_user_name: string, FoSendBtCl_user_Id: string, FoSendBtCl_user_tag: string, FoSendBtCl_reply_group_id: string, FoSendBtCl_reply_id: string = 'false', FoSendBtCl_replyUser: string) {
            const comment_reply_form_button = document.getElementById(`comment_reply_form_button_${FoSendBtCl_reply_id}`);
            if (comment_reply_form_button) {
                comment_reply_form_button.classList.add('pointer-events-none');
                comment_reply_form_button.innerText = (_locales('Sending...'));
                
                // この時点で要素が存在するので、以降のコードを実行
                if (!obj_commentsId[FoSendBtCl_reply_id].reply_Id) {
                    FoSendBtCl_reply_id = FoSendBtCl_reply_id;
                }
                
                const text_replyForm = document.getElementById(`comment_reply_form_textarea_${FoSendBtCl_reply_id}`) as HTMLInputElement;
                if (text_replyForm) {
                    const comment = text_replyForm.value;

                    const validationResult = ScratchComment_Check(FoSendBtCl_user_name, comment);
                    if(validationResult.status){
                        if(await API_gas_backendApi_new_commentSend(FoSendBtCl_user_name, FoSendBtCl_user_Id, validationResult.tag? validationResult.tag : "null", validationResult.content, FoSendBtCl_reply_group_id, FoSendBtCl_reply_id, FoSendBtCl_replyUser)){
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
                        window.alert(_locales(validationResult.content? validationResult.content : ""));
                        if(comment_reply_form_button){
                            comment_reply_form_button.classList.remove('pointer-events-none');
                            comment_reply_form_button.innerText=(_locales('Post'))
                        }
                    }
                    
                    return text_replyForm.value;
                } else {
                    if (typeof window !== 'undefined') {
                        window.alert(_locales('Failed to retrieve comment form!'));
                        window.location.href = (`${window.location}`);
                    }
                    return false;
                }
            } else {
                return false;
            }
        };

        function CommentBadge({ tag }: { tag: string }){
            return (
                <>
                    {tag==='developer' ?<>
                        <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                        </svg>
                        <span className="tooltiptext">{_locales('Developer')}</span>
                    </>:<>
                    {tag==='authentic' ?<>
                        <svg className="m-auto h-5 w-5 text-orange-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                            </svg>
                            <span className="tooltiptext">{_locales('Authenticator')}</span>
                    </>:<>
                    </>}</>
                    }
                </>
            )
        }

        function CommentOptionBar({ mode, commentORreply_contents }: { mode: "comment" | "reply" , commentORreply_contents: any }){

            if(mode === "reply"){
                return (
                    <>
                    {username? (
                        <>
                            <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentORreply_contents.id,`${window.location.origin}${window.location.pathname}?#commentId_${commentORreply_contents.id}`)}>
                                    <FontAwesomeIcon icon={faLink}/>
                                    <span id={`handleCopy_${commentORreply_contents.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                                </button>
                                <AlertDialogCustomButton_NotRelease>
                                    <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                        {_locales('Report')}
                                    </button>
                                </AlertDialogCustomButton_NotRelease>
                                <button title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form('comment_reply',comment.id,commentORreply_contents.id,"",commentORreply_contents.author.username)}>
                                    {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                    <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentORreply_contents.id,`${window.location.origin}${window.location.pathname}?#commentId_${commentORreply_contents.id}`)}>
                                        <FontAwesomeIcon icon={faLink}/>
                                        <span id={`handleCopy_${commentORreply_contents.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                                    </button>
                                    <AlertDialogCustomButton_loginUserOnly>
                                        <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                            {_locales('Report')}
                                        </button>
                                    </AlertDialogCustomButton_loginUserOnly>
                                    <AlertDialogCustomButton_loginUserOnly>
                                        <button title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                            {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                        </button>
                                    </AlertDialogCustomButton_loginUserOnly>
                                </div>
                            </div>
                        </>
                    )}
                    </>
                )
            }

            return (
                <>
                {username? (
                    <>
                        <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                            <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentORreply_contents.id,`${window.location.origin}${window.location.pathname}#commentId_${commentORreply_contents.id}`)}>
                                <FontAwesomeIcon icon={faLink}/>
                                <span id={`handleCopy_${commentORreply_contents.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                            </button>
                            <AlertDialogCustomButton_NotRelease>
                                <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                    {_locales('Report')}
                                </button>
                            </AlertDialogCustomButton_NotRelease>
                            <button  title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form("comment", commentORreply_contents.id, commentORreply_contents.id, "", commentORreply_contents.author.username)}>
                                {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentORreply_contents.id,`${window.location.origin}${window.location.pathname}#commentId_${commentORreply_contents.id}`)}>
                                    <FontAwesomeIcon icon={faLink}/>
                                    <span id={`handleCopy_${commentORreply_contents.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                                </button>
                                <AlertDialogCustomButton_loginUserOnly>
                                    <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                        {_locales('Report')}
                                    </button>
                                </AlertDialogCustomButton_loginUserOnly>
                                <AlertDialogCustomButton_loginUserOnly>
                                    <button title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                        {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                    </button>
                                </AlertDialogCustomButton_loginUserOnly>
                            </div>
                        </div>
                    </>
                )}
                </>
            )
        }

        function CommentReply({ children, reply, opacity, className, style }: { children?: React.ReactNode, reply: any, opacity?: number, className?: string, style?: { background: string, backgroundImage: string; } }){
            return (
                <>
                    <div key={reply.id} id={`comment_${reply.id}`} className={className? `${className} flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards` : `flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards`} style={{ opacity: opacity, background: style?.background, backgroundImage: style?.backgroundImage }}>
                        <span className="select-none pointer-events-none" style={{ opacity: opacity }}>
                            <Avatar className="border-neutral-200 dark:border-neutral-800 w-[48px] h-[48px] border-[1px] mr-[0.5rem] shadow-lg]">
                                <AvatarImage src={reply.author.image} alt={reply.author.username}/>
                                <AvatarFallback>ICO</AvatarFallback>
                            </Avatar>
                        </span>
                        <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3' style={{ opacity: opacity }}>
                            <div className='flex flex-wrap flex-row justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                                <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                    <span>{reply.author.username}</span>
                                    <span className="tooltip m-auto">
                                        <CommentBadge tag={reply.author.tag}/>
                                    </span>
                                </div>
                            </div>
                            <div id={`commentId_${reply.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                                <div className='overflow-auto whitespace-break-spaces max-h-[100px]'>
                                    <span className="text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2">@{obj_commentsId[reply.reply_Id].author.username}</span>
                                    <span>{reply.content}</span>
                                </div>
                                <div className='flex flex-wrap flex-row justify-between items-center pt-2'>
                                    <span className='text-zinc-500'>{formatDateTime(reply.timestamp)}</span>
                                    <CommentOptionBar mode="reply" commentORreply_contents={reply}/>
                                </div>
                            </div>
                            <div id={`comment_reply_${reply.id}`} className='flex flex-row flex-wrap justify-around items-center ml-[-3.5rem] w-full' style={{width:'calc(100% + 3.5rem)'}}></div>
                        </div>
                        {children}
                    </div>
                </>
            )
        }
        
        // コメントのHTMLを生成し、commentsHtmlに追加
        commentsHtml.push(
            <li key={comment.id} className='relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full'>
                <div id={`comment_${comment.id}`} className='flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards'>
                    <span className='select-none pointer-events-none'>
                        <Avatar className="border-neutral-200 dark:border-neutral-800 w-[48px] h-[48px] border-[1px] mr-[0.5rem] shadow-lg]">
                            <AvatarImage src={comment.author.image} alt={comment.author.username}/>
                            <AvatarFallback>ICO</AvatarFallback>
                        </Avatar>
                    </span>
                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                        <div className='flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                            <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                <span>{comment.author.username}</span>
                                <span className="tooltip m-auto">
                                <CommentBadge tag={comment.author.tag}/>
                                </span>
                            </div>
                        </div>
                        <div id={`commentId_${comment.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left break-words box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                            <div className='overflow-auto whitespace-break-spaces max-h-[100px]'>
                                <span>{comment.content}</span>
                            </div>
                            <div className='flex flex-wrap flex-row justify-between items-center pt-2'>
                                <span className='text-zinc-500'>{formattedTimestamp}</span>
                                <CommentOptionBar mode="comment" commentORreply_contents={comment}/>
                            </div>
                        </div>
                        <div id={`comment_reply_${comment.id}`} className='flex flex-row flex-wrap justify-around items-center w-full'></div>
                    </div>
                </div>
                <section id={`comment_section_${comment.id}`} className='flex flex-wrap flex-col md:flex-row justify-center items-center w-11/12'>
                    {/* 返信コメントが2つ以上ある場合 */}
                    {commentReplies[comment.id]?.length > 1 && (
                        <>
                            {/* 1つ目の返信コメントを通常表示 */}
                            {commentReplies[comment.id]?.map((reply, index) => {
                                if (index === 0 && reply.reply_Id) {
                                    return <CommentReply key={reply.id} reply={reply} />;
                                }
                            })}
                            {/* 2つ目の返信コメントを半透明で表示 */}
                            {!showRepliesMap[comment.id] && commentReplies[comment.id]?.map((reply, index) => {
                                if (index === 1 && reply.reply_Id) {
                                    return (
                                        <CommentReply key={reply.id} reply={reply} opacity={0.5} className="relative after:absolute after:bottom-0 after:w-full after:h-full after:pointer-events-none" style={{ background: `linear-gradient(rgba(230, 240, 255, 0), #e6f0ff)`,backgroundImage: `linear-gradient(rgba(230, 240, 255, 0), var(--card))` }}>
                                            {/* "返信を表示"ボタンを配置 */}
                                            <button className="absolute bottom-5 mt-2 p-2 bg-blue-500/90 border-blue-500/50 text-white hover:scale-[102%] hover:drop-shadow-lg active:opacity-80 active:scale-95 w-full border rounded-md shadow-md transition-all duration-300 ease-in-out" onClick={() => setShowRepliesMap(prevState => ({ ...prevState, [comment.id]: true }))}>
                                                {_locales(`View more replies`)}
                                            </button>
                                        </CommentReply>
                                    )
                                }
                            })}
                            {/* 返信が表示されている場合、2つ目以降の返信コメントを表示 */}
                            {showRepliesMap[comment.id] && (
                                <>
                                    {commentReplies[comment.id]?.map((reply, index) => {
                                        if (index > 0 && reply.reply_Id) {
                                            return <CommentReply key={reply.id} reply={reply} />;
                                        }
                                    })}
                                    {/* "返信を非表示"ボタンを配置 */}
                                    <div className="flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                                        <button className="mt-2 p-2 bg-blue-500/50 border-blue-500/20 text-white hover:bg-blue-500/40 hover:drop-shadow-lg active:bg-blue-500/700 active:scale-95 w-full border rounded-md shadow-md transition-all duration-300 ease-in-out" onClick={() => setShowRepliesMap(prevState => ({ ...prevState, [comment.id]: false }))}>
                                            {_locales(`See fewer replies`)}
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {/* 返信コメントが1つの場合 */}
                    {commentReplies[comment.id]?.length === 1 && (
                        <>
                            {/* 1つ目の返信コメントを通常表示 */}
                            {commentReplies[comment.id]?.map((reply, index) => {
                                if (reply.reply_Id) {
                                    return <CommentReply key={reply.id} reply={reply} />;
                                }
                            })}
                        </>
                    )}
                </section>
            </li>
        );
    });
    // 生成したHTMLを返す
    return commentsHtml;
}

// htmlとしてコメントを出力
// <span className='whitespace-break-spaces break-words' dangerouslySetInnerHTML={{ __html: comment.comment }}></span>

export function CommentsHtmlContents({ commentsRes, comments, userData }: { commentsRes: boolean, comments: any, userData: any }) {

    let username = "";
    let userId = "";
    let userImage = "/icons/scratch/scratch_guest.png";
    if (userData) {
        username = userData.username;
        userId = userData.id;
        userImage = Scratch_GET_user_image(userId);
    };

    function Group({ children }: { children: React.ReactNode }) {
        return (
            <section className="md:p-6 pt-0">
                <ul className="flex flex-col justify-center items-center gap-1 w-full mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1">
                    {children}
                </ul>
            </section>
        )
    }

    // CommentsHTML を一時的に保存
    let commentsContent = null;
    if (commentsRes) {
        if (comments.length > 0) {
            return (
                <Group>
                    <CommentsHTML CommentsData={comments} username={username} userId={userId} userImage={userImage}/>
                </Group>
            )
        } else {
            return (
                <Group>
                    <li className='animated-slideIn-up p-2 animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards'>
                        <h1 className='text-zinc-400 text-[1.2rem] m-auto'>{_locales('No comments yet')}</h1>
                    </li>
                </Group>
            )
        }
    } else {
        return (
            <Group>
                <li className="relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full">
                    <div className="flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                        <span className="select-none pointer-events-none">
                            <Skeleton className="h-[48px] w-[48px] mr-[0.5rem] overflow-clip rounded-full shadow-lg" />
                        </span>
                        <div className="flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3">
                            <div className="flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]">
                                <Skeleton className="hidden sm:block w-40 h-5 mr-auto rounded-lg" />
                            </div>
                            <Skeleton className="relative h-15 ml-[0.6rem] mb-1 p-[0.75rem] rounded-[0.5rem] text-left box-border" style={{}} />
                            <Skeleton className="relative w-[70%] h-15 ml-[0.6rem] my-1 p-[0.75rem] rounded-[0.5rem] text-left box-border" />
                        </div>
                    </div>
                </li>
            </Group>
        )
    }
}