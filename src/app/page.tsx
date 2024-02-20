'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faExclamation, faLink, faReply } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/element/header';
import Footer from '../../components/element/footer';
import links_config from '../../public/db/data/links_config';
import { HeadCustom_config } from '../../components/site/headCustom';
import { FadeUpTrigger } from '../../components/site/fadeUpTrigger';
import { UserInfo_avatar_url, UserInfo_userId, UserInfo_username } from '../../components/clerk/userInfo';
import { SignInButton } from '@clerk/nextjs';
import { API_commentForm_send, sendGetRequestToGAS } from '../../components/api/comments';
import { UserInfo_publicMetadata_beta } from '../../components/clerk/UserInfo_publicMetadata';
import { CommentAddHtml } from '../../components/page/comp';
import { TopImage } from '../../components/element/topimage';
import { PageLoading } from '../../components/element/pageLoading';
import { SiteViewCheck, SiteViewSetVal } from '../../components/element/siteViewCheck';

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
    "title":`${links_config.site_title}`,
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
          let { tag } = JSON.parse(result);
          if(!tag){
            tag = `member`
          }
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

  // コメント取得
  const [comments, setComments] = useState([]);
  const [commentsRes, setCommentsRes] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sendGetRequestToGAS('comment'); // コメントデータを取得
        setComments(result); // 取得したコメントデータをstateにセット
        setCommentsRes(true);
      } catch (error) {
        console.error('コメントの取得中にエラーが発生しました:', error);
      }
    };
    fetchData();
  }, []);

  // フォームの設定
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // コメント送信
  const CommentForm_send_ButtonClick = async () => {
    if (typeof window !== 'undefined') {
      const comment_reply_form_button = document.getElementById(`commentForm_send`);
      if(comment_reply_form_button){
        comment_reply_form_button.classList.add('pointer-events-none');
        comment_reply_form_button.innerText=(`送信中...`)
      }
      if(await API_commentForm_send('comment',username,userId,avatar_url,user_tag,comment)){
        window.alert('コメントを投稿しました！');
        window.location.href=(`${window.location}`);
      }else{
        alert('スペース以外の文字を最低一文字入力してください！');
        if(comment_reply_form_button){
          comment_reply_form_button.classList.remove('pointer-events-none');
          comment_reply_form_button.innerText=(`コメントを投稿`)
        }
      }
    }
  };

  return (
    <body>
      {isLangLoaded ? (
        <>
          {SiteViewSetVal() ? (
            <>
              <Header/>
              <div>
                {/* トップイメージ */}
                <TopImage/>
                {/* 製作者 / 開発者 */}
                <div className=" bg-zinc-800">
                  <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 undefined">
                    <div className="flex-col lg:flex-row flex items-center gap-8">
                      <div className="lg:flex items-center justify-center lg:justify-start w-full lg:w-1/3">
                        <h4 className="text-dark-100 undefined font-bold text-h4 text-center mb-2 lg:mb-0">
                        ゲーム製作者
                        </h4>
                        <div className="flex items-center flex-wrap justify-center lg:justify-left gap-8 lg:flex-1">
                          <a className='tooltip' href='https://github.com/Masaabu' target='_block'>
                            <img src="/assets/img/@Masaabu-YT_icon.png" className="w-[60px] h-[60px] rounded-lg aos-init aos-animate" arial-label="@Masaabu-YT" data-aos="fade-up" data-aos-delay="200"/>
                            <span className='tooltiptext'>Masaabu</span>
                          </a>
                        </div>
                      </div>
                      <div className="lg:flex items-center justify-center lg:justify-start w-full lg:w-1/3">
                        <h4 className="text-dark-100 undefined font-bold text-h4 text-center mb-2 lg:mb-0">
                        サイト製作者
                        </h4>
                        <div className="flex items-center flex-wrap justify-center lg:justify-left gap-8 lg:flex-1">
                          <a className='tooltip' href='https://github.com/fun117/' target='_block'>
                            <img src="/assets/img/@Fun117_icon.png" className="w-[60px] h-[60px] rounded-lg aos-init aos-animate" arial-label="@Fun117" data-aos="fade-up" data-aos-delay="400"/>
                            <span className='tooltiptext'>Fun117</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* メイン */}
                <div className='mt-20 mb-20'>
                  <div className="items-center">
                    <div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
                      <h2 className=' font-bold text-2xl'>気軽にMOD開発！</h2>
                      <p className='mb-[10px]'>
                        ビル経営ゲームのMODを作りたいと思ったことはありませんか？
                        <br/>
                        そんなあなたへ！誰でも簡単にMODを作れるプロジェクトを見てみましょう！
                      </p>
                      <a href={links_config.site_url_mods}>
                        <button className='bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[18px] py-[10px] text-sm transition duration-300 ease-in-out'>
                        ページを見る
                        </button>
                      </a>
                    </div>
                    <div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
                      <h2 className=' font-bold text-2xl'>お知らせ</h2>
                      <p className='mb-[10px]'>
                        ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！
                        <br/>
                        これからもビル経営ゲームをよろしくお願いします！
                      </p>
                    </div>
                    <div className='fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md'>
                      <h2 className=' font-bold text-2xl'>コメント欄</h2>
                      <div className='flex flex-col justify-center items-center max-w-[600px] m-auto mt-[10px] pt-2 pb-5 gap-2 border-b-[2px] border-zinc-700'>
                        {username!=='false' ? (
                          <>
                            <input key='commentForm_name' type='text' placeholder='名前' value={username ? username : 'guest'} readOnly className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setName(e.target.value)}/>
                            <textarea key='commentForm_comment' placeholder='コメント' className='flex min-h-[80px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' onChange={(e) => setComment(e.target.value)}/>
                            {username && userId && avatar_url && user_tag ? (
                              <>
                                <button id='commentForm_send' className='bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[24px] py-[12px] text-sm transition duration-300 ease-in-out' onClick={CommentForm_send_ButtonClick}>コメントを投稿</button>
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
                      <ul id='comments' className='flex flex-col justify-center items-center w-full gap-1 mt-10 *:flex *:flex-row *:flex-wrap *:justify-end *:items-center *:w-full *:p-1'>
                        {commentsRes && CommentAddHtml('comment',comments,username,userId,user_tag,avatar_url) ? (
                          <>
                            {comments.length > 0 ? (
                              <>
                                {CommentAddHtml('comment',comments,username,userId,user_tag,avatar_url)}
                              </>
                            ) : (
                              <>
                                <li className='animated-slideIn-up p-2'>
                                  <h1 className='text-zinc-400 text-[1.2rem] m-auto'>コメントがまだ投稿されていません</h1>
                                </li>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <div className='w-full m-auto'>
                              <div className='flex flex-col justify-center items-center gap-2 w-full m-auto'>
                                <div className="animate-spin h-10 w-10 border-4 border-gray-500 rounded-full border-t-transparent"></div>
                                <span className='text-zinc-400'>コメント取得中...</span>
                              </div>
                            </div>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto hidden">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-700 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      </div>
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
    </body>
  )
};
