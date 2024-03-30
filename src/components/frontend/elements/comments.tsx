
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faReply } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/backend/comments";
import { formatDateTime } from "../site/formatDateTime";
import { Button } from "@/components/ui/button";
import { Scratch_GET_user_image } from "../_scratch";
import { AlertDialogCustomButton_NotRelease, AlertDialogCustomButton_loginUserOnly } from "../site/AlertDialog";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import { _locales } from "../site/_locales";
import { ScratchComment_Check } from "../site/scratchComments";

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
export function CommentsHTML( CommentsData: Comments[] , username: string, userId: string, userImage: string ): JSX.Element[] {
    
    function ValidationCheck_comment(content: string){
        const newContent = content.replace(/\s+/g,'');
        if(newContent.length > 0){
            return content;
        }
        return false;
    };

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
    var obj_comments_reply_Array = Object.values(obj_comments_reply);
    
    // タイムスタンプの新しい順にコメントデータをソート
    obj_comments_Array.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    // コメントを格納する変数
    let commentsHtml: JSX.Element[] = [];
    // コメントデータをループしてコメントごとにHTMLを生成
    obj_comments_Array.forEach(comment => {
        const formattedTimestamp = formatDateTime(comment.timestamp);
        
        // コピーされた後にテキストを変更する処理
        const handleCopy = async (uuid: string,text: string) => {
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
        
        // コメントフォーム
        function set_comment_reply_form(ComRepFo_mode: string, ComRepFo_group: string, ComRepFo_id: string, ComRepFo_user_tag: string, ComRepFo_replyUser: string = '') {
            const HtmlCommentReplyForm = document.getElementById(`comment_reply_${ComRepFo_id}`);
            if (HtmlCommentReplyForm) {
                if (HtmlCommentReplyForm.children.length > 0) {
                    // 子要素がある場合は削除
                    HtmlCommentReplyForm.innerHTML = '';
                } else {
                    if (ComRepFo_mode === 'comment') {
                        const root = createRoot(HtmlCommentReplyForm);
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
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => CommentReplyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>{_locales('Post')}</Button>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} variant="outline" onClick={() => set_comment_reply_form('comment',ComRepFo_group, ComRepFo_id, ComRepFo_user_tag)}>{_locales('Cancel')}</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        const root = createRoot(HtmlCommentReplyForm);
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
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => CommentReplyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>{_locales('Post')}</Button>
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
    
        async function CommentReplyForm_send_ButtonClick(FoSendBtCl_user_name: string, FoSendBtCl_user_Id: string, FoSendBtCl_user_tag: string, FoSendBtCl_reply_group_id: string, FoSendBtCl_reply_id: string = 'false', FoSendBtCl_replyUser: string) {
            const comment_reply_form_button = document.getElementById(`comment_reply_form_button_${FoSendBtCl_reply_id}`);
            if (comment_reply_form_button) {
                comment_reply_form_button.classList.add('pointer-events-none');
                comment_reply_form_button.innerText = (_locales('Sending...'));
                
                // この時点で要素が存在するので、以降のコードを実行
                if (!obj_commentsId[FoSendBtCl_reply_id].reply_Id) {
                    FoSendBtCl_reply_id = FoSendBtCl_reply_id;
                }
                
                const text_CommentReplyForm = document.getElementById(`comment_reply_form_textarea_${FoSendBtCl_reply_id}`) as HTMLInputElement;
                if (text_CommentReplyForm) {
                    const comment = text_CommentReplyForm.value;

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
                    
                    return text_CommentReplyForm.value;
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
        
        // コメントのHTMLを生成し、commentsHtmlに追加
        commentsHtml.push(
            <li key={comment.id} className='relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full'>
                <div id={`comment_${comment.id}`} className='flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards'>
                    <span className='select-none pointer-events-none'>
                        <Image
                        priority
                        src={comment.author.image}
                        alt="ico"
                        width={48}
                        height={48}
                        className="border-neutral-200 dark:border-neutral-800 border-[1px] mr-[0.5rem] overflow-clip rounded-[5px] shadow-lg"
                        unoptimized={true}
                        />
                    </span>
                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                        <div className='flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                            <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                <span>{comment.author.username}</span>
                                <span className="tooltip m-auto">
                                {comment.author.tag==='developer' ? (
                                <>
                                    <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                    </svg>
                                    <span className="tooltiptext">{_locales('Developer')}</span>
                                </>
                                ) : (
                                <>
                                    {comment.author.tag==='authentic' ? (
                                    <>
                                        <svg className="m-auto h-5 w-5 text-orange-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                        </svg>
                                        <span className="tooltiptext">{_locales('Authenticator')}</span>
                                    </>
                                    ) : (
                                    <>
                                        <svg className="m-auto h-5 w-5 text-gray-400 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                        </svg>
                                        <span className="tooltiptext">{_locales('Subscriber')}</span>
                                    </>
                                    )}
                                </>
                                )}
                                </span>
                            </div>
                        </div>
                        <div id={`commentId_${comment.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left break-words box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                            <div className='overflow-auto whitespace-break-spaces max-h-[100px]'>
                                <span>{comment.content}</span>
                            </div>
                            <div className='flex flex-wrap flex-row justify-between items-center pt-2'>
                                <span className='text-zinc-500'>{formattedTimestamp}</span>
                                {username? (
                                    <>
                                        <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                            <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(comment.id,`${window.location.origin}${window.location.pathname}#commentId_${comment.id}`)}>
                                                <FontAwesomeIcon icon={faLink}/>
                                                <span id={`handleCopy_${comment.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                                            </button>
                                            <AlertDialogCustomButton_NotRelease>
                                                <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                    {_locales('Report')}
                                                </button>
                                            </AlertDialogCustomButton_NotRelease>
                                            <button  title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form("comment", comment.id, comment.id, "", comment.author.username)}>
                                                {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(comment.id,`${window.location.origin}${window.location.pathname}#commentId_${comment.id}`)}>
                                                    <FontAwesomeIcon icon={faLink}/>
                                                    <span id={`handleCopy_${comment.id}`} className='tooltiptext'>{_locales('Copy')}</span>
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
                            </div>
                        </div>
                        <div id={`comment_reply_${comment.id}`} className='flex flex-row flex-wrap justify-around items-center w-full'></div>
                    </div>
                </div>
                <section id={`comment_section_${comment.id}`} className='flex flex-wrap flex-col md:flex-row justify-center items-center w-11/12'>
                    {/* 返信コメントの表示 */}
                    {obj_comments_reply_Array.map(commentReply => {
                        if (commentReply.reply_group_id === comment.id) {
                            return (
                                <div key={commentReply.id} id={`comment_${commentReply.id}`} className='flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards'>
                                    <span className="select-none pointer-events-none">
                                        <Image
                                        priority
                                        src={commentReply.author.image}
                                        alt="ico"
                                        width={48}
                                        height={48}
                                        className="border-neutral-200 dark:border-neutral-800 border-[1px] mr-[0.5rem] overflow-clip rounded-[5px] shadow-lg"
                                        unoptimized={true}
                                        />
                                    </span>
                                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                                        <div className='flex flex-wrap flex-row justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                                            <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                                <span>{commentReply.author.username}</span>
                                                <span className="tooltip m-auto">
                                                    {commentReply.author.tag==='developer' ? (
                                                    <>
                                                        <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                        </svg>
                                                        <span className="tooltiptext">{_locales('Developer')}</span>
                                                    </>
                                                    ) : (
                                                    <>
                                                    {commentReply.tag==='authentic' ? (
                                                    <>
                                                        <svg className="m-auto h-5 w-5 text-orange-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                        </svg>
                                                        <span className="tooltiptext">{_locales('Authenticator')}</span>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <svg className="m-auto h-5 w-5 text-gray-400 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                        </svg>
                                                        <span className="tooltiptext">{_locales('Subscriber')}</span>
                                                    </>
                                                    )}
                                                    </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div id={`commentId_${commentReply.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                                            <div className='overflow-auto whitespace-break-spaces max-h-[100px]'>
                                                <span className="text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2">@{obj_commentsId[commentReply.reply_Id].author.username}</span>
                                                <span>{commentReply.content}</span>
                                            </div>
                                            <div className='flex flex-wrap flex-row justify-between items-center pt-2'>
                                                <span className='text-zinc-500'>{formattedTimestamp}</span>
                                                {username? (
                                                    <>
                                                        <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                            <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentReply.id,`${window.location.origin}${window.location.pathname}?#commentId_${commentReply.id}`)}>
                                                                <FontAwesomeIcon icon={faLink}/>
                                                                <span id={`handleCopy_${commentReply.id}`} className='tooltiptext'>{_locales('Copy')}</span>
                                                            </button>
                                                            <AlertDialogCustomButton_NotRelease>
                                                                <button title={_locales('Report')} className='text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                                    {_locales('Report')}
                                                                </button>
                                                            </AlertDialogCustomButton_NotRelease>
                                                            <button title={_locales('Reply')} className='inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form('comment_reply',comment.id,commentReply.id,"",commentReply.author.username)}>
                                                                {_locales('Reply')}<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                                <button title={_locales('Copy')} className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(commentReply.id,`${window.location.origin}${window.location.pathname}?#commentId_${commentReply.id}`)}>
                                                                    <FontAwesomeIcon icon={faLink}/>
                                                                    <span id={`handleCopy_${commentReply.id}`} className='tooltiptext'>{_locales('Copy')}</span>
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
                                            </div>
                                        </div>
                                        <div id={`comment_reply_${commentReply.id}`} className='flex flex-row flex-wrap justify-around items-center ml-[-3.5rem] w-full' style={{width:'calc(100% + 3.5rem)'}}></div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </section>
            </li>
        );
    });
    // 生成したHTMLを返す
    return commentsHtml;
}

// htmlとしてコメントを出力
// <span className='whitespace-break-spaces break-words' dangerouslySetInnerHTML={{ __html: comment.comment }}></span>

export function CommentsHtmlContents({ commentsRes, comments, userData } : { commentsRes: boolean, comments: any, userData: any }) {

    let username = "";
    let userId = "";
    let userImage = "/icons/scratch/scratch_guest.png";
    if(userData){
        username = userData.username;
        userId = userData.id;
        userImage = Scratch_GET_user_image(userId);
    };

    return (
        <>
            <section className="md:p-6 pt-0">
                <ul className="flex flex-col justify-center items-center gap-1 w-full mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1">
                    {commentsRes? (
                    <>
                        {comments.length > 0 ? (
                        <>
                            {CommentsHTML(comments, username, userId, userImage)}
                        </>
                        ) : (
                        <>
                            <li className='animated-slideIn-up p-2 animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards'>
                                <h1 className='text-zinc-400 text-[1.2rem] m-auto'>{_locales('No comments yet')}</h1>
                            </li>
                        </>
                        )}
                    </>
                    ):(
                    <>
                        <li className="relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full">
                            <div className="flex flex-row flex-nowrap justify-between items-start w-full p-1 group animate-fade-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards">
                                <span className="select-none pointer-events-none">
                                <Skeleton className="h-[48px] w-[48px] mr-[0.5rem] overflow-clip rounded-full shadow-lg" />
                                </span>
                                <div className="flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3">
                                    <div className="flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]">
                                    <Skeleton className="hidden sm:block w-40 h-5 mr-auto rounded-lg"/>
                                    </div>
                                    <Skeleton className="relative h-15 ml-[0.6rem] mb-1 p-[0.75rem] rounded-[0.5rem] text-left box-border" style={{ width: "calc(100% - 0.5rem)" }}/>
                                    <Skeleton className="relative w-[70%] h-15 ml-[0.6rem] my-1 p-[0.75rem] rounded-[0.5rem] text-left box-border"/>
                                </div>
                            </div>
                        </li>
                    </>
                    )}
                </ul>
            </section>
        </>
    )
}