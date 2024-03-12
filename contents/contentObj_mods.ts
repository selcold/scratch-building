// /contents/contentObj_mods.ts

export interface ContentGroup {
    group_title: string;
    group_description: string;
    mods: Mod[];
}
export interface Mod {
    title: string;
    description: string;
    projects_id: string;
    creator: string;
    tags?: Tag[];
}
export interface Tag {
    label: string;
    color: string;
}

export const contentObj_mods_json: ContentGroup[] = [
    {
        "group_title": "SB MOD [v7]",
        "group_description": "使い方は<a href='../wiki/content/sbmod/' target='_blank'>こちら</a>",
        "mods": [
            {
                "title": "SB MOD v1.0",
                "description": "現在の最新版",
                "projects_id": "940232456",
                "creator": "Masaabu-YT",
                "tags": [
                    {
                        "label": "公式",
                        "color": "yellow",
                    },
                ],
            },
            {
                "title": "SB MOD v3.0",
                "description": "拡張機能モジュール",
                "projects_id": "940232451",
                "creator": "Masaabu-YT",
            },
        ],
    },
    {
        "group_title": "SB API [v7]",
        "group_description": "使い方は<a href='https://scratch-building.vercel.app/mods' target='_blank'>こちら</a>",
        "mods": [
            {
                "title": "SB API",
                "description": "現在の最新版",
                "projects_id": "933515639",
                "creator": "dmmo-com-jp",
                "tags": [
                    {
                        "label": "前提",
                        "color": "blue",
                    },
                ],
            },
        ],
    },
];
