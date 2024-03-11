export const _cfgSite = {
    origin: "https://scratch-building-beta.vercel.app",
    title: "Scratch Building",

    links_home: "/",

    links_icon_png: "/brand/scratch-building/ScratchBuilding_512x512.png",
}

// https://scratch-building-beta.vercel.app
// http://localhost:3000

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