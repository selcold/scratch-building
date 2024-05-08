// /contents/contentObj_games.ts

interface release {
    version: number;
    version_name: string;
    creator: string;
    date: string;
    project_id: number;
    project_id_en?: number;
    actions?: actions[];
}
interface alpha {
    version: number;
    version_name: string;
    creator: string;
    date: string;
    play_url: string;
    play_url_en?: string;
    actions?: actions[];
}
interface actions {
    label: string;
    url?: string;
    target?: "_self" | "_blank" | "_top" | "_parent";
    variant?: string;
    onclick?: string;
}
interface contentObj {
    release: release[];
    alpha: alpha[];
}

export const contentObj_gamesAll: contentObj = {
    "release": [
        {
            "version": 7,
            "version_name": "7.1.1b",
            "creator": "Masaabu-YT",
            "date": "2023-12-01",
            "project_id": 927111186,
            "actions": [
                {
                    "label": "Youtube",
                    "url": "https://www.youtube.com/watch?v=j-LTJJghfJ4",
                    "target": "_blank",
                },
            ],
        },
        {
            "version": 6,
            "version_name": "6.2",
            "creator": "Masaabu-YT",
            "date": "2023-07-14",
            "project_id": 790875411,
            "actions": [
                {
                    "label": "Youtube",
                    "url": "https://www.youtube.com/watch?v=321NTDMbELo",
                    "target": "_blank",
                },
            ],
        },
        {
            "version": 5,
            "version_name": "5.6.2",
            "creator": "Masaabu-YT",
            "date": "2022-12-12",
            "project_id": 708711034,
            "actions": [
                {
                    "label": "Youtube",
                    "url": "https://www.youtube.com/watch?v=hago9HBvvJU",
                    "target": "_blank",
                },
            ],
        },
        {
            "version": 4,
            "version_name": "4.4.12",
            "creator": "Masaabu-YT",
            "date": "2022-05-28",
            "project_id": 687086358,
        },
        {
            "version": 3,
            "version_name": "3.2thx",
            "creator": "Masaabu-YT",
            "date": "2022-03-05",
            "project_id": 646046731,
        },
        {
            "version": 2,
            "version_name": "2.5",
            "creator": "Masaabu-YT",
            "date": "2022-01-01",
            "project_id": 621801822,
        },
    ],
    "alpha": [
        {
            "version": 7,
            "version_name": "7.0.6",
            "creator": "Masaabu-YT",
            "date": "2023-11-17",
            "play_url": "https://selcold.github.io/scratch-building-assets/projects/alpha/a7-0-6.html",
        },
        {
            "version": 7,
            "version_name": "7.0.5",
            "creator": "Masaabu-YT",
            "date": "2023-11-16",
            "play_url": "https://selcold.github.io/scratch-building-assets/projects/alpha/a7-0-5.html",
        },
        {
            "version": 7,
            "version_name": "7.0.4",
            "creator": "Masaabu-YT",
            "date": "2023-11-15",
            "play_url": "https://selcold.github.io/scratch-building-assets/projects/alpha/a7-0-4.html",
        },
        {
            "version": 7,
            "version_name": "7.0.1",
            "creator": "Masaabu-YT",
            "date": "2023-10-22",
            "play_url": "https://selcold.github.io/scratch-building-assets/projects/alpha/a7-0-1.html",
        },
        {
            "version": 7,
            "version_name": "7.0.0",
            "creator": "Masaabu-YT",
            "date": "2023-10-20",
            "play_url": "https://selcold.github.io/scratch-building-assets/projects/alpha/a7-0-0.html",
        },
    ],
};