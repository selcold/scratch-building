// /src/components/backend/scratch.ts

'use server';

import crypto from 'crypto';
import { _cfgSite } from '../configs/siteLinks';

export async function ScratchAuth_verifyToken(privateCode: string): Promise<any> {
    try {
        const res = await fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`);
        const data = await res.json();
        
        if (data.valid === true && data.redirect === `${_cfgSite.origin}/api/auth`) {
            let sessionId = crypto.randomUUID();
            //console.log({ sessionId, data });
            return JSON.stringify({ sessionId, data });
        }
    } catch (error) {
        console.error("Error:", error);
    }
    return undefined;
}

// ユーザー情報を取得する関数
export const ScratchAuthGET_UserProfile = async (username: string): Promise<any> => {
    const response = await fetch(`https://api.scratch.mit.edu/users/${username}`);
    const userData = await response.json();

    //console.log(await ScratchAuthGET_UserRole_ADMINISTRATOR(username))

    return userData;
};

export async function ScratchAuthGET_UserRole_ADMINISTRATOR( username: string ) {
    const ADMINISTRATOR = process.env.ADMINISTRATOR;
    if(ADMINISTRATOR){
        if(ADMINISTRATOR.includes(username)){
            return true;
        }
    }
    return false;
}