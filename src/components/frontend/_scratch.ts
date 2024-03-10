import { eraseEncryptedUsername, getDecryptedSessionId } from "../backend/cookie";
import { _cfgSite } from "../configs/siteLinks";

// redirect
export const ScratchAuth_redirectToAuth = () => {
    const redirectLocation = btoa(`${_cfgSite.origin}/api/auth`); // Base64 encoded

    const username = getDecryptedSessionId('username');
    if (username) {
    } else {
        window.location.href = `https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=${_cfgSite.title}`;
    }
};

export const ScratchAuth_logout = () => {
    // remove the session

    eraseEncryptedUsername('username');

    window.location.href = `/`;
};

export function Scratch_GET_user_image( user_id: string ) {
    return `https://cdn2.scratch.mit.edu/get_image/user/${user_id}_60x60.png`
}