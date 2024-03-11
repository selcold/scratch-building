// src/components/frontend/site/_locales.ts

import { _locales_en, _locales_ja } from "@/components/_locales/message";
import { CustomWeb } from "@/components/_log";

export function GetUserLanguage() {
    if (typeof window !== 'undefined') {
        const userLanguage = navigator.language.split('-')[0];
        return userLanguage;
    }
    return 'error';
}

export function _locales(text: string) {
    if(typeof window !== 'undefined') {
        const res = GetUserLanguage() === 'ja'? _locales_ja[text] : _locales_en[text];
        if(res){
            return res || text;
        }
        CustomWeb.console.warn(`_locales: ${text} not found`);
    }
    return "";
}