export const sendGetRequestToGAS = async () => {
    try {
        // Bearerトークンを取得するロジック（例：トークンの取得など）
        const bearerToken = process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY;
    
        // GASのAPIエンドポイントを設定
        const apiUrl = `${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER}?apikey=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_API_KEY}&sheet=${process.env.NEXT_PUBLIC_COMMENT_DB_SERVER_SHEET_ID}&mode=getComments`;
    
        // Fetch APIを使用してGETリクエストを送信
        const response = await fetch(apiUrl, {
            method: 'GET',
        });
    
        // レスポンスをJSON形式で取得
        const result = await response.json();
    
        // 取得したデータを利用するなどの処理を行う
        console.log(result);
    } catch (error) {
        console.error('GASへのGETリクエスト送信中にエラーが発生しました:', error);
    }
};