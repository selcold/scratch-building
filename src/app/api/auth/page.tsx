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

export default function Home() {

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
                    const paramsString = window.location.search;
                    const searchParams = new URLSearchParams(paramsString);
                    const privateCode = searchParams.get("privateCode");
                    if (privateCode){
                        const res = await ScratchAuth_verifyToken(privateCode);
                        if(res){
                            const obj = JSON.parse(res);
                            setEncryptedUsername('username', obj.data.username, 30);
                            window.location.href=(window.location.origin);
                            return true;
                        }else{
                            window.location.href=(window.location.origin);
                        }
                    }else{
                        window.location.href=(window.location.origin);
                    };
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