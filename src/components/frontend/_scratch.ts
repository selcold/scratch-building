import { _cfgSite } from "../configs/siteLinks";

export function Scratch_GET_user_image( user_id: string ) {
    return `https://cdn2.scratch.mit.edu/get_image/user/${user_id}_60x60.png`
}

export function ValidationCheck_comment(content: string){
    const newContent = content.replace(/\s+/g,'');
    if(newContent.length > 0){
        return content;
    }
    return false;
};