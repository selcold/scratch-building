// /src/components/frontend/elements/main.tsx

import { _cfgImages, _cfgSite } from "@/components/configs/siteLinks"
import { _locales } from "../site/_locales"

export function ElementGroup({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <>
            <div className={`max-w-screen w-full min-h-screen h-full ${className? className:''}`}>
                {children}
            </div>
        </>
    )
}

export function Main({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <>
            <main className={`w-full h-full my-10 p-0 ${className? className:''}`}>
                {children}
            </main>
        </>
    )
}

export function HeaderBtmSpace() {
    return (
        <>
            <div className="w-full h-[250px] md:h-[350px] bg-cover bg-center" style={{backgroundImage: `url(${_cfgImages.links_game_banner_bg})`}}>
                <div className="relative flex justify-center items-center backdrop-blur-sm backdrop-brightness-100 dark:backdrop-brightness-50 text-black dark:text-white w-full h-full">
                    <div>
                        <h1 className="font-bold text-3xl md:text-5xl">{_locales(_cfgSite.title)}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-900 w-full h-[50px]"></div>
        </>
    )
}