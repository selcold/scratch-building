'use client'

import React, { useState, useEffect } from 'react';

const GetLocationLanguage = () => {
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedLanguage_sub = localStorage.getItem('language');
            if(storedLanguage_sub){
                if( storedLanguage_sub === 'ja' || storedLanguage_sub === 'en' ){
                }else{
                    localStorage.setItem('language', 'en');
                }
            };
            const storedLanguage = localStorage.getItem('language');
            return storedLanguage || storedLanguage || 'en';
        }
        return 'en';
    });
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
        }
    }, [language]);

    console.log(language)

    if (typeof window !== 'undefined') {
        const path = window.location.pathname;

        // 最初の3文字を取得
        const first3Chars = path.slice(0, 3);

        // / を削除
        const modifiedPath = first3Chars.replace(/\//g, '');

        // 正規表現を使用して言語コードを抽出
        const match = modifiedPath.match(/^([a-z]{2})$/);

        const languageCode = match ? match[1] : "en";
        console.log(language,languageCode)
        if (language !== languageCode) {
            var winPath = window.location.pathname;
            winPath = winPath.slice(3);
            window.location.href = `/${language}/${winPath}`;
            // ここで処理が終了するように return を追加
            return languageCode;
        }

        // language と languageCode が一致する場合はそのまま返す
        return languageCode;
    } else {
        return "en";
    }
};

export default GetLocationLanguage;
