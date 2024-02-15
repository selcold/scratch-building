'use server';

import { customLog } from "./customLog";

// WebHook送信関数
export const sendWebhook = async (_webhookUrl:string, webhookSendData:string, mode:string = 'default', username:string = 'webhook', avatar_url:string) => {
    const currentDate = new Date();
    const formattedDate = `[${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}]`;
    try {
        //customLog(`Sending webhook...`, '○', '0', '0', 'log');
        const compileStartTime = performance.now();
        const webhookUrl = _webhookUrl;
        let dataToSend = {
            content: `${webhookSendData}`,
            username: '',
            avatar_url: '',
        };

        if (mode === 'discord') {
            dataToSend.username = username;
            dataToSend.avatar_url = avatar_url;
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        const compileEndTime = performance.now();
        if (!response.ok) {
            console.error('status:', response.status);
            throw new Error('Failed to send data to webhook');
        };
        const compileTime = Math.round(compileEndTime - compileStartTime);
        //customLog(`Message sent successfully to webhook took ${compileTime}ms.`, '✓', '32', '0', 'log');
    } catch (error: any) {
        console.error('Error sending message to webhook:', error.message);
    };
};