// /contents/contentObj_mods.ts

export interface list {
    title: string;
    description: string;
    group_type: "SBMOD" | "SBAPI" | "SBAddons" | "SBaddonAPI";
}
export interface contentObj_mods {
    version: "7" | "6";
    project_type: "SBMOD" | "SBAPI" | "SBAddons" | "SBaddonAPI";
    projects_id: number;
    creator: string;
    title: string;
    description: string;
    tags?: Tag[]; 
}
export interface Tag {
    label: string;
    color: "" | "dark" | "blue" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink";
    display?: "block" | "none";
}
export interface contentObj {
    list: list[];
    mods: contentObj_mods[];
}
export const contentObj_modsAll: contentObj = {
    "list": [
        {
            "title": "SB MOD [v7]",
            "description": "使い方は<a href='../wiki/content/sbmod/' style='color: #6094F8;' target='_blank'>こちら</a>",
            "group_type": "SBMOD",
        },
        {
            "title": "SBAPI [v7]",
            "description": "使い方は<a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>こちら</a>",
            "group_type": "SBAPI",
        },
        {
            "title": "SB Addons [v6]",
            "description": "GUIがあり、機能のon/offを切り替えられるため、簡単に利用できる。オーバーレイなどもあるため、色々な情報を画面に表示することもできる。",
            "group_type": "SBAddons",
        },
        {
            "title": "SB Addon API [v6]",
            "description": "使い方は<a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>こちら</a>",
            "group_type": "SBaddonAPI",
        },
    ],
    "mods": [
        {
            "version": "7",
            "project_type": "SBMOD",
            "projects_id": 940232456,
            "creator": "Masaabu-YT",
            "title": "SB MOD v1.0",
            "description": "",
            "tags": [
                {
                    "label": "公式",
                    "color": "yellow",
                },
            ],
        },
        {
            "version": "7",
            "project_type": "SBAPI",
            "projects_id": 933515639,
            "creator": "dmmo-com-jp",
            "title": "SBAPI",
            "description": "ビル経営ゲームの拡張性を上げるツール",
            "tags": [
                {
                    "label": "前提",
                    "color": "blue",
                },
            ],
        },
        {
            "version": "7",
            "project_type": "SBAPI",
            "projects_id": 939787547,
            "creator": "dmmo-com-jp",
            "title": "cmdplus",
            "description": "SBAPIのpostに依存した、コマンド強化modです。",
        },
        {
            "version": "7",
            "project_type": "SBAPI",
            "projects_id": 933713134,
            "creator": "banana_877_",
            "title": "隕石経営ゲーム",
            "description": "隕石！！",
        },
        {
            "version": "6",
            "project_type": "SBAddons",
            "projects_id": 790969288,
            "creator": "Masaabu-YT",
            "title": "SB Addons",
            "description": "ビル経営ゲームの拡張性を上げるツール",
        },
        {
            "version": "6",
            "project_type": "SBAddons",
            "projects_id": 791408146,
            "creator": "dmmo-com-jp",
            "title": "SB Addons+",
            "description": "",
        },
        {
            "version": "6",
            "project_type": "SBAddons",
            "projects_id": 792121597,
            "creator": "dmmo-com-jp",
            "title": "隕石アドオン",
            "description": "隕石！！",
        },
        {
            "version": "6",
            "project_type": "SBAddons",
            "projects_id": 817892400,
            "creator": "banana_877_",
            "title": "Re:BN addon",
            "description": "",
        },
        {
            "version": "6",
            "project_type": "SBAddons",
            "projects_id": 795165690,
            "creator": "yoshikunTA",
            "title": "SB Addons Remix",
            "description": "",
        },
        {
            "version": "6",
            "project_type": "SBaddonAPI",
            "projects_id": 926411096,
            "creator": "dmmo-com-jp",
            "title": "SBAPI",
            "description": "お金の管理や幸福度の管理を簡単に行えます。",
            "tags": [
                {
                    "label": "前提",
                    "color": "blue",
                },
            ],
        },
        {
            "version": "6",
            "project_type": "SBaddonAPI",
            "projects_id": 933340996,
            "creator": "dmmo-com-jp",
            "title": "天候復活アドオン",
            "description": "天候を6.0に復活させます",
        },
    ],
}
