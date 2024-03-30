// /src/app/api/auth/page.tsx

'use client'

import { useEffect, useState } from 'react';
import { setEncryptedUsername } from '@/components/backend/cookie';
import { ScratchAuth_verifyToken } from '@/components/backend/scratch';
import Loading from '@/components/frontend/elements/loading';
import { DarkModeSET } from '@/components/frontend/site/main';
import { HeadCustom_config } from '@/components/frontend/site/metaCustom';
import { _locales } from '@/components/frontend/site/_locales';
import { _cfgSite } from '@/components/configs/siteLinks';
import { useSearchParams } from 'next/navigation';
import { ScratchAuthSET_session } from 'scratch-auth-react';

export default function Home() {
    const searchParams = useSearchParams();
    const privateCode = searchParams.get('privateCode');

    // headカスタム
	const Head_config = {
		title: `${_locales('Auth')} | ${_locales(_cfgSite.title)}`,
	};
	HeadCustom_config(Head_config);

    const [isLangLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                if(typeof window !== 'undefined') {
                    DarkModeSET();
                    await ScratchAuthSET_session(privateCode); //アカウント認証
                    window.location.href = `/`; //ホーム移動
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('auth page:', error);
            }
        };

        if (!isLangLoaded) {
            fetchLanguage();
        }
    }, [isLangLoaded]);

    if (!isLangLoaded) {
        return <Loading />;
    }
    
    return (
        <Loading />
    );
}