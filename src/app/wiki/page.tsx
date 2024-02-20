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
import { UserInfo_publicMetadata_beta } from '../../../components/clerk/UserInfo_publicMetadata';
import { TopImage } from '../../../components/element/topimage';
import { PageLoading } from '../../../components/element/pageLoading';
import { SiteViewCheck, SiteViewSetVal } from '../../../components/element/siteViewCheck';

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
                {SiteViewSetVal() ? (
                    <>
                    <Header/>
                    <div>
                        {/* トップイメージ */}
                        <TopImage/>
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
                    <SiteViewCheck/>
                )}
                </>
            ) : (
                <PageLoading/>
            )}
        </body>
    )
};
