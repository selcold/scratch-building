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
		"title":`AD | ${links_config.site_title}`,
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
								<TopImage/>
								{/* 製作者 / 開発者 */}
								<div className=" bg-zinc-800">
									<div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 undefined">
									</div>
								</div>
								{/* メイン */}
								<div className='mt-20 mb-20'>
									<div className="items-center">
										<div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
											<h2 className='font-bold text-2xl'>AD（広告，宣伝）</h2>
											<p className='mb-[10px]'>
												作品を広告で宣伝したいと思ったことはありませんか？
												<br/>
												そんなあなたへ！誰でも簡単に広告を作成して公開することができるサービスを利用しましょう！
											</p>
										</div>
										<div className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
											<h2 className='font-bold text-2xl text-center'>現在サービスを利用することはできません</h2>
											<p className='mb-[10px] text-center'>
												このサービスは製作中の為利用することはできません。
												<br/>
												そして、サービスの運用開始をする日程は現在未定です。
											</p>
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
