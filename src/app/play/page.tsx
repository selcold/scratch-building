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
import '../../../components/siteView/site_view';
import { UserInfo_publicMetadata_beta } from '../../../components/clerk/UserInfo_publicMetadata';
import { TopImage } from '../../../components/element/topimage';
import { PageLoading } from '../../../components/element/pageLoading';
import { SiteViewCheck, SiteViewSetVal } from '../../../components/element/siteViewCheck';
import { PlayGetListHtml } from '../../../components/page/play';

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
        "title":`${links_config.site_title} - MOD`,
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

    // play 読み込み
    const [playListHtml, setPlayListHtml] = useState<JSX.Element[]>([]);
    useEffect(() => {
        const fetchPlayGetListHtml = async () => {
            try {
                const result = await PlayGetListHtml();
                if (result) {
                    //console.log(result)
                    setPlayListHtml(result);
                } else {
                    console.error('Playデータが取得できませんでした');
                }
            } catch (error) {
                console.error('エラー:', error);
            }
        }
        fetchPlayGetListHtml();
    }, [])

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
                                </div>
                            </div>
                        </div>
                        {/* メイン */}
                        <div className='mt-20 mb-20'>
                            <div className="items-center">
                                <div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
                                    <h2 className=' font-bold text-2xl'>ビル経営ゲーム プレイ</h2>
                                    <p className='mb-[10px]'>
                                    ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！<br/>これからもビル経営ゲームをよろしくお願いします！
                                    </p>
                                </div>
                                <section className='flex flex-wrap justify-center'>
                                    <div className='max-w-[800px] mx-auto'>
                                    {playListHtml}
                                    </div>
                                </section>
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
