
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faReply } from "@fortawesome/free-solid-svg-icons";
import { createRoot } from "react-dom/client";
import { API_gas_backendApi_new_commentSend, Server_GetRequest_Comments } from "@/components/backend/comments";
import { formatDateTime } from "../site/formatDateTime";
import { Button } from "@/components/ui/button";

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
                    copyHtml.innerText=`コピー完了`;
                    // 一定時間後にテキストを元に戻す
                    setTimeout(() => {
                        copyHtml.innerText=`コピー`;
                    }, 3000); // 3000ミリ秒 = 3秒後に元に戻す
                };
                return true
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                return false
            }
            
        };
    
        function HandleReport() {
            if (typeof window !== 'undefined') {
                window.alert('現在報告機能を使用することはできません。');
            }
        }
        
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
                            <div id={`comment_reply_form_${ComRepFo_id}`} className="animated-slideIn-up relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem]">
                            <a className='select-none pointer-events-none'>
                                <img src={userImage} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                            </a>
                            <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full bg-card text-card-foreground'>
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <div>
                                            <textarea id={`comment_reply_form_textarea_${ComRepFo_id}`} className='relative ml-[0.6rem] p-[0.75rem] border-[1px] bg-neutral-100 dark:bg-neutral-800 border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                        <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => CommentReplyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>投稿する</Button>
                                        <Button id={`comment_reply_form_button_${ComRepFo_id}`} variant="outline" onClick={() => set_comment_reply_form('comment',ComRepFo_group, ComRepFo_id, ComRepFo_user_tag)}>キャンセル</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    } else {
                        const root = createRoot(HtmlCommentReplyForm);
                        root.render(
                            <div id={`comment_reply_form_${ComRepFo_id}`} className="animated-slideIn-up relative flex flex-row flex-nowrap justify-between items-start w-full p-1 mt-[2rem] mb-[0.5rem]">
                                <a className='select-none pointer-events-none'>
                                    <img src={userImage} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                                </a>
                                <div className='flex flex-wrap flex-col justify-center items-center ml-1 w-full bg-card text-card-foreground'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>
                                                <textarea id={`comment_reply_form_textarea_${ComRepFo_id}`} className='relative ml-[0.6rem] p-[0.75rem] border-[1px] border-zinc-500 rounded-[0.5rem] text-left box-border' style={{width:'calc(100% - 0.5rem)'}}></textarea>
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center justify-start flex-row gap-2 w-full ml-[0.6rem] mt-[0.4rem]' style={{width:'calc(100% - 0.5rem)'}}>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} onClick={() => CommentReplyForm_send_ButtonClick(username, userId, ComRepFo_user_tag, ComRepFo_group, ComRepFo_id, ComRepFo_replyUser)}>投稿する</Button>
                                            <Button id={`comment_reply_form_button_${ComRepFo_id}`} variant="outline" onClick={() => set_comment_reply_form('comment', ComRepFo_group, ComRepFo_id, ComRepFo_user_tag)}>キャンセル</Button>
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
                comment_reply_form_button.innerText = (`送信中...`);
                
                // この時点で要素が存在するので、以降のコードを実行
                if (!obj_commentsId[FoSendBtCl_reply_id].reply_Id) {
                    FoSendBtCl_reply_id = FoSendBtCl_reply_id;
                }
                
                const text_CommentReplyForm = document.getElementById(`comment_reply_form_textarea_${FoSendBtCl_reply_id}`) as HTMLInputElement;
                if (text_CommentReplyForm) {
                    const comment = text_CommentReplyForm.value;
                    if (ValidationCheck_comment(comment)) {
                        if (await API_gas_backendApi_new_commentSend(FoSendBtCl_user_name, FoSendBtCl_user_Id, "null", comment, FoSendBtCl_reply_group_id, FoSendBtCl_reply_id, FoSendBtCl_replyUser)) {
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
            <li key={comment.id} className='relative flex flex-col md:flex-row flex-wrap items-center justify-end w-full'>
                <div id={`comment_${comment.id}`} className='animated-slideIn-up flex flex-row flex-nowrap justify-between items-start w-full p-1 group'>
                    <a className='select-none pointer-events-none'>
                        <img src={comment.author.image} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                    </a>
                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                        <div className='flex flex-wrap flex-row justify-start lg:justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                            <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                <a>{comment.author.username}</a>
                                <span className="tooltip m-auto">
                                {comment.author.tag==='developer' ? (
                                <>
                                    <svg className="m-auto h-5 w-5 text-blue-500 stroke-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" fill="currentColor" strokeWidth="0"></path>
                                    </svg>
                                    <span className="tooltiptext">開発者</span>
                                </>
                                ) : (
                                <>
                                    {comment.author.tag==='authentic' ? (
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
                        <div id={`commentId_${comment.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                            <span className='overflow-auto whitespace-break-spaces break-words text-left'>
                                <span className='whitespace-break-spaces break-words'>{comment.content}</span>
                            </span>
                            <div className='flex flex-wrap flex-row justify-between items-center pt-[1rem]'>
                                <span className='text-zinc-500'>{formattedTimestamp}</span>
                                {username? (
                                    <>
                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(comment.id,`${window.location.href}?#commentId_${comment.id}`)}>
                                                <FontAwesomeIcon icon={faLink}/>
                                                <span id={`handleCopy_${comment.id}`} className='tooltiptext'>コピー</span>
                                            </button>
                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={HandleReport}>
                                                報告
                                                <span className='tooltiptext'>コメントを報告します</span>
                                            </button>
                                            <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form("comment", comment.id, comment.id, "", comment.author.username)}>
                                                返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                <span className='tooltiptext'>コメントに返信</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
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
                                <div key={commentReply.id} id={`comment_${commentReply.id}`} className='animated-slideIn-up flex flex-row flex-nowrap justify-between items-start w-full p-1 group'>
                                    <a className="select-none pointer-events-none">
                                        <img src={commentReply.author.image} className='overflow-clip w-[3rem] h-[3rem] rounded-[5px] mr-[0.5rem] shadow-lg'/>
                                    </a>
                                    <div className='flex flex-wrap flex-col justify-center items-start gap-1 w-full min-w-[50%] mb-3'>
                                        <div className='flex flex-wrap flex-row justify-around items-center w-full ml-[0.5rem] mb-[8px]'>
                                            <div className='flex flex-row justify-center mr-auto text-slate-900 dark:text-slate-50 gap-1'>
                                                <a>{commentReply.author.username}</a>
                                                <span className="tooltip m-auto">
                                                    {commentReply.author.tag==='developer' ? (
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
                                        <div id={`commentId_${commentReply.id}`} className='relative bg-neutral-100 dark:bg-neutral-900 ml-[0.6rem] p-[0.75rem] border-[1px] border-neutral-500 rounded-[0.5rem] rounded-tl-none text-left box-border before:inline-block before:absolute before:top-[-1px] before:left-[-10px] before:border-[1px] before:border-r-[0] before:border-neutral-500 before:rounded-bl-[8px] before:w-[10px] before:h-[9px] before:bg-neutral-100 dark:before:bg-neutral-900' style={{width:'calc(100% - 0.5rem)'}}>
                                            <span className='overflow-auto whitespace-break-spaces break-words text-left'>
                                                <span className="text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2">@{obj_commentsId[commentReply.reply_Id].author.username}</span>
                                                <span className='whitespace-break-spaces break-words'>{commentReply.content}</span>
                                            </span>
                                            <div className='flex flex-wrap flex-row justify-between items-center pt-[1rem]'>
                                                <span className='text-zinc-500'>{formattedTimestamp}</span>
                                                {username? (
                                                    <>
                                                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => handleCopy(comment.id,`${window.location.href}?#commentId_${commentReply.id}`)}>
                                                                <FontAwesomeIcon icon={faLink}/>
                                                                <span id={`handleCopy_${commentReply.id}`} className='tooltiptext'>コピー</span>
                                                            </button>
                                                            <button className='tooltip text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={HandleReport}>
                                                                報告
                                                                <span className='tooltiptext'>コメントを報告します</span>
                                                            </button>
                                                            <button className='tooltip inline-block text-zinc-500 hover:text-zinc-400 transition duration-500 ease' onClick={() => set_comment_reply_form('comment_reply',comment.id,commentReply.id,"",commentReply.author.username)}>
                                                                返信<FontAwesomeIcon icon={faReply} className='text-sm ml-1'/>
                                                                <span className='tooltiptext'>コメントに返信</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
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

export function CommentsHtmlContents({ commentsRes, comments, username, userId, userImage } : { commentsRes: boolean, comments: any, username: string | null, userId: string, userImage: string }) {
    return (
        <>
            <section className="p-6 pt-0">
                <ul className="flex flex-col justify-center items-center gap-1 w-full mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1">
                {commentsRes? (
                <>
                {comments.length > 0 ? (
                    <>
                    {CommentsHTML(comments, username? username: '',userId,userImage)}
                    </>
                ) : (
                    <>
                        <li className='animated-slideIn-up p-2'>
                            <h1 className='text-zinc-400 text-[1.2rem] m-auto'>コメントがまだ投稿されていません</h1>
                        </li>
                    </>
                )}
                </>
                ):(
                <>
                    <div className='w-full m-auto'>
                        <div className='flex flex-col justify-center items-center gap-2 w-full m-auto'>
                            <div className="animate-spin h-10 w-10 border-4 border-neutral-300 rounded-full border-t-transparent"></div>
                            <span className='text-neutral-300 dark:text-neutral-700'>コメント取得中...</span>
                        </div>
                    </div>
                </>
                )}
                </ul>
            </section>
        </>
    )
}