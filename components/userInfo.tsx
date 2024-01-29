import { useUser, useAuth } from '@clerk/nextjs';

export const UserInfo_username = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return `Guest`;
    }

    const userInfo = isSignedIn ? user.username : 'Guest';

    return userInfo;
};

export const UserInfo_userId = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    if (!isLoaded || !userId) {
        return `Guest`;
    }

    const userInfo = userId ? userId : 'user_guest';

    return userInfo;
};