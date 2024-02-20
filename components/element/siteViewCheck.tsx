'use client'

import { useState } from "react";
import { ViewLocked_check, updatePassword } from "../siteView/site_view";

export function SiteViewSetVal() {
    // 表示認証制度機能
    var isSiteViewLoad;
    if(process.env.NEXT_PUBLIC_SITE_VIEW_Locked === 'true'){
        isSiteViewLoad = ViewLocked_check('')
    }else{
        isSiteViewLoad = true
    };

    return isSiteViewLoad;
};

export function SiteViewCheck() {
    const [ViewLocked_password, setViewLocked_password] = useState('');

    return (
        <div className='fixed flex flex-col justify-center items-center w-full h-full'>
            <div className='flex flex-col justify-center items-center p-4 mb-10 gap-2'>
                <h1 className='font-bold text-4xl'>ビル経営ゲーム</h1>
                <p className='p-5'>サイトは現在限定公開です。表示するにはパスワード認証を行う必要があります。</p>
            </div>
            <div className='gap-4 flex flex-col justify-center items-center'>
                <input type='text' placeholder='パスワード' className='flex min-h-[20px] min-w-[200px] lg:w-[400px] rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setViewLocked_password(e.target.value)}/>
                <button className='button_blue_1' onClick={() => updatePassword(ViewLocked_password)}>表示</button>
            </div>
        </div>
    )
};