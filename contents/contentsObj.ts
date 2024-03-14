// /contents/contentsObj.ts

export interface Content {
    title: string;
    description: string;
    actions?: Action[];
}
export interface Action {
    label: string;
    url?: string;
    target?: string;
    variant?: string;
    onclick?: string;
}
export interface ContentsJSON {
    [key: string]: Content[];
}

export const contents_json: ContentsJSON = {
    "home": [
        {
            "title": "お知らせ",
            "description": "ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！\nこれからもビル経営ゲームをよろしくお願いします！"
        },
        {
            "title": "気軽にMOD開発！",
            "description": "ビル経営ゲームのMODを作りたいと思ったことはありませんか？\nそんなあなたへ誰でも簡単にMODを作れるプロジェクトを見てみましょう！",
            "actions": [
                {
                    "label": "ページを見る",
                    "url": "/"
                }
            ]
        }
    ],
    "mods": [
        {
            "title": "MOD",
            "description": "ビル経営ゲームのMODはゲームをより面白くできる拡張機能のようなものです！\n自分で作ることもできるので是非 [前提] と書いてあるプロジェクトを見てみてください！",
        },
    ],
    "qa": [
        {
            "title": "Q&A",
            "description": "気になることなどをここで聞いて解決しよう！"
        }
    ]
}


