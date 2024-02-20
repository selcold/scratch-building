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