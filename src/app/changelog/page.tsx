'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faExclamation, faLink, faReply } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../../components/element/header';
import Footer from '../../../components/element/footer';
import links_config from '../../../public/db/data/links_config';
import { HeadCustom_config } from '../../../components/site/headCustom';
import { FadeUpTrigger } from '../../../components/site/fadeUpTrigger';
import { UserInfo_avatar_url, UserInfo_userId, UserInfo_username } from '../../../components/clerk/userInfo';
import { UserInfo_publicMetadata_beta } from '../../../components/clerk/UserInfo_publicMetadata';
import { API_commentForm_send, sendGetRequestToGAS } from '../../../components/api/comments';
import { CommentAddHtml } from '../../../components/page/comp';
import { SignInButton } from '@clerk/nextjs';
import { TopImage } from '../../../components/element/topimage';
import { PageLoading } from '../../../components/element/pageLoading';
import { SiteViewCheck, SiteViewSetVal } from '../../../components/element/siteViewCheck';
import { validationCheck_comment } from '../../../components/site/validation';

export default function Home() {
    // ページロード
    const [isLangLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
        try {
            setPageLoaded(true);
        } catch (error) {
            console.error("取得エラー:", error);
        }
        };
        if (!isLangLoaded) {
        fetchLanguage();
        }
    }, [isLangLoaded]);
    // headカスタム
    const Head_config = {
        "title":`変更履歴 | ${links_config.site_title}`,
    };
    HeadCustom_config(Head_config);
    // 読み込みアニメーション
    FadeUpTrigger();
    // ユーザー情報の取得
    const username = UserInfo_username();
    const userId = UserInfo_userId();
    const avatar_url = UserInfo_avatar_url();
    // ユーザーメタデータ取得
    const [user_tag, setTag] = useState('')
    useEffect(() => {
        const fetchUserInfo = async () => {
        try {
            const result = await UserInfo_publicMetadata_beta();
            if (result) {
            const { tag } = JSON.parse(result);
            setTag(tag); // Stateにtagをセット
            } else {
            console.error('ユーザーメタデータが取得できませんでした');
            }
        } catch (error) {
            console.error('エラー:', error);
        }
        }
        fetchUserInfo();
    }, []);

    // フォームの設定
    const [form_name, setName] = useState('');
    const [form_version, setVersion] = useState('');
    const [form_date, setDate] = useState('');
    const [form_comment, setComment] = useState('');
    // コメント取得
    const [comments, setComments] = useState([]);
    const [commentsRes, setCommentsRes] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const result = await sendGetRequestToGAS('changelog'); // コメントデータを取得
            setComments(result); // 取得したコメントデータをstateにセット
            setCommentsRes(true);
        } catch (error) {
            console.error('コメントの取得中にエラーが発生しました:', error);
        }
        };
        fetchData();
    }, []);

    // コメント送信
    const CommentForm_send_ButtonClick = async () => {
        if (typeof window !== 'undefined') {
            const comment_reply_form_button = document.getElementById(`commentForm_send`);
            if(comment_reply_form_button){
                comment_reply_form_button.classList.add('pointer-events-none');
                comment_reply_form_button.innerText=(`送信中...`)
            }
            let formErrorCount = 0;
            let formErrorText = "";

            if(!validationCheck_comment(form_version)){
                if(formErrorCount < 1){
                    formErrorCount+=1;
                    formErrorText=`versionを記入してください`;
                }
            };
            if(!validationCheck_comment(form_date)){
                if(formErrorCount < 1){
                    formErrorCount+=1;
                    formErrorText=`更新した日を記入してください`;
                }
            };
            if(!validationCheck_comment(form_comment)){
                if(formErrorCount < 1){
                    formErrorCount+=1;
                    formErrorText=`変更履歴を投稿するには、コメントを追加しなければならない`;
                }
            };

            if(formErrorCount > 0){
                window.alert(formErrorText);
                if(comment_reply_form_button){
                    comment_reply_form_button.classList.remove('pointer-events-none');
                    comment_reply_form_button.innerText=(`更新履歴を投稿`)
                }
            }else{
                if(await API_commentForm_send('changelog',username,userId,avatar_url,user_tag,`<h1 class='font-bold text-2xl'>v${form_version}</h1><p class='text-zinc-400'>${form_date}</p><span>${form_comment}</span>`)){
                    window.alert('変更履歴を投稿しました！');
                    window.location.href=(`${window.location}`);
                }else{
                    window.alert('スペース以外の文字を最低一文字入力してください！');
                    if(comment_reply_form_button){
                        comment_reply_form_button.classList.remove('pointer-events-none');
                        comment_reply_form_button.innerText=(`更新履歴を投稿`)
                    }
                }
            }
        }
    };

    return (
        <>
            {isLangLoaded ? (
                <>
                {SiteViewSetVal() ? (
                    <>
                    <Header/>
                    <div>
                        {/* トップイメージ */}
                        <TopImage/>
                        {/* 製作者 / 開発者 */}
                        <div className="bg-zinc-800">
                            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 undefined">
                                <div className="flex-col lg:flex-row flex items-center gap-8"></div>
                            </div>
                        </div>
                        {/* メイン */}
                        <div className='mt-20 mb-20'>
                            <div className="items-center">
                                <div className='fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md'>
                                    <h2 className=' font-bold text-2xl'>ビル経営ゲーム - 更新履歴</h2>
                                    {user_tag === 'developer' ? (
                                        <details className=' bg-zinc-900/50 rounded-lg mt-5 p-5'>
                                            <summary>変更履歴を投稿する（投稿権限があります）</summary>
                                            <div className='flex flex-col justify-center items-center max-w-[600px] m-auto mt-[10px] gap-2'>
                                                {username!=='false' ? (
                                                <>
                                                    <input key='commentForm_name' type='text' placeholder='名前' value={username ? username : 'guest'} readOnly className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setName(e.target.value)}/>
                                                    <input key='commentForm_version' type='text' placeholder='version' className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setVersion(e.target.value)}/>
                                                    <input key='commentForm_date' type='date' placeholder='date' className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setDate(e.target.value)}/>
                                                    <textarea key='commentForm_comment' placeholder='コメント' className='flex min-h-[80px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' onChange={(e) => setComment(e.target.value)}/>
                                                    {username && userId && avatar_url && user_tag ? (
                                                    <>
                                                        <button id='commentForm_send' className='bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[24px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={CommentForm_send_ButtonClick}>更新履歴を投稿</button>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <button id='commentForm_send' className='bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[24px] py-[12px] text-sm transition duration-300 ease-in-out opacity-50'>読み込み中</button>
                                                    </>
                                                    )}
                                                </>
                                                ) : (
                                                <>
                                                    <input key='commentForm_name' type='text' placeholder='名前' value={'guest'} readOnly className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none cursor-not-allowed select-none pointer-events-none opacity-50' onChange={(e) => setName(e.target.value)}/>
                                                    <textarea key='commentForm_comment' placeholder='コメント' className='flex min-h-[80px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-not-allowed select-none pointer-events-none opacity-50' onChange={(e) => setComment(e.target.value)}/>
                                                    <SignInButton>
                                                        <button id='commentForm_send' className='bg-blue-500 shadow-lg rounded-lg m-auto px-[24px] py-[12px] text-sm select-none opacity-50'>ログインして利用</button>
                                                    </SignInButton>
                                                </>
                                                )}
                                            </div>
                                        </details>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <ul id='comments' className='flex flex-col justify-center items-center w-full gap-1 mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1'>
                                        {commentsRes && CommentAddHtml('changelog',comments,username,userId,user_tag,avatar_url) ? (
                                        <>
                                            {comments.length > 0 ? (
                                            <>
                                                {CommentAddHtml('changelog',comments,username,userId,user_tag,avatar_url)}
                                            </>
                                            ) : (
                                            <>
                                                <li className='animated-slideIn-up p-2'>
                                                    <h1 className='text-zinc-400 text-[1.2rem] m-auto'>更新履歴がまだ投稿されていません</h1>
                                                </li>
                                            </>
                                            )}
                                        </>
                                        ) : (
                                        <>
                                            <div className='w-full m-auto'>
                                                <div className='flex flex-col justify-center items-center gap-2 w-full m-auto'>
                                                    <div className="animate-spin h-10 w-10 border-4 border-gray-500 rounded-full border-t-transparent"></div>
                                                    <span className='text-zinc-400'>更新履歴を取得中...</span>
                                                </div>
                                            </div>
                                        </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                    </>
                ) : (
                    <SiteViewCheck/>
                )}
                </>
            ) : (
                <PageLoading/>
            )}
        </>
    )
};
