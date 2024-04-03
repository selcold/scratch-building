// /src/app/components/backend/cookie.tsx

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const secretKey = process.env.COOKIE_SECRET_KEY || '';

// セッションIDを生成する関数
function generateSessionId(): string {
    return uuidv4(); // ランダムなセッションIDを生成
}

// ユーザー名をセッションに保存する関数
export function setEncryptedUsername(name: string, value: string, days: number) {
    const hmac = calculateHmac(value); // ユーザー名に対してHMACを計算
    const encryptedValue = encrypt(value + '|' + hmac); // ユーザー名とHMACを結合し、暗号化
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encryptedValue};${days > 0 ? `expires=${expires.toUTCString()}` : ``};path=/`;
}

// セッションからユーザー名を削除する関数
export function eraseEncryptedUsername(name: string) {
    eraseCookie(name); // Cookieからユーザー名を削除
}


// セッションIDを生成し、HMACを付加してから暗号化してCookieに保存する関数
export function setEncryptedSessionId(name: string, value: string, days: number) {
    const sessionId = generateSessionId(); // セッションIDを生成
    const hmac = calculateHmac(sessionId); // HMACを計算
    const sessionData = sessionId + '|' + hmac; // セッションIDとHMACを結合
    const encryptedValue = encrypt(sessionData); // セッションIDとHMACを暗号化
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encryptedValue};${days > 0 ? `expires=${expires.toUTCString()}` : ``};path=/`;
}

// CookieからセッションIDを取得し、検証してから復号化する関数
export function getDecryptedSessionId(name: string): string | null {
    const encryptedValue = getCookie(name); // Cookieから値を取得
    if (encryptedValue) {
        const [sessionId, hmac] = decrypt(encryptedValue).split('|'); // セッションIDとHMACに分割
        if (calculateHmac(sessionId) === hmac) { // HMACを再計算して検証
            return sessionId; // 検証が成功した場合はセッションIDを返す
        } else {
            eraseCookie(name); // 検証が失敗した場合はセッションを削除
        }
    }
    return null;
}

// HMACを計算する関数
export function calculateHmac(text: string): string {
    return crypto.createHmac('sha256', secretKey).update(text).digest('hex');
}

// 文字列を暗号化する関数
export function encrypt(text: string): string {
    // ここに暗号化の処理を追加（例：Base64エンコーディング）
    return Buffer.from(text).toString('base64');
}

// 文字列を復号化する関数
export function decrypt(text: string): string {
    // ここに復号化の処理を追加（例：Base64デコーディング）
    return Buffer.from(text, 'base64').toString();
}

// Cookieから値を取得する関数
function getCookie(name: string) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Cookieから値を削除する関数
export function eraseCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}