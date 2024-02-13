'use server';

import { currentUser } from "@clerk/nextjs";

export const UserInfo_publicMetadata_beta = async () => {
    try {
        const user = await currentUser();
        //console.log(JSON.stringify(user?.publicMetadata))
        if((JSON.stringify(user?.publicMetadata))){
            return (JSON.stringify(user?.publicMetadata));
        }else{
            return 'false';
        }
    } catch (error) {
        console.error('Error:', error);
    }
};