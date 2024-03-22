export const _cfgSite = {
    origin: "https://scratch-building-beta.vercel.app",
    title: "Scratch Building",
}

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
    stats_page: "https://stats.uptimerobot.com/ncjBMaI1yr",
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