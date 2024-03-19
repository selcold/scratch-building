// /contents/contentObj_mods.ts

export interface list {
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    group_type: "SBMOD" | "SBAPI" | "SBAddons" | "SBaddonAPI";
}
export interface contentObj_mods {
    version: number;
    mod_type: "Default" | "Official" | "Prerequisite";
    project_type: "SBMOD" | "SBAPI" | "SBAddons" | "SBaddonAPI";
    project_id: number;
    project_id_en?: number;
    creator: string;
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
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
            "description_en": "Instructions are available <a href='../wiki/content/sbmod/' style='color: #6094F8;' target='_blank'>here</a>.",
            "group_type": "SBMOD",
        },
        {
            "title": "SBAPI [v7]",
            "description": "使い方は<a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>こちら</a>",
            "description_en": "Instructions are available <a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>here</a>.",
            "group_type": "SBAPI",
        },
        {
            "title": "SB Addons [v6]",
            "description": "GUIがあり、機能のon/offを切り替えられるため、簡単に利用できる。オーバーレイなどもあるため、色々な情報を画面に表示することもできる。",
            "description_en": "The GUI allows for easy use, with the ability to toggle functions on and off. Additionally, overlays are available, allowing for the display of various information on the screen.",
            "group_type": "SBAddons",
        },
        {
            "title": "SB Addon API [v6]",
            "description": "使い方は<a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>こちら</a>",
            "description_en": "Instructions are available <a href='https://note.com/metaroro/n/n8a8ed937bb04' style='color: #6094F8;' target='_blank'>here</a>.",
            "group_type": "SBaddonAPI",
        },
    ],
    "mods": [
        {
            "version": 7,
            "mod_type": "Official",
            "project_type": "SBMOD",
            "project_id": 940232456,
            "creator": "Masaabu-YT",
            "title": "SB MOD v1.0",
            "description": "",
            "tags": [
                {
                    "label": "Official",
                    "color": "yellow",
                },
            ],
        },
        {
            "version": 7,
            "mod_type": "Prerequisite",
            "project_type": "SBAPI",
            "project_id": 933515639,
            "creator": "dmmo-com-jp",
            "title": "SBAPI",
            "description": "ビル経営ゲームの拡張性を上げるツール",
            "description_en": "Tool to enhance the extensibility of the Scratch Building.",
            "tags": [
                {
                    "label": "Prerequisite",
                    "color": "blue",
                },
            ],
        },
        {
            "version": 7,
            "mod_type": "Default",
            "project_type": "SBAPI",
            "project_id": 939787547,
            "creator": "dmmo-com-jp",
            "title": "cmdplus",
            "description": "SBAPIのpostに依存した、コマンド強化modです。",
            "description_en": "This is a command-enhancing mod that relies on SBAPI's post.",
        },
        {
            "version": 7,
            "mod_type": "Default",
            "project_type": "SBAPI",
            "project_id": 933713134,
            "creator": "banana_877_",
            "title": "隕石経営ゲーム",
            "title_en": "Meteor Management Game",
            "description": "隕石！！",
            "description_en": "Meteorite!!",
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBAddons",
            "project_id": 790969288,
            "creator": "Masaabu-YT",
            "title": "SB Addons",
            "description": "ビル経営ゲームの拡張性を上げるツール",
            "description_en": "A tool to increase the extensibility of Scratch Building",
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBAddons",
            "project_id": 791408146,
            "creator": "dmmo-com-jp",
            "title": "SB Addons+",
            "description": "",
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBAddons",
            "project_id": 792121597,
            "creator": "dmmo-com-jp",
            "title": "隕石アドオン",
            "title_en": "Meteor Add-on",
            "description": "隕石！！",
            "description_en": "Meteorite!!",
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBAddons",
            "project_id": 817892400,
            "creator": "banana_877_",
            "title": "Re:BN addon",
            "description": "",
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBAddons",
            "project_id": 795165690,
            "creator": "yoshikunTA",
            "title": "SB Addons Remix",
            "description": "",
        },
        {
            "version": 6,
            "mod_type": "Prerequisite",
            "project_type": "SBaddonAPI",
            "project_id": 926411096,
            "creator": "dmmo-com-jp",
            "title": "SBAPI",
            "description": "お金の管理や幸福度の管理を簡単に行えます。",
            "description_en": "You can easily manage money and happiness levels.",
            "tags": [
                {
                    "label": "Prerequisite",
                    "color": "blue",
                },
            ],
        },
        {
            "version": 6,
            "mod_type": "Default",
            "project_type": "SBaddonAPI",
            "project_id": 933340996,
            "creator": "dmmo-com-jp",
            "title": "天候復活アドオン",
            "title_en": "Weather Revival Add-on",
            "description": "天候を6.0に復活させます",
            "description_en": "Restore the weather to 6.0",
        },
    ],
}
