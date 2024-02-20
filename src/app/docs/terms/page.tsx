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
                      <h2 className='font-bold text-3xl text-center'>Scratch Building 利用規約</h2>
                      <ul className='flex flex-col gap-4 mt-5'>
                        <li>
                          このウェブサイト（以下、「サイト」といいます）をご利用いただき、ありがとうございます。以下の利用規約をよくお読みいただき、ご理解いただいた上で、本サイトをご利用ください。本利用規約は、本サイトの利用者（以下、「利用者」といいます）とサイト管理者との間の契約を構成します。
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>1. 利用規約の受諾</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトを利用する前に、本利用規約をよくお読みください。本利用規約に同意した場合にのみ、本サイトを利用することができます。本サイトを利用することにより、利用者は本利用規約に拘束されることに同意したものとみなされます。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>2. サイトの利用</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトは、利用者にゲームやコンテンツへのアクセスを提供することを目的としています。利用者は、本サイトを適法に、かつ利用規約に従って利用するものとします。</li>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトの一部または全部を改変、複製、転載、販売、または無断で利用することは禁止されています。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>3. 登録とアカウント</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトでの特定の機能の利用やコミュニティへの参加には、アカウントの登録が必要な場合があります。利用者は、自己の責任において、正確かつ完全な情報を提供し、アカウントを作成するものとします。</li>
                            <li><span className='select-none pointer-events-none'>・</span>アカウントの情報は、利用者自身によって管理されるものとし、第三者と共有することは禁止されています。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>4. コミュニティのルール</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトのコミュニティに参加する利用者は、コミュニティーガイドラインを遵守するものとします。不適切な行動やコンテンツの投稿は禁止されています。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>5. 免責事項</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトの利用は、利用者の自己責任で行われるものとし、本サイト管理者は、利用者が本サイトを利用することによって生じた損害について一切の責任を負いません。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>6. 利用規約の変更</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本利用規約は、サイト管理者の裁量により変更される場合があります。利用者は、定期的に本利用規約を確認することを推奨します。</li>
                          </ul>
                        </li>
                        <li>
                          <h2 className='font-bold text-[20px]'>7. 連絡先</h2>
                          <ul>
                            <li><span className='select-none pointer-events-none'>・</span>本サイトに関するお問い合わせや連絡は、サイト管理者までご連絡ください。</li>
                          </ul>
                        </li>
                        <li>
                        ご利用ありがとうございます。
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
