'use client'

import { useUser, useAuth } from '@clerk/nextjs';

export const UserInfo_username = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded || !user) {
        return 'false';
    }

    const userInfo = user.username ? user.username : 'false';

    return userInfo;
};

export const UserInfo_userId = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    if (!isLoaded || !userId) {
        return 'false';
    }

    const userInfo = userId ? userId : 'false';

    return userInfo;
};

export const UserInfo_avatar_url = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded || !user) {
        return 'false';
    }

    const userInfo = user.imageUrl ? user.imageUrl : 'false';

    return userInfo;
};