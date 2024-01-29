'use client'

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/header';
import Footer from '../../components/footer';
import links_config from '../../public/assets/data/links_config';
import { HeadCustom_config } from '../../components/headCustom';
import { FadeUpTrigger } from '../../components/fadeUpTrigger';
import { UserInfo_userId, UserInfo_username } from '../../components/userInfo';
import { sendGetRequestToGAS } from '../../components/get';
import '../../components/siteView/site_view'
import { ViewLocked_check, updatePassword } from '../../components/siteView/site_view';

export default function Home() {
  // 表示認証制度機能
  var isSiteViewLoad;
  if(process.env.NEXT_PUBLIC_SITE_VIEW_Locked === 'true'){
    isSiteViewLoad = ViewLocked_check('')
  }else{
    isSiteViewLoad = true
  }
  const [ViewLocked_password, setViewLocked_password] = useState('');

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

  // コメント送信
  const handlePostRequest = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER}?apikey=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY}&sheet=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_SHEET_ID}&mode=postComment&name=${username}&userId=${userId}`);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error sending POST request to GAS:', error);
    }
  };

  // コメント取得
  useEffect(() => {
    sendGetRequestToGAS();
  }, []);

  // フォームの設定
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  return (
    <body>
      {isLangLoaded ? (
        <>
          {isSiteViewLoad ? (
            <>
              <Header/>
              <div>
                {/* トップイメージ */}
                <div id='top_image' className="w-full relative z-1 min-h-[calc(100vh-20%)] flex" style={{background:`linear-gradient(rgb(19, 21, 31) -4.84%, rgb(29, 28, 47) 34.9%, rgb(32 38 54) 48.6%, rgb(40 48 62) 66.41%, rgb(61 85 98) 103.41%, rgb(81 124 140) 132.18%)`}}>
                  <div className="absolute w-full h-full -z-1 bottom-0 left-0 pointer-events-none overflow-hidden">
                    <img src={links_config.game_play_img} alt="Forest dark" className="w-full absolute bottom-0 pt-96" />
                  </div>
                  <div className="backdrop-blur-sm backdrop-brightness-50 min-h-full w-full flex items-center justify-start">
                    <div className="mx-auto w-full max-w-screen-lg px-6 lg:px-10 py-6 lg:py-10 pt-10 lg:pt-24 lg:py-36">
                      <div className='absolute bottom-2 left-2'>
                        <h1 className='mb-1'>{links_config.game_name}v{links_config.game_version}</h1>
                        <a href={links_config.game_play_url} target='_block'>
                          <button className='button_border_1'>
                          {links_config.game_play_platform}でプレイ
                          </button>
                        </a>
                      </div>
                      <div className="w-full text-center mt-10 lg:mt-20">
                        <h1 className="text-white min-h-32 font-bold text-2xl md:text-5xl">{links_config.game_name}v{links_config.game_version}</h1>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-black">
                      <h2 className=' font-bold text-2xl'>気軽にMOD開発！</h2>
                      <p className='mb-[10px]'>
                        ビル経営ゲームのMODを作りたいと思ったことはありませんか？
                        <br/>
                        そんなあなたへ！誰でも簡単にMODを作れるプロジェクトを見てみましょう！
                      </p>
                      <a href='#'>
                        <button className='button_blue_1'>
                        ページを見る
                        </button>
                      </a>
                    </div>
                    <div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-black">
                      <h2 className=' font-bold text-2xl'>お知らせ</h2>
                      <p className='mb-[10px]'>
                        ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！
                        <br/>
                        これからもビル経営ゲームをよろしくお願いします！
                      </p>
                    </div>
                    <div className='fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-black'>
                      <h2 className=' font-bold text-2xl'>コメント欄</h2>
                      <div className='max-w-[600px] m-auto gap-10'>
                        <input key='commentForm_name' type='text' placeholder='名前' value={username ? username : 'guest'} readOnly className='flex min-h-[20px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setName(e.target.value)}/>
                        <textarea key='commentForm_comment' placeholder='コメント' className='flex min-h-[80px] w-full rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' onChange={(e) => setComment(e.target.value)}/>
                        <button id='commentForm_send' className='button_blue_1 mt-[10px] m-auto' onClick={handlePostRequest}>コメントを送信</button>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer/>
            </>
          ) : (
            <div className='fixed flex flex-col justify-center items-center w-full h-full'>
              <div className='flex flex-col justify-center items-center p-4 mb-10 gap-2'>
                <h1 className='font-bold text-4xl'>ビル経営ゲーム</h1>
                <p className='p-5'>サイトは現在限定公開です。表示するにはパスワード認証を行う必要があります。</p>
              </div>
              <div className='gap-4 flex flex-col justify-center items-center'>
                <input type='text' placeholder='パスワード' className='flex min-h-[20px] min-w-[200px] lg:w-[400px] rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setViewLocked_password(e.target.value)}/>
                <button className='button_blue_1' onClick={() => updatePassword(ViewLocked_password)}>表示</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="fixed flex justify-center items-center w-full h-full" aria-label="loading">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </body>
  )
};
