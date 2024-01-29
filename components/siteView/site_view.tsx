import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(JSON.parse(process.env.NEXT_PUBLIC_crypto_key || '[]'));
const ivBuffer = Buffer.from(JSON.parse(process.env.NEXT_PUBLIC_crypto_iv || '[]'));

const EXPIRATION_DAYS = 7; // 有効期限を設定

// 暗号化
export function encrypt(text: string): string {
    const cipher = createCipheriv(algorithm, Buffer.from(key), ivBuffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// 復号化
export function decrypt(encryptedText: string): string {
    const decipher = createDecipheriv(algorithm, Buffer.from(key), ivBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

// データの保存と有効期限設定
export function ViewLocked_setting_authReset() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + EXPIRATION_DAYS);

    const versionToEncrypt = process.env.NEXT_PUBLIC_SITE_VIEW_version;
    const originalText = `{"version":"${versionToEncrypt}","password":"false"}`;
    const encryptedText = encrypt(originalText);

    const data = {
        value: encryptedText,
        expires: expirationDate.getTime(), // 有効期限のエポックタイムを保存
    };

    localStorage.setItem('ViewLocked', JSON.stringify(data));
}

// データの取得と有効期限確認
export function ViewLocked_check(mode:string) {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('ViewLocked');

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // 有効期限の確認
            if (parsedData.expires && new Date().getTime() > parsedData.expires) {
                // 期限切れの場合、データを削除して新しいデータを設定
                ViewLocked_setting_authReset();
                return false;
            }

            const decryptedText = decrypt(parsedData.value);
            const storedViewLockedObj = JSON.parse(decryptedText);
            const storedViewLockedObjVersion = storedViewLockedObj.version;
            const storedViewLockedObjPassword = storedViewLockedObj.password;

            if (
                storedViewLockedObjVersion === process.env.NEXT_PUBLIC_SITE_VIEW_version &&
                storedViewLockedObjPassword === process.env.NEXT_PUBLIC_SITE_VIEW_KEY
            ) {
                if(mode==='reload'){
                    window.location.href=(`./`)
                }
                return true;
            } else {
                return false;
            }
        }else{
            ViewLocked_setting_authReset();
        }
    }

    return false;
}

// パスワードの更新
export function updatePassword(newPassword: string) {
    if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('ViewLocked');

        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // 有効期限の確認
            if (parsedData.expires && new Date().getTime() > parsedData.expires) {
                // 期限切れの場合、データを削除して新しいデータを設定
                ViewLocked_setting_authReset();
            }

            const decryptedText = decrypt(parsedData.value);
            const storedViewLockedObj = JSON.parse(decryptedText);

            // パスワードの更新
            storedViewLockedObj.password = newPassword;

            // 更新されたデータを暗号化して保存
            const updatedEncryptedText = encrypt(JSON.stringify(storedViewLockedObj));
            localStorage.setItem('ViewLocked', JSON.stringify({ value: updatedEncryptedText, expires: parsedData.expires }));
        }
    };
    ViewLocked_check('reload')
}

// 他の関数を追加...

