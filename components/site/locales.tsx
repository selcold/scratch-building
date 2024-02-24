'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// コンテキストの作成
const LanguageContext = createContext<string>('en'); // デフォルトの言語は英語

// デバイスの言語を取得する関数
const getDeviceLanguage = () => {
    // ブラウザの場合のみ navigator.language を使用する
    if (typeof window !== 'undefined' && navigator && navigator.language) {
        // デバイスの言語が日本語の場合はそのまま返す
        if (navigator.language === 'ja') {
            return 'ja';
        }else{
            return 'en'
        }
    }
    // デバイスの言語が日本語以外の場合は英語に変更
    return 'en';
};


// LanguageProvider コンポーネントの定義
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>(getDeviceLanguage());

    useEffect(() => {
        const defaultLanguage = getDeviceLanguage();
        setLanguage(defaultLanguage);
    }, []); 

    return (
        <LanguageContext.Provider value={language}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => {
    return getDeviceLanguage()
};
