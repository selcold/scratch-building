export const _cfgSite = {
    origin: "https://scratch-building.vercel.app",
    title: "Scratch Building",
    title_ja: "ビル経営ゲーム",
    description: "Scratch Building is a game developed on the Scratch platform, and this site functions as its official website. It offers various features such as account authentication, comments, notifications, and community participation.",
    description_ja: "ビル経営ゲームはScratchプラットフォーム上で開発されたゲームであり、このサイトは公式ウェブサイトとして機能します。アカウント認証、コメント、通知、コミュニティ参加など、さまざまな機能を提供しています。",
}

// https://scratch-building.vercel.app
// https://scratch-building-beta.vercel.app
// http://localhost:3000

export const _cfgImages = {
    links_icon_png: "/brand/scratch-building/ScratchBuilding_512x512.webp",
    links_icon_user_guest_png: "/icons/scratch/scratch_guest.webp",
    links_game_banner_bg: "/brand/scratch-building/game/banner_bg.webp",
    links_game_banner_bgNone: "/brand/scratch-building/game/banner.webp",
    links_projects_alpha_480x360: "/images/projects/alpha_480x360.webp",
}

export const _cfgLinks = {
    scratch_building_play: "https://scratch.mit.edu/projects/927111186/",
    scratch_building_stats_page: "https://stats.uptimerobot.com/ncjBMaI1yr",

    scratch_auth_pageLink_home: "https://auth.itinerary.eu.org/",
    scratch_auth_stats_page: "https://stats.uptimerobot.com/4Ggz4Fzo2O",
}

export const _cfgSiteLinks = {
    home: "/",
    games: "/games",
    mods: "/mods",
    qa: "/qa",
    docs: "/docs",
    docs_changelogs: "/docs/changelogs",
    docs_terms_of_use: "/docs/terms",
    docs_guidelines: "/docs/guidelines",
}

export const _cfgCredit = {
    creator: "selcold",
    creator_url: LINK_GitHub("selcold"),
    Repository_GitHub: "https://github.com/selcold/scratch-building",
}

export const _cfgSocials = {
    Fun117_GitHub: LINK_GitHub("Fun117"),
    selcold_GitHub: LINK_GitHub("selcold"),
}

export function LINK_GitHub(username: string) {
    return `https://github.com/${username}`
}