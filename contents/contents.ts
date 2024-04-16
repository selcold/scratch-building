// /contents/contentsObj.ts

import { _cfgLinks, _cfgSiteLinks } from "@/components/configs/siteLinks";
import { _locales } from "@/components/client/site/_locales";

export interface Content {
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    actions?: Action[];
}
export interface Action {
    label: string;
    url?: string;
    target?: "_self" | "_blank" | "_top" | "_parent";
    variant?: string;
    onclick?: string;
}
export interface ContentsJSON {
    [key: string]: Content[];
}

export const contents_json: ContentsJSON = {
    "page_not_found": [
        {
            "title": "ニュース",
            "title_en": "News",
            "description": "日本時間（JST）2024年3月22日をもってアカウントシステムを廃止しました。これに伴い、すべてのアカウント情報が削除されました。今後は従来のアカウントシステムに代わり、Scratchアカウントでのログインが必要となります。ログインユーザー限定の機能を利用するには、Scratchアカウントでログインしてください。",
            "description_en": "As of March 22, 2024, Japan Standard Time (JST), we have discontinued our account system. Consequently, all account information has been deleted. Going forward, instead of the previous account system, you will need to log in with a Scratch account. To access features limited to logged-in users, please log in with your Scratch account.",
        },
    ],
    "home": [
        {
            "title": "お知らせ",
            "title_en": "Announcement",
            "description": "ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！\nこれからもビル経営ゲームをよろしくお願いします！",
            "description_en": "The number of people who have performed cloud saves in the scratch building has exceeded 3600!\nThank you for your continued support of the scratch building!",
            "actions": [
                {
                    "label": _locales('Play'),
                    "url": _cfgLinks.scratch_building_play,
                    "target": "_blank",
                },
            ],
        },
        {
            "title": "機能紹介",
            "title_en": "Feature Introduction",
            "description": "Masaabu公式Discordサーバーに参加すると、サイトに投稿されたコメントの通知が受け取れるほか、お知らせチャンネルでは最新アップデートの詳細情報を確認できます。",
            "description_en": "By joining the official Masaabu Discord server, you can receive notifications for comments posted on the site, and in the announcements channel, you can check detailed information about the latest updates.",
            "actions": [
                {
                    "label": _locales('Join the Server'),
                    "url": `https://discord.gg/j2FG5j2z7v`,
                    "target": "_blank",
                },
            ],
        },
        {
            "title": "気軽にMOD開発！",
            "title_en": "Feel free to develop mods!",
            "description": "ビル経営ゲームのMODを作りたいと思ったことはありませんか？\nそんなあなたへ誰でも簡単にMODを作れるプロジェクトを見てみましょう！",
            "description_en": "Have you ever wanted to create mods for the building management game?\nLet's take a look at a project where anyone can easily create mods!",
            "actions": [
                {
                    "label": _locales('More...'),
                    "url": _cfgSiteLinks.mods,
                },
            ],
        },
    ],
    "games": [
        {
            "title": "ゲーム",
            "title_en": "Game",
            "description": "ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！\nこれからもビル経営ゲームをよろしくお願いします！",
            "description_en": "The number of people who have performed cloud saves in the scratch building has exceeded 3600!\nThank you for your continued support of the scratch building!",
        },
    ],
    "mods": [
        {
            "title": "MOD",
            "description": "ビル経営ゲームのMODはゲームをより面白くできる拡張機能のようなものです！自分で作ることもできるので是非 [前提] と書いてあるプロジェクトを見てみてください！",
            "description_en": "The MODs for the building management game are like extensions that can make the game more interesting! You can also create them yourself, so be sure to check out the projects labeled [Prerequisite]!",
        },
    ],
    "issues": [
        {
            "title": "Issues",
            "description": "GitHub リポジトリの問題セクションで問題を報告すると、より迅速な解決につながりますが、GitHub アカウントを使用できない場合は、Google フォームを使用して問題を報告してください。",
            "description_en": "While reporting issues on GitHub repository's Issues section leads to faster resolution, if you are unable to use a GitHub account, please report the issues using Google Form.",
            "actions": [
                {
                    "label": "GitHub issues",
                    "url": "https://github.com/selcold/scratch-building/issues",
                    "target": "_blank",
                },
                {
                    "label": "Google Form",
                    "url": "https://forms.gle/wTCUGM3JofLqbgzo8",
                    "target": "_blank",
                    "variant": "outline",
                },
            ],
        },
    ],
    "qa": [
        {
            "title": "Q&A",
            "description": "気になることなどをここで聞いて解決しよう！\nGitHub アカウントでログインして、ここで質問することで、より迅速な解決につながりますが、GitHub アカウントを使用できない場合は、Google フォームを使用して質問してください。",
            "description_en": "Let's ask and resolve any concerns here!\nWhile logging in with your GitHub account and asking questions here can lead to quicker resolution, if you are unable to use a GitHub account, please ask questions using the Google Form.",
            "actions": [
                {
                    "label": "Google form",
                    "url": "https://forms.gle/wTCUGM3JofLqbgzo8",
                    "target": "_blank",
                }
            ],
        },
    ],
}


