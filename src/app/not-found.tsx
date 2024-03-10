// /src/app/not-found.tsx

'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { _locales } from '@/components/frontend/site/_locales';
import { HeadCustom_config } from '@/components/frontend/site/metaCustom';
import Loading from '@/components/frontend/elements/loading';

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
		title:`${_locales('Page not found')} | SafeEncode`,
	};
	HeadCustom_config(Head_config);
	
	return (
		<>
			{isLangLoaded ? (
				<>
					<div>
						<h1>{`404 ${_locales('Page not found')}`}</h1>
					</div>
				</>
			):(
				<Loading/>
			)}
		</>
	);
}