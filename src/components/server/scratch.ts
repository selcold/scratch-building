// /src/components/backend/scratch.ts

'use server';

import { _cfgSite } from '../configs/siteLinks';

// ユーザー情報を取得する関数
export const ScratchAuthGET_UserProfile = async (username: string): Promise<any> => {
    const response = await fetch(`https://api.scratch.mit.edu/users/${username}`);
    const userData = await response.json();

    return userData;
};