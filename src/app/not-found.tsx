// /src/app/not-found.tsx

'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { _locales } from '@/components/client/site/_locales';
import { HeadCustom_config } from '@/components/client/site/metaCustom';
import Loading from '@/components/client/elements/loading';
import { _cfgSite } from '@/components/configs/siteLinks';
import { ElementGroup, Main } from '@/components/client/elements/main';
import Header from '@/components/client/elements/header';
import { ContentsSET } from '@/components/client/elements/contents';
import Footer from '@/components/client/elements/footer';
import { _cfg_logs } from '@/components/configs/config';
import { getDecryptedSessionId } from '@/components/server/cookie';
import { ScratchAuthGET_UserProfile } from '@/components/server/scratch';
import { DarkModeSET } from '@/components/client/site/main';

export default function Home() {

    // headカスタム
	const Head_config = {
		title:`${_locales('Page not found')} | ${_locales(_cfgSite.title)}`,
	};
	HeadCustom_config(Head_config);

	const [NetworkStatus, setNetworkStatus] = useState<string>("online");
	const [isLangLoaded, setPageLoaded] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
	const [userId, setUserId] = useState<any | null>(null);
	const [userImage, setUserImage] = useState<any | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [userData_profile_bio, set_userData_profile_bio] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (typeof window !== 'undefined') {
					DarkModeSET();
					window.addEventListener("offline", (e) => {
						setNetworkStatus("offline")
					});
					window.addEventListener("online", (e) => {
						setNetworkStatus("online")
					});

                    const storedUsername = getDecryptedSessionId('username');
                    setUsername(storedUsername);
					if(_cfg_logs.scratchAuth_userData_log){
						console.log('login:',storedUsername);
					}
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
						if(userData){
							if(_cfg_logs.scratchAuth_userData_log){
								console.log(userData);
							}
							setUserId(userData?.id || null)
							setUserImage(userData?.profile?.images['90x90'] || null);
							set_userData_profile_bio(userData?.profile?.bio || null);
							setUserData(userData);
						}else{
							console.warn('userData null');
						}
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('fetchUserData:', error);
            }
        };

        if (!isLangLoaded) {
            fetchUserData();
        }
    }, [isLangLoaded]);

    if (!isLangLoaded) {
        return <Loading />;
    }

	if (isLangLoaded && NetworkStatus === "offline") {
		return (<><h1>offline</h1></>);
	}

	return (
		<>
			<div>
				<ElementGroup>
					<Header userData={userData} btmSpace title={`404 ${_locales('Page not found')}`}/>
					<Main>
						<section className="flex flex-col gap-5 max-w-[800px] w-full mx-auto p-5">
							<ContentsSET contentTitle={"home"}/>
							<ContentsSET contentTitle={"docs"}/>
						</section>
					</Main>
				</ElementGroup>
				<Footer/>
			</div>
		</>
	);
}