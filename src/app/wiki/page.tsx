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
import '../../../components/siteView/site_view'
import { ViewLocked_check, updatePassword } from '../../../components/siteView/site_view';
import { UserInfo_publicMetadata_beta } from '../../../components/clerk/UserInfo_publicMetadata';
import { modsGetListHtml } from '../../../components/page/mods';

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
        "title":`${links_config.site_title} - Wiki`,
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
                            <div className="absolute w-full h-full -z-1 bottom-0 left-0 pointer-events-none overflow-hidden bg-[#97b7d1]">
                                <img src={links_config.game_play_img} alt="Forest dark" className="w-full absolute bottom-0" />
                            </div>
                            <div className="backdrop-blur-sm backdrop-brightness-50 min-h-full w-full flex items-center justify-start">
                                <div className="mx-auto w-full max-w-screen-lg px-6 lg:px-10 py-6 lg:py-10 pt-10 lg:pt-24">
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
                            <div className="mx-auto w-full max-w-[1240px] px-6 py-6">
                                <h1 className='font-bold text-2xl text-center'>ビル経営ゲーム - Wiki</h1>
                            </div>
                        </div>
                        {/* メイン */}
                        <div className='mt-20 mb-20'>
                            <div className="items-center">
                                <div className="animated-slideIn-up bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                    <a href={links_config.site_url_mods} className='cursor-pointer'>
                                        <h2 className=' font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - MOD</h2>
                                        <p className='mb-[10px]'>
                                        ビル経営ゲームのMODはゲームをより面白くできる拡張機能のようなものです！自分で作ることもできるので是非 [前提MOD] と書いてあるプロジェクトを見てみてください！
                                        </p>
                                    </a>
                                </div>
                                <div className="animated-slideIn-up bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                    <a href={links_config.site_url_qa} className='cursor-pointer'>
                                        <h2 className=' font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - Q&A</h2>
                                        <p className='mb-[10px]'>
                                        ビル経営ゲームに関することで、気になることなどをここで聞いて解決しよう
                                        </p>
                                    </a>
                                </div>
                                <div className="animated-slideIn-up bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                    <a href={links_config.site_url_changelog} className='cursor-pointer'>
                                        <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - 変更履歴</h2>
                                        <p className='mb-[10px]'>
                                            ビル経営ゲームのアップデート情報などを確認できる
                                        </p>
                                    </a>
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
