'use server';

import { Clerk_backendApi_users } from "./clerk";
import { customLog } from "./customLog";
import { sendWebhook } from "./webhook";

export async function API_commentForm_send(username:string,userId:string,user_tag:string,comment:string,) {
    const currentDate = new Date();
    const formattedDate = `[${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}]`;
    const data = formattedDate;
    if(await  Clerk_backendApi_users('boolean',userId)){
        //customLog(`User ID verification successful.`, '✓', '32', '0', 'log');
        if(validationCheck_comment(comment)){
            API_gas_backendApi_new_commentSend(username,userId,user_tag,comment);
            return true
        }else{
            return false
        }
    }else{
        //customLog(`User ID authentication failed.`, '⚠', '33', '0', 'warn');
        return false
    };
};

// コメント取得関数
export const sendGetRequestToGAS = async () => {
    try {
        // GASのAPIエンドポイントを設定
        const apiUrl = `${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER}?apikey=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY}&sheet=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_SHEET_ID}&mode=getComments`;
        //console.log(apiUrl)
        // Fetch APIを使用してGETリクエストを送信
        const response = await fetch(apiUrl, {
            method: 'GET',
            cache: 'no-store' // キャッシュを無効化
        });
    
        // レスポンスをJSON形式で取得
        const result = await response.json();
    
        // 取得したデータを利用するなどの処理を行う
        return result; // 結果を返す
    } catch (error) {
        console.error('GASへのGETリクエスト送信中にエラーが発生しました:', error);
        throw error; // エラーを再スローする
    }
};

// コメント送信
export const API_gas_backendApi_new_commentSend = async (username:string,userId:string,user_tag:string,comment:string,replyGroupId:string = 'false',replyId: string = 'false',replyUser:string = '返信') => {
    try {
        //customLog(`Communicating with the comment database...`, '○', '0', '0', 'log');
        const compileStartTime = performance.now();
        // get user icon
        const avatar_url = await Clerk_backendApi_users('',userId);
        var apiUrl = `${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER}?apikey=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY}&sheet=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_SHEET_ID}&mode=postComment&name=${username}&userId=${userId}&user_tag=${user_tag}&comment=${comment}&avatar_url=${avatar_url.image_url}`
        if(replyGroupId!=='false'){
            apiUrl = `${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER}?apikey=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY}&sheet=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_SHEET_ID}&mode=postComment&name=${username}&userId=${userId}&user_tag=${user_tag}&comment=${comment}&replyGroupId=${replyGroupId}&replyId=${replyId}&avatar_url=${avatar_url.image_url}`
        };
        const response = await fetch(apiUrl, {
            method: 'GET',
            cache: 'no-store'
        });
        const compileEndTime = performance.now();
        if (!response.ok) {
            console.error('status:', response.status);
            console.error('res msg', response.statusText)
            throw new Error('Error sending POST request to GAS:');
        };
        const result = await response.json();
        const compileTime = Math.round(compileEndTime - compileStartTime);
        //customLog(`Communicating with the comment database took ${compileTime}ms.`, '✓', '32', '0', 'log');
        if(replyGroupId==='false'){
            sendWebhook(`${process.env.WEBHOOK_DISCORD_COMMENT_CHANNEL}`,`### ${comment}`,`discord`,username);
        }else{
            sendWebhook(`${process.env.WEBHOOK_DISCORD_COMMENT_CHANNEL}`,`_@${replyUser}に返信_\n### ${comment}`,`discord`,username);
        };
        return true
    } catch (error: any) {
        console.error('Error sending POST request to GAS:', error.message);
        return false
    };
};

function validationCheck_comment(content: string){
    const newContent = content.replace(/\s+/g,'');
    if(newContent.length > 0){
        return content;
    }
    return false;
};