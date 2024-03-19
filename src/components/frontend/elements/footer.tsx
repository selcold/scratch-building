// /src/components/frontend/elements/footer.tsx

import { _cfgCredit, _cfgImages, _cfgSiteLinks, _cfgSite, _cfgSocials } from "@/components/configs/siteLinks";
import Image from "next/image";
import { _locales } from "../site/_locales";
import Link from "next/link";

const nav_Socials = [
	{ name: 'GitHub', href: _cfgCredit.creator_url, target: '_block' },
]

const nav_Development = [
	{ name: _locales('Repository'), href: _cfgCredit.Repository_GitHub, target: '_block' },
]

const nav_Resources = [
    { name: _locales('Docs'), href: _cfgSiteLinks.docs, target: '' },
	{ name: _locales('Terms of Use'), href: _cfgSiteLinks.docs_terms_of_use, target: '' },
    { name: _locales('Guidelines'), href: _cfgSiteLinks.docs_guidelines, target: '' },
]

export default function Footer({ children, Breadcrumb }: { children?: React.ReactNode, Breadcrumb?: React.ReactNode}) {

    const currentFullYear = new Date().getFullYear();

    return (
        <>
            <footer className="flex flex-col justify-center bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 border-t-[1px] w-full px-5 md:px-10 py-5">
                <div className="flex flex-col md:flex-row flex-wrap justify-between w-full max-w-4xl mx-auto">
                    <div className="mr-10 mb-5">
                        <Link href={_cfgSiteLinks.home} className="flex items-center gap-2">
                            <Image
                            priority
                            src={_cfgImages.links_icon_png}
                            alt="Logo"
                            width={50}
                            height={50}
                            />
                            <h1 className="font-bold text-neutral-600 dark:text-neutral-400">{_locales(_cfgSite.title)}</h1>
                        </Link>
                    </div>
                    <div>
                        <nav className="flex flex-wrap gap-10">
                            <section className="gap-2 items-start">
                                <h1 className="font-bold text-[16px] mb-1 text-neutral-600 dark:text-neutral-300">{_locales('Socials')}</h1>
                                <div className="flex flex-col gap-1">
                                {nav_Socials.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target={item.target}
                                        className={`text-neutral-500 dark:text-neutral-400 hover:opacity-60 transition duration-200`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                </div>
                            </section>
                            <section className="gap-2 items-start">
                                <h1 className="font-bold text-[16px] mb-1 text-neutral-600 dark:text-neutral-300">{_locales('Development')}</h1>
                                <div className="flex flex-col gap-1">
                                {nav_Development.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target={item.target}
                                        className={`text-neutral-500 dark:text-neutral-400 hover:opacity-60 transition duration-200`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                </div>
                            </section>
                            <section className="gap-2 items-start">
                                <h1 className="font-bold text-[16px] mb-1 text-neutral-600 dark:text-neutral-300">{_locales('Resources')}</h1>
                                <div className="flex flex-col gap-1">
                                {nav_Resources.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target={item.target}
                                        className={`text-neutral-500 dark:text-neutral-400 hover:opacity-60 transition duration-200`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                </div>
                            </section>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-between border-neutral-200 dark:border-neutral-800 border-t-[1px] w-full max-w-4xl mx-auto mt-5 pt-5">
                    <span className="text-neutral-400 dark:text-neutral-600">© {currentFullYear} - {_cfgCredit.creator}. {_locales('All rights reserved.')}</span>
                    {Breadcrumb}
                </div>
            </footer>
        </>
    );
}