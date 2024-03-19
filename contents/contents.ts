// /contents/contentsObj.ts

import { _cfgSiteLinks } from "@/components/configs/siteLinks";
import { _locales } from "@/components/frontend/site/_locales";

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
            "title_en": "Announcement",
            "description": "ビル経営ゲームでクラウドセーブを行った人の数が3600人を超えました！\nこれからもビル経営ゲームをよろしくお願いします！",
            "description_en": "The number of people who have performed cloud saves in the scratch building has exceeded 3600!\nThank you for your continued support of the scratch building!",
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
    "qa": [
        {
            "title": "Q&A",
            "description": "気になることなどをここで聞いて解決しよう！",
            "description_en": "Let's hear your questions and solve them here!",
        },
    ],
    "docs": [
        {
            "title": "変更履歴",
            "title_en": "Changelogs",
            "description": "",
            "actions": [
                {
                    "label": _locales('More...'),
                    "url": _cfgSiteLinks.docs_changelogs,
                },
            ],
        },
        {
            "title": "利用規約",
            "title_en": "Terms of Use",
            "description":"このウェブサイト（以下、「サイト」といいます）をご利用いただき、ありがとうございます。以下の利用規約をよくお読みいただき、ご理解いただいた上で、本サイトをご利用ください。本利用規約は、本サイトの利用者（以下、「利用者」といいます）とサイト管理者との間の契約を構成します。",
            "description_en": "Thank you for using this website (hereinafter referred to as the 'Site'). Please read the following terms of use carefully and use this Site only after understanding them. These terms of use constitute an agreement between the users of this Site (hereinafter referred to as 'Users') and the Site administrator.",
            "actions": [
                {
                    "label": _locales('More...'),
                    "url": _cfgSiteLinks.docs_terms_of_use,
                },
            ],
        },
        {
            "title": "ガイドライン",
            "title_en": "Guidelines",
            "description": "ようこそ、ビル経営ゲーム コミュニティーへ！ここでは、楽しい体験を共有し、他のメンバーと交流する場を提供しています。以下のガイドラインをお読みいただき、コミュニティーの健全な環境を保つためのお手伝いをしてください。",
            "description_en": "Welcome to the Scratch Building community! Here, we provide a space for sharing fun experiences and interacting with other members. Please read the following guidelines and help us maintain a healthy community environment.",
            "actions": [
                {
                    "label": _locales('More...'),
                    "url": _cfgSiteLinks.docs_guidelines,
                },
            ],
        },
    ],
    "terms": [
        {
            "title": "利用規約",
            "title_en": "Terms of Use",
            "description":"このウェブサイト（以下、「サイト」といいます）をご利用いただき、ありがとうございます。以下の利用規約をよくお読みいただき、ご理解いただいた上で、本サイトをご利用ください。本利用規約は、本サイトの利用者（以下、「利用者」といいます）とサイト管理者との間の契約を構成します。",
            "description_en": "Thank you for using this website (hereinafter referred to as the 'Site'). Please read the following terms of use carefully and use this Site only after understanding them. These terms of use constitute an agreement between the users of this Site (hereinafter referred to as 'Users') and the Site administrator.",
        },
    ],
    "guidelines": [
        {
            "title": "ガイドライン",
            "title_en": "Guidelines",
            "description": "ようこそ、ビル経営ゲーム コミュニティーへ！ここでは、楽しい体験を共有し、他のメンバーと交流する場を提供しています。以下のガイドラインをお読みいただき、コミュニティーの健全な環境を保つためのお手伝いをしてください。",
            "description_en": "Welcome to the Scratch Building community! Here, we provide a space for sharing fun experiences and interacting with other members. Please read the following guidelines and help us maintain a healthy community environment.",
        },
    ],
}


