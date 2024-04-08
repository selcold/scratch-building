// /src/components/backend/comments.ts

'use server';

import { Scratch_GET_user_image } from "../client/_scratch";
import { sendWebhook } from "./webhook";

function ScratchComment_escape(content: string){
    const newContent = content.replace(/\s+/g,'\n');
    return newContent;
}

export async function Server_GetRequest_Comments() {
    try {
        // GASのAPIエンドポイントを設定
        const apiUrl = `${process.env.COMMENT_SERVER_API_URL}?apikey=${process.env.COMMENT_SERVER_API_KEY}&sheet=${process.env.COMMENT_SERVER_SHEET_ID}&mode=get_comments`;

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
export const API_gas_backendApi_new_commentSend = async ( user_name: string, user_id: string, user_tag: string, content: string, reply_group_id: string = 'false', reply_id: string = 'false', replyUser: string = '返信' ) => {
    try {
        const compileStartTime = performance.now();
        const user_image = Scratch_GET_user_image( user_id );
        const comment = ScratchComment_escape(content);
        let uri = `${process.env.COMMENT_SERVER_API_URL}?apikey=${process.env.COMMENT_SERVER_API_KEY}&sheet=${process.env.COMMENT_SERVER_SHEET_ID}&mode=post`

        const apiUrl = encodeURI(uri);

        let dataToSend = {
            user_name: `${user_name}`,
            user_id: `${user_id}`,
            user_tag: `${user_tag}`,
            reply_group_id: `${reply_group_id}`,
            reply_id: `${reply_id}`,
            content: `${comment}`,
        };

        let body = JSON.stringify(dataToSend);

        const response = await fetch(apiUrl, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        const compileEndTime = performance.now();
        if (!response.ok) {
            console.error('status:', response.status, '\nres msg', response.statusText);
            throw new Error('Error sending POST request to GAS (response):');
        };
        const result = await response.json();
        const compileTime = Math.round(compileEndTime - compileStartTime);
        //customLog(`Communicating with the comment database took ${compileTime}ms.`, '✓', '32', '0', 'log');
        let commentEm = ""+content+"";
        if(reply_group_id==='false'){
            await sendWebhook(`${process.env.WEBHOOK_DISCORD_COMMENT_CHANNEL}`,`${commentEm}`,`discord`,user_name,user_image);
        }else{
            await sendWebhook(`${process.env.WEBHOOK_DISCORD_COMMENT_CHANNEL}`,`*${replyUser}に返信*\n${commentEm}`,`discord`,user_name,user_image);
        };
        return true
    } catch (error: any) {
        console.error('Error sending POST request to GAS:', error.message);
        return false
    };
};