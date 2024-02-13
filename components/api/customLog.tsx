// カスタムログ関数
export function customLog(message: string, badge = '✓', badgeColor = '32', textColor = '0', type = 'log') {
    // バッジとテキストのスタイルを指定
    const badgeStyle = `\x1b[${badgeColor}m%s\x1b[0m`;
    const textStyle = `\x1b[${textColor}m%s\x1b[0m`;

    // メッセージを構築
    const logMessage = `${message}`;
    const logBadge = ` ${badge}`;

    // 関数を適切なログタイプにディスパッチ
    switch (type) {
        case 'log':
            console.log(badgeStyle,logBadge,logMessage);
            break;
        case 'error':
            console.error(badgeStyle,logBadge,logMessage);
            break;
        case 'warn':
            console.warn(badgeStyle,logBadge,logMessage);
            break;
        // 他のログタイプをサポートする場合はここに追加
        default:
            console.log(badgeStyle,logBadge,logMessage);
            break;
    }
};

//customLog(`loading...`, '○', '0', '0', 'log');
//customLog(`success`, '✓', '32', '0', 'log');
//customLog(`warning`, '⚠', '33', '0', 'warn');