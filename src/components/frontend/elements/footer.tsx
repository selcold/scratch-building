// /src/components/frontend/elements/footer.tsx

import { _cfgCredit, _cfgSite, _cfgSocials } from "@/components/configs/siteLinks";
import Image from "next/image";
import { _locales } from "../site/_locales";

const nav_Socials = [
	{ name: 'GitHub', href: _cfgCredit.creator_url, target: '_block' },
]

const nav_Development = [
	{ name: _locales('Repository'), href: _cfgCredit.Repository_GitHub, target: '_block' },
]

export default function Footer() {

    const currentFullYear = new Date().getFullYear();;

    return (
        <>
            <footer className="flex flex-col justify-center bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 border-t-[1px] w-full px-5 md:px-10 py-5">
                <div className="flex flex-col md:flex-row flex-wrap justify-between w-full max-w-4xl mx-auto">
                    <div className="mr-10 mb-5">
                        <span className="flex items-center gap-2">
                            <Image
                            priority
                            src={_cfgSite.links_icon_png}
                            alt="IC"
                            width={50}
                            height={50}
                            />
                            <h1 className="font-bold text-neutral-600 dark:text-neutral-400">{_locales(_cfgSite.title)}</h1>
                        </span>
                    </div>
                    <div>
                        <nav className="flex flex-wrap gap-10">
                            <section className="items-start">
                                <h1 className="font-bold text-[16px] mb-1 text-neutral-600 dark:text-neutral-300">{_locales('Socials')}</h1>
                                {nav_Socials.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target={item.target}
                                        className={`text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition duration-200`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </section>
                            <section className="items-start">
                                <h1 className="font-bold text-[16px] mb-1 text-neutral-600 dark:text-neutral-300">{_locales('Development')}</h1>
                                {nav_Development.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target={item.target}
                                        className={`text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition duration-200`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </section>
                        </nav>
                    </div>
                </div>
                <div className="border-neutral-200 dark:border-neutral-800 border-t-[1px] w-full max-w-4xl mx-auto mt-5 pt-5">
                    <span className="text-neutral-400 dark:text-neutral-600">© {currentFullYear} - {_cfgCredit.creator}. {_locales('All rights reserved.')}</span>
                </div>
            </footer>
        </>
    );
}