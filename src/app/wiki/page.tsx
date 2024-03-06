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
        "title":`Wiki | ${links_config.site_title}`,
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
                        <div className=" bg-zinc-800">
                            <div className="mx-auto w-full max-w-[1240px] px-6 py-6">
                                <h1 className='font-bold text-2xl text-center'>ビル経営ゲーム - Wiki</h1>
                            </div>
                        </div>
                        {/* メイン */}
                        <div className='mt-20 mb-20'>
                            <ul className="flex flex-col justify-center items-center gap-5 *:max-w-[800px] *:w-full *:m-auto">
                                <li>
                                    <div className='border-zinc-600 border-b-2 p-2 mb-5'>
                                        <h1 className='font-bold text-3xl text-start'>全体</h1>
                                    </div>
                                    <section className='flex flex-col justify-center gap-3'>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config.site_url_qa} className='cursor-pointer'>
                                                <h2 className=' font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - Q&A</h2>
                                                <p className='mb-[10px]'>
                                                ビル経営ゲームに関することで、気になることなどをここで聞いて解決しよう
                                                </p>
                                            </a>
                                        </div>
                                    </section>
                                </li>
                                <li>
                                    <div className='border-zinc-600 border-b-2 p-2 mb-5'>
                                        <h1 className='font-bold text-3xl text-start'>ゲーム関係</h1>
                                    </div>
                                    <section className='flex flex-col justify-center gap-3'>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config.site_url_mods} className='cursor-pointer'>
                                                <h2 className=' font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - MOD</h2>
                                                <p className='mb-[10px]'>
                                                ビル経営ゲームのMODはゲームをより面白くできる拡張機能のようなものです！自分で作ることもできるので是非 [前提MOD] と書いてあるプロジェクトを見てみてください！
                                                </p>
                                            </a>
                                        </div>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_wiki/mods/sbmod']} className='cursor-pointer'>
                                                <h2 className=' font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - SB MOD</h2>
                                                <p className='mb-[10px]'>
                                                SB MODとは、ビル経営ゲームv7でMODを作成する時に役に立つツールである。スプライトを好きなビル経営ゲームクライアントに追加することで自分の好きな要素を追加できる。
                                                </p>
                                            </a>
                                        </div>
                                    </section>
                                </li>
                                <li>
                                    <div className='border-zinc-600 border-b-2 p-2 mb-5'>
                                        <h1 className='font-bold text-3xl text-start'>サイト関係</h1>
                                    </div>
                                    <section className='flex flex-col justify-center gap-3'>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_docs/ad']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - AD</h2>
                                                <p className='mb-[10px]'>
                                                作品を広告で宣伝したいと思ったことはありませんか？そんなあなたへ！誰でも簡単に広告を作成して公開することができるサービスを利用しましょう！
                                                </p>
                                            </a>
                                        </div>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config.site_url_changelog} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - 変更履歴</h2>
                                                <p className='mb-[10px]'>
                                                    ビル経営ゲームのアップデート情報などを確認できる
                                                </p>
                                            </a>
                                        </div>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_docs/terms']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - 利用規約</h2>
                                                <p className='mb-[10px]'>
                                                以下の利用規約をよくお読みいただき、ご理解いただいた上で、本サイトをご利用ください
                                                </p>
                                            </a>
                                        </div>
                                        <div className="animated-slideIn-up bg-zinc-800 w-full ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_docs/guideline']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - ガイドライン</h2>
                                                <p className='mb-[10px]'>
                                                コミュニティーの健全な環境を保つためのお手伝いをしてください
                                                </p>
                                            </a>
                                        </div>
                                    </section>
                                </li>
                            </ul>
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
