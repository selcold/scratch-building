// /contents/contentsObj.ts

import { _cfgSiteLinks } from "@/components/configs/siteLinks";
import { _locales } from "@/components/frontend/site/_locales";

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
            "title": _locales('Announcement'),
            "description": _locales(`The number of people who have performed cloud saves in the scratch building has exceeded 3600!\nThank you for your continued support of the scratch building!`),
        },
        {
            "title": _locales('Feel free to develop mods!'),
            "description": _locales(`Have you ever wanted to create mods for the building management game?\nLet's take a look at a project where anyone can easily create mods!`),
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
            "title": "Game",
            "description": _locales(`The number of people who have performed cloud saves in the scratch building has exceeded 3600!\nThank you for your continued support of the scratch building!`),
        },
    ],
    "mods": [
        {
            "title": "MOD",
            "description": _locales(`The MODs for the building management game are like extensions that can make the game more interesting! You can also create them yourself, so be sure to check out the projects labeled [Prerequisite]!`),
        },
    ],
    "qa": [
        {
            "title": "Q&A",
            "description": _locales(`Let's hear your questions and solve them here!`)
        },
    ],
    "docs": [
        {
            "title": _locales('Terms of Use'),
            "description": _locales(`Thank you for using this website (hereinafter referred to as the 'Site'). Please read the following terms of use carefully and use this Site only after understanding them. These terms of use constitute an agreement between the users of this Site (hereinafter referred to as 'Users') and the Site administrator.`),
            "actions": [
                {
                    "label": _locales('More...'),
                    "url": _cfgSiteLinks.docs_terms_of_use,
                },
            ],
        },
        {
            "title": _locales('Guidelines'),
            "description": _locales(`Welcome to the Scratch Building community! Here, we provide a space for sharing fun experiences and interacting with other members. Please read the following guidelines and help us maintain a healthy community environment.`),
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
            "title": _locales('Terms of Use'),
            "description": _locales(`Thank you for using this website (hereinafter referred to as the 'Site'). Please read the following terms of use carefully and use this Site only after understanding them. These terms of use constitute an agreement between the users of this Site (hereinafter referred to as 'Users') and the Site administrator.`),
        },
    ],
    "guidelines": [
        {
            "title": _locales('Guidelines'),
            "description": _locales(`Welcome to the Scratch Building community! Here, we provide a space for sharing fun experiences and interacting with other members. Please read the following guidelines and help us maintain a healthy community environment.`),
        },
    ],
}


