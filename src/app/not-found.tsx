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

export default function NotFound() {
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
		"title":`Page not found | ${links_config.site_title}`,
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
		<>
			{isLangLoaded ? (
				<>
					{SiteViewSetVal() ? (
						<>
							<Header/>
							<div>
								{/* トップイメージ */}
								<TopImage title="Page not found"/>
								{/* 製作者 / 開発者 */}
								<div className="bg-zinc-800">
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
                                            <a href={links_config['site_url_docs/ad']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - AD</h2>
                                                <p className='mb-[10px]'>
                                                作品を広告で宣伝したいと思ったことはありませんか？そんなあなたへ！誰でも簡単に広告を作成して公開することができるサービスを利用しましょう！
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
                                        <div className="animated-slideIn-up bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_docs/terms']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - 利用規約</h2>
                                                <p className='mb-[10px]'>
                                                以下の利用規約をよくお読みいただき、ご理解いただいた上で、本サイトをご利用ください
                                                </p>
                                            </a>
                                        </div>
                                        <div className="animated-slideIn-up bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md hover:shadow-zinc-500/20 hover:scale-[1.02] active:shadow-zinc-900/10 active:scale-95 transition duration-300 ease-in-out">
                                            <a href={links_config['site_url_docs/guideline']} className='cursor-pointer'>
                                                <h2 className='font-bold text-2xl text-blue-400 hover:text-blue-500 transition duration-500 ease mr-2'>ビル経営ゲーム - ガイドライン</h2>
                                                <p className='mb-[10px]'>
                                                コミュニティーの健全な環境を保つためのお手伝いをしてください
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
		</>
	)
};
