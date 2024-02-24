'use client'

import { locales } from "../../public/db/data/locales";

// Text Copy
export const TextCopyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        return true
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false
    }
};

export const localizedText = (lang: string, key: string) => {
    return locales[`${key}/${lang}`] || key;
};