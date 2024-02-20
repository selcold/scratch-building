'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faExclamation, faLink, faReply } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../../../components/element/header';
import Footer from '../../../../components/element/footer';
import links_config from '../../../../public/db/data/links_config';
import { HeadCustom_config } from '../../../../components/site/headCustom';
import { FadeUpTrigger } from '../../../../components/site/fadeUpTrigger';
import { UserInfo_avatar_url, UserInfo_userId, UserInfo_username } from '../../../../components/clerk/userInfo';
import { UserInfo_publicMetadata_beta } from '../../../../components/clerk/UserInfo_publicMetadata';
import { TopImage } from '../../../../components/element/topimage';
import { PageLoading } from '../../../../components/element/pageLoading';
import { SiteViewCheck, SiteViewSetVal } from '../../../../components/element/siteViewCheck';

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
                      <h2 className=' font-bold text-3xl text-center'>Scratch Building コミュニティーガイドライン</h2>
                      <ul className='flex flex-col gap-4 mt-5'>
                        <li>
                        ようこそ、Scratch Building コミュニティーへ！ここでは、楽しい体験を共有し、他のメンバーと交流する場を提供しています。以下のガイドラインをお読みいただき、コミュニティーの健全な環境を保つためのお手伝いをしてください。
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>1. フレンドリーで礼儀正しく</h2>
                          <li><span className='select-none pointer-events-none'>・</span>コミュニティーのメンバー全員を尊重しましょう。失礼な発言や攻撃的な振る舞いは禁止です。</li>
                          <li><span className='select-none pointer-events-none'>・</span>他のメンバーに対して常に礼儀正しく、親切に接しましょう。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>2. コメントの適切な使用</h2>
                          <li><span className='select-none pointer-events-none'>・</span>コメントは建設的でプラスのフィードバックやアイデアを共有するために使用しましょう。</li>
                          <li><span className='select-none pointer-events-none'>・</span>誹謗中傷や不適切な言葉の使用は禁止です。子供たちも利用することを考えて、言葉遣いには十分に気を付けてください。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>3. プライバシーの尊重</h2>
                          <li><span className='select-none pointer-events-none'>・</span>他のメンバーのプライバシーを尊重しましょう。個人情報や他人の作品を無断で共有しないでください。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>4. コンテンツの適切な投稿</h2>
                          <li><span className='select-none pointer-events-none'>・</span>コンテンツの投稿はコミュニティーのテーマに関連している必要があります。</li>
                          <li><span className='select-none pointer-events-none'>・</span>不適切なコンテンツやスパムは禁止されています。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>5. モデレーションの従順</h2>
                          <li><span className='select-none pointer-events-none'>・</span>モデレーターの指示に従いましょう。彼らはコミュニティーの秩序を保つために働いています。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>6. フォーラムの適切な利用</h2>
                          <li><span className='select-none pointer-events-none'>・</span>フォーラムはコミュニティーのメンバーが意見を交換する場です。しかし、トピックはコミュニティーのテーマに沿ったものに限ります。</li>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>7. 問題の報告</h2>
                          <li><span className='select-none pointer-events-none'>・</span>問題が発生した場合は、直ちにモデレーターに報告してください。問題を早期に解決するために、皆さんの協力が必要です。</li>
                        </li>
                        <li>
                        これらのガイドラインに従うことで、Scratch Building コミュニティーは皆さんにとって楽しい場所となります。皆さんの協力と理解に感謝します！
                        </li>
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
    </body>
  )
};
