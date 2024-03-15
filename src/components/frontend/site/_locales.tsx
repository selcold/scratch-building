// src/components/frontend/site/_locales.ts

import { _locales_en, _locales_ja } from "@/components/_locales/message";
import { CustomWeb } from "@/components/_log";
import { _cfg_logs } from "@/components/configs/config";

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
            return res;
        };
        if(_cfg_logs._locales_warn_log){
            CustomWeb.console.warn(`_locales: ${text} not found`);
        }
        return text;
    }
    return "";
}

export function _localesText( en_content: string, ja_content?: string ) {
    if(typeof window !== 'undefined') {
        if(ja_content){
            const res = GetUserLanguage() === 'ja'? ja_content : en_content;
            if(res){
                return res;
            };
        }
        return en_content;
    }
    return "";
}