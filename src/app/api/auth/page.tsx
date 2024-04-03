// /src/app/api/auth/page.tsx

'use client'

import { useEffect, useState } from 'react';
import Loading from '@/components/client/elements/loading';
import { DarkModeSET } from '@/components/client/site/main';
import { HeadCustom_config } from '@/components/client/site/metaCustom';
import { _locales } from '@/components/client/site/_locales';
import { _cfgSite } from '@/components/configs/siteLinks';
import { useSearchParams } from 'next/navigation';
import { ScratchAuthSET_session } from 'scratch-auth-react';

export default function Home() {
    const searchParams = useSearchParams();
    
    // headカスタム
	const Head_config = {
        title: `${_locales('Auth')} | ${_locales(_cfgSite.title)}`,
	};
	HeadCustom_config(Head_config);
    
    const [isLangLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const privateCode = searchParams.get('privateCode');
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