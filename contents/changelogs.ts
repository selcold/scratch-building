// /contents/changelog.ts

import { _cfgSiteLinks } from "@/components/configs/siteLinks";
import { _locales } from "@/components/frontend/site/_locales";

export type ChangelogsJSON = ChangelogsJSONItem[];
export interface ChangelogsJSONItem {
    version_name: string;
    date: string;
    contents: Content[];
}
export interface Content {
    title: string;
    title_en?: string;
    actions?: Action[];
}
export interface Action {
    label: string;
    url?: string;
    target?: "_self" | "_blank" | "_top" | "_parent";
    variant?: string;
    onclick?: string;
}
export const changelogs_obj: ChangelogsJSON = [
    {
        version_name: "7.1.1a",
        date: "2024-02-16",
        contents: [
            {
                title: "ショップの自動更新機能を追加 (JST以外では上手く動作しません)デコレーション編集ページでページ移動ができない不具合の修正一部のテキストカラーの変更",
                title_en: "Added automatic update function for the shop (may not work well outside JST) Fixed issue where page navigation was not possible on the decoration editing page Changed some text colors",
            },
        ],
    },
    {
        version_name: "7.1.1",
        date: "2024-02-12",
        contents: [
            {
                title: "ショップの自動更新を追加",
                title_en: "Added automatic update for the shop",
            },
            {
                title: "部屋を追加",
                title_en: "Added rooms",
            },
            {
                title: "カラーの追加",
                title_en: "Added colors",
            },
            {
                title: "ビルハブにカラー表示を追加",
                title_en: "Added color display to the building hub",
            },
            {
                title: "オートセーブに関する不具合の修正",
                title_en: "Fixed issue with autosave",
            },
            {
                title: "プロフィールに関する不具合の修正",
                title_en: "Fixed issue with profiles",
            },
            {
                title: "その他の細かな不具合の修正",
                title_en: "Various minor bug fixes",
            },
        ],
    },
    {
        version_name: "7.1",
        date: "2024-02-09",
        contents: [
            {
                title: "カーソルを追加",
                title_en: "Added cursor",
            },
            {
                title: "オートセーブの追加",
                title_en: "Added autosave",
            },
            {
                title: "カラーの追加",
                title_en: "Added colors",
            },
            {
                title: "ショップの追加",
                title_en: "Added shop",
            },
            {
                title: "スタート画面の配置の更新",
                title_en: "Updated placement of start screen",
            },
            {
                title: "ロード画面の変更",
                title_en: "Changed loading screen",
            },
            {
                title: "ビルのレンダリング方法の更新",
                title_en: "Updated building rendering method",
            },
            {
                title: "その他の細かな不具合の修正",
                title_en: "Various minor bug fixes",
            },
        ],
    },
    {
        version_name: "7.05",
        date: "2023-12-31",
        contents: [
            {
                title: "カウントダウンを追加",
                title_en: "Added countdown",
            },
            {
                title: "プレゼントページを追加",
                title_en: "Added gift page",
            },
            {
                title: "エフェクトを追加",
                title_en: "Added effects",
            },
        ],
    },
    {
        version_name: "7.04",
        date: "2023-12-25",
        contents: [
            {
                title: "プロフィールデコレーションを追加",
                title_en: "Added profile decorations",
            },
            {
                title: "プレゼントページを追加",
                title_en: "Added gift page",
            },
            {
                title: "投資関連のバグの修正",
                title_en: "Fixed bugs related to investments",
            },
            {
                title: "チャットを閉じると通信が止まるバグの修正",
                title_en: "Fixed bug where communication stops when closing chat",
            },
        ],
    },
    {
        version_name: "7.03",
        date: "2023-12-24",
        contents: [
            {
                title: "投資機能の追加",
                title_en: "Added investment feature",
            },
            {
                title: "ヘルプを追加",
                title_en: "Added help",
            },
            {
                title: "建築のアップグレード割引を追加",
                title_en: "Added upgrade discounts for buildings",
            },
            {
                title: "猫のコスチュームを変更 (サンタの帽子)",
                title_en: "Changed cat costume (Santa hat)",
            },
            {
                title: "背景を変",
                title_en: "Changed background",
            },
            {
                title: "編集タブを追加(Beta)",
                title_en: "Added editing tab (Beta)",
            },
            {
                title: "メールタブを追加(Beta)",
                title_en: "Added mail tab (Beta)",
            },
            {
                title: "設定項目を追加",
                title_en: "Added settings items",
            },
        ],
    },
    {
        version_name: "7.02",
        date: "2023-12-04",
        contents: [
            {
                title: "他のユーザーのビルを見る機能を追加",
                title_en: "Added feature to view other users' buildings",
            },
            {
                title: "ビル経営ゲームへの参加日表示を更新",
                title_en: "Updated display of join date for building management game",
            },
            {
                title: "チャットの追加",
                title_en: "Added chat",
            },
            {
                title: "猫の種類(speed) を追加",
                title_en: "Added type of cat (speed)",
            },
            {
                title: "クリエイティブ-コマンドを追加",
                title_en: "Added creative commands",
            },
        ],
    },
    {
        version_name: "7.01",
        date: "2023-12-03",
        contents: [
            {
                title: "ビルハブの追加クリエイティブの仮実装（タブレット）",
                title_en: "Added creative provisional implementation of building hub (tablet)",
            },
        ],
    },
];    
