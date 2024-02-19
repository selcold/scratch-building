'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDateTime } from "../site/formatDateTime";
import { faLink, faReply } from "@fortawesome/free-solid-svg-icons";
import { UserInfo_avatar_url } from "../clerk/userInfo";
import { createRoot } from "react-dom/client";
import { API_gas_backendApi_new_commentSend } from "../api/comments";
import { customLog } from "../api/customLog";
import { validationCheck_comment } from "../site/validation";
import { SignInButton } from "@clerk/nextjs";

interface Comment {
    avatar_url: string;
    comment: string;
    name: string;
    timestamp: Date; // Date型に変更
    tag: string;
    uuid: string;
    replyId: string;
    replyGroupId: string;
};
export function CommentAddHtml(sheetMode: string,commentData: Comment[], username: string, userId: string, user_tag: string, avatar_url: string): JSX.Element[] {

    var obj_commentsId: Record<string, any> = {};
    var obj_comments: Record<string, any> = {};
    var obj_comments_reply: Record<string, any> = {};

    // コメントデータのタイムスタンプを日時オブジェクトに変換
    commentData.forEach(comment => {
        comment.timestamp = new Date(comment.timestamp);
        obj_commentsId[comment.uuid] = comment;
        if (comment.replyGroupId) {
            obj_comments_reply[comment.uuid] = comment;
        } else {
            obj_comments[comment.uuid] = comment;
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

        // コメントフォーム
        function set_comment_reply_form(mode: string, uuid: string, user_tag: string) {
            const HtmlCommentReplyForm = document.getElementById(`comment_reply_${uuid}`);
            if (HtmlCommentReplyForm) {
                if (HtmlCommentReplyForm.children.length > 0) {
                    // 子要素がある場合は削除
                    HtmlCommentReplyForm.innerHTML = '';
                } else {
                    if (mode === 'comment') {
                        const root = createRoot(HtmlCommentReplyForm);
                        root.render(
                            <div id={`comment_reply_form_${uuid}`} className="animated-slideIn-up relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem]">
                                <a className='select-none pointer-events-none'>
                                    <img src={avatar_url} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                                </a>
                                <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>
                                                <textarea id={`comment_reply_form_textarea_${uuid}`} className='relative bg-zinc-800 ml-[0.6rem] p-[0.75rem] border-[1px] border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                            <button id={`comment_reply_form_button_${uuid}`} className='inline-block bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg px-[16px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={() => CommentReplyForm_send_ButtonClick(username,userId,user_tag,uuid,'',comment.name)}>投稿する</button>
                                            <button className='inline-block bg-gray-500 hover:shadow-gray-500/20 hover:scale-105 active:shadow-gray-900/10 active:scale-95 shadow-lg rounded-lg px-[16px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={() => set_comment_reply_form('comment',uuid,user_tag)}>キャンセル</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        const root = createRoot(HtmlCommentReplyForm);
                        root.render(
                            <div id={`comment_reply_form_${uuid}`} className="animated-slideIn-up relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem]">
                                <a className='select-none pointer-events-none'>
                                    <img src={avatar_url} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                                </a>
                                <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>
                                                <textarea id={`comment_reply_form_textarea_${uuid}`} className='relative bg-zinc-800 ml-[0.6rem] p-[0.75rem] border-[1px] border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                            <button id={`comment_reply_form_button_${uuid}`} className='inline-block bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg px-[16px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={() => CommentReplyForm_send_ButtonClick(username,userId,user_tag,uuid,'',comment.name)}>投稿する</button>
                                            <button className='inline-block bg-gray-500 hover:shadow-gray-500/20 hover:scale-105 active:shadow-gray-900/10 active:scale-95 shadow-lg rounded-lg px-[16px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={() => set_comment_reply_form('comment',uuid,user_tag)}>キャンセル</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };

        async function CommentReplyForm_send_ButtonClick(username: string, userId: string, user_tag: string, replyGroupId: string, replyId: string = 'false', replyUser: string) {
            const comment_reply_form_button = document.getElementById(`comment_reply_form_button_${replyGroupId}`);
            if (comment_reply_form_button) {
                comment_reply_form_button.classList.add('pointer-events-none');
                comment_reply_form_button.innerText = (`送信中...`);
                
                // この時点で要素が存在するので、以降のコードを実行
                if (!obj_commentsId[replyGroupId].replyGroupId) {
                    replyId = replyGroupId;
                }
                
                const text_CommentReplyForm = document.getElementById(`comment_reply_form_textarea_${replyGroupId}`) as HTMLInputElement;
                if (text_CommentReplyForm) {
                    const comment = text_CommentReplyForm.value;
                    if (validationCheck_comment(comment)) {
                        if (await API_gas_backendApi_new_commentSend(username, userId, user_tag, comment, replyGroupId, replyId, replyUser)) {
                            if (typeof window !== 'undefined') {
                                window.alert('コメントを投稿しました！');
                                window.location.href = (`${window.location}`);
                            }
                        }
                    } else {
                        if (typeof window !== 'undefined') {
                            window.alert('スペース以外の文字を最低一文字入力してください！');
                            if (comment_reply_form_button) {
                                comment_reply_form_button.classList.remove('pointer-events-none');
                                comment_reply_form_button.innerText = (`投稿する`);
                            }
                        }
                    }
                    return text_CommentReplyForm.value;
                } else {
                    if (typeof window !== 'undefined') {
                        window.alert('コメント投稿中に問題が発生しました！');
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
            <li key={comment.uuid} className='relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full'>
                <div id={`comment_${comment.uuid}`} className='animated-slideIn-up flex flex-row flex-nowrap justify-between items-start w-full p-1 group'>
                    <a className='select-none pointer-events-none'>
                        <img src={comment.avatar_url} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                    </a>
                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                        <div className='flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                            <div className=' flex flex-row justify-center mr-auto text-slate-50 gap-1'>
                                <a>{comment.name}</a>
                                <span className="tooltip m-auto">
                                    {comment.tag==='developer' ? (
                                        <>
                                            <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                            </svg>
                                            <span className="tooltiptext">開発者</span>
                                        </>
                                    ) : (
                                        <>
                                            {comment.tag==='authentic' ? (
                                                <>
                                                    <svg className="m-auto h-5 w-5 text-orange-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                    </svg>
                                                    <span className="tooltiptext">認証者</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="m-auto h-5 w-5 text-gray-400 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                    </svg>
                                                    <span className="tooltiptext">登録者</span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className='relative bg-zinc-800 ml-[0.6rem] p-[0.75rem] border-[1px] border-zinc-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-zinc-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-zinc-800' style={{width:'calc(100% - 0.5rem)'}}>
                        <span className='overflow-auto whitespace-break-spaces break-words text-left'>
                            <span className='whitespace-break-spaces break-words' dangerouslySetInnerHTML={{ __html: comment.comment }}></span>
                        </span>
                        <div className='flex flex-wrap flex-row justify-between items-center pt-[1rem]'>
                            <span className='text-zinc-500'>{formattedTimestamp}</span>
                            {username!=='false' ? (
                                <>
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                        <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                            <FontAwesomeIcon icon={faLink}/>
                                            <span className='tooltiptext'>コピー</span>
                                        </button>
                                        <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                            報告
                                            <span className='tooltiptext'>コメントを報告します</span>
                                        </button>
                                        {sheetMode === 'changelog' && user_tag === 'developer' ? (
                                            <>
                                                <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form('comment',comment.uuid,user_tag)}>
                                                    返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                    <span className='tooltiptext'>コメントに返信</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SignInButton>
                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                <FontAwesomeIcon icon={faLink}/>
                                                <span className='tooltiptext'>コピー</span>
                                            </button>
                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                報告
                                                <span className='tooltiptext'>コメントを報告します</span>
                                            </button>
                                            {sheetMode === 'changelog' && user_tag === 'developer' ? (
                                                <>
                                                    <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                        返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                        <span className='tooltiptext'>コメントに返信</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </div>
                                    </SignInButton>
                                </>
                            )}
                        </div>
                        </div>
                        <div id={`comment_reply_${comment.uuid}`} className='flex flex-row flex-wrap justify-around items-center w-full'></div>
                    </div>
                </div>
                <section id={`comment_section_${comment.uuid}`} className='flex flex-wrap flex-col md:flex-row justify-center items-center w-11/12'>
                    {/* 返信コメントの表示 */}
                    {obj_comments_reply_Array.map(commentReply => {
                        if (commentReply.replyGroupId === comment.uuid) {
                            return (
                                <div key={commentReply.uuid} id={`comment_${commentReply.uuid}`} className='animated-slideIn-up flex flex-row flex-nowrap justify-between items-start w-full p-1 group'>
                                    <a className="select-none pointer-events-none">
                                        <img src={commentReply.avatar_url} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                                    </a>
                                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                                        <div className='flex flex-wrap flex-row justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                                            <div className='flex flex-row justify-center mr-auto text-slate-50 gap-1'>
                                                <a>{commentReply.name}</a>
                                                <span className="tooltip m-auto">
                                                    {commentReply.tag==='developer' ? (
                                                        <>
                                                            <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                            </svg>
                                                            <span className="tooltiptext">開発者</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {commentReply.tag==='authentic' ? (
                                                                <>
                                                                    <svg className="m-auto h-5 w-5 text-orange-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                                    </svg>
                                                                    <span className="tooltiptext">認証者</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="m-auto h-5 w-5 text-gray-400 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                                                    </svg>
                                                                    <span className="tooltiptext">登録者</span>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='relative bg-zinc-800 ml-[0.6rem] p-[0.75rem] border-[1px] border-zinc-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-zinc-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-zinc-800' style={{width:'calc(100% - 0.5rem)'}}>
                                        <span className='overflow-auto whitespace-break-spaces break-words text-left'>
                                            <span className="text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2">@{obj_commentsId[commentReply.replyId].name}</span>
                                            <span className='whitespace-break-spaces break-words'>{commentReply.comment}</span>
                                        </span>
                                        <div className='flex flex-wrap flex-row justify-between items-center pt-[1rem]'>
                                            <span className='text-zinc-500'>{formattedTimestamp}</span>
                                            {username!=='false' ? (
                                                <>
                                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                        <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                            <FontAwesomeIcon icon={faLink}/>
                                                            <span className='tooltiptext'>コピー</span>
                                                        </button>
                                                        <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                            報告
                                                            <span className='tooltiptext'>コメントを報告します</span>
                                                        </button>
                                                        <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form('comment_reply',commentReply.uuid,user_tag)}>
                                                            返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                            <span className='tooltiptext'>コメントに返信</span>
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <SignInButton>
                                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                                <FontAwesomeIcon icon={faLink}/>
                                                                <span className='tooltiptext'>コピー</span>
                                                            </button>
                                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                                報告
                                                                <span className='tooltiptext'>コメントを報告します</span>
                                                            </button>
                                                            <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease'>
                                                                返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                                <span className='tooltiptext'>コメントに返信</span>
                                                            </button>
                                                        </div>
                                                    </SignInButton>
                                                </>
                                            )}
                                        </div>
                                        </div>
                                        <div id={`comment_reply_${commentReply.uuid}`} className='flex flex-row flex-wrap justify-around items-center ml-[-3.5rem] w-full' style={{width:'calc(100% + 3.5rem)'}}></div>
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
};
