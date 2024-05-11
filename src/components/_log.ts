interface CustomWebObject {
  console: {
    log: (text: string) => void;
    warn: (text: string) => void;
    error: (text: string) => void;
  };
}

interface SextensionsObject {
  name: string;
}

let CustomWeb: CustomWebObject;
let extensions: SextensionsObject;

extensions = {
  name: "Scratch Building",
};

CustomWeb = {
  console: {
    log: function (text: string) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: #ff9f00",
        "border-radius: 0.75rem",
        "color: white",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.log(`%c${extensions.name}`, styleArray.join(";"), text);
    },
    warn: function (text: string) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: yellow",
        "border-radius: 0.75rem",
        "color: black",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.warn(`%c${extensions.name}`, styleArray.join(";"), text);
    },
    error: function (text: string) {
      var styleArray = [
        "padding: 0.2rem",
        "padding-left: .5rem",
        "padding-right: .4rem",
        "background-color: red",
        "border-radius: 0.75rem",
        "color: white",
        "border-top-right-radius: 0rem",
        "border-bottom-right-radius: 0rem",
        "font-family: Inter",
        "width: 2rem",
      ];
      console.error(`%c${extensions.name}`, styleArray.join(";"), text);
    },
  },
};

export { CustomWeb };

// カスタムログ関数
export function customLog(
  message: string,
  badge = "✓",
  badgeColor = "32",
  textColor = "0",
  type = "log"
) {
  // バッジとテキストのスタイルを指定
  const badgeStyle = `\x1b[${badgeColor}m%s\x1b[0m`;
  const textStyle = `\x1b[${textColor}m%s\x1b[0m`;

  // メッセージを構築
  const logMessage = `${message}`;
  const logBadge = ` ${badge}`;

  // 関数を適切なログタイプにディスパッチ
  switch (type) {
    case "log":
      console.log(badgeStyle, logBadge, logMessage);
      break;
    case "error":
      console.error(badgeStyle, logBadge, logMessage);
      break;
    case "warn":
      console.warn(badgeStyle, logBadge, logMessage);
      break;
    // 他のログタイプをサポートする場合はここに追加
    default:
      console.log(badgeStyle, logBadge, logMessage);
      break;
  }
}

//customLog(`loading...`, '○', '0', '0', 'log');
//customLog(`success`, '✓', '32', '0', 'log');
//customLog(`warning`, '⚠', '33', '0', 'warn');
