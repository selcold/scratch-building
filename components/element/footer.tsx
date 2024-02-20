'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import links_config from '../../public/db/data/links_config';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t border-[#FFFFFF]/[0.16] bg-zinc-950/20 pt-20 pb-10 px-4 overflow-hidden z-50">
            <div className="flex md:flex-row flex-col w-full max-w-7xl mx-auto justify-between relative">
                <svg  viewBox="0 0 1024 1024" className="absolute z-30 left-1/2  top-0  h-[100rem] w-[100rem] opacity-50 pointer-events-none -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                    <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7"/>
                    <defs>
                        <radialGradient className="blur-lg" id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor="var(--cyan-800)" />
                            <stop offset={1} stopColor="var(--cyan-800)" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="lg:w-[50%] flex flex-col">
                    <div className='mb-5'>
                        <a className="flex items-center space-x-2 flex-shrink-0  z-50" href={links_config.site_url_home}>
                            <img alt="Sglid" loading="lazy" width={10}  height={10} decoding="async" data-nimg={1} className="transition duration-300 transform blur-0 scale-100 h-5 w-5" src={links_config.ScratchBuilding_logo_url}/>
                            <span className="text-lg font-bold text-white/[0.84] hover:text-white/[0.64] transition duration-200">
                            {links_config.site_title}
                            </span>
                        </a>
                        <p className="text-[#FFFFFF]/[0.64] text-sm mt-2 max-w-sm font-normal">
                        {links_config.site_description_short}
                        </p>
                    </div>
                    <div className='mb-2'>
                        <p className="text-sm max-w-sm font-normal text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                            @Masaabu-YT
                        </p>
                        <div className="flex space-x-2 mt-1">
                            <a href={links_config.masaabu_link_github} target="_blank"  rel="noopener noreferrer" className="font-normal flex items-center text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href={links_config.masaabu_link_youtube} target="_blank"  rel="noopener noreferrer" className="font-normal flex items-center text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2  md:flex">
                    <div className="flex flex-col text-sm md:px-4 mb-4">
                        <a href={links_config.site_url_home} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        ホーム
                        </a>
                        <a href={links_config.site_url_play} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        プレイ
                        </a>
                        <a href={links_config.site_url_mods} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        MOD
                        </a>
                        <a href={links_config.site_url_wiki} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        Wiki
                        </a>
                        <a href={links_config.site_url_qa} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        Q&A
                        </a>
                    </div>
                    <div className="flex flex-col text-sm md:px-4 mb-4">
                        <a href={links_config.site_url_changelog} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        変更履歴
                        </a>
                        <a href={links_config['site_url_docs/terms']} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        利用規約
                        </a>
                        <a href={links_config['site_url_docs/guideline']} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        ガイドライン
                        </a>
                        <a href={links_config.github_link_source_code} target='_block' rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white/[0.84] transition duration-200">
                        ソースコード
                        </a>
                    </div>
                </div>
            </div>
            <div className='flex md:flex-row flex-col w-full max-w-7xl mx-auto justify-between relative'>
                <div className='mt-2'>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>ログイン</SignInButton>
                    </SignedOut>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-10 pb-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#989AA6]/[0.5] to-transparent" />
                <div className="text-sm pt-4 text-center text-white/[0.64] flex items-center flex-wrap justify-center">
                    <p style={{color:"rgb(85, 87, 98)"}}>
                        Copyright &copy; 2023 - {currentYear} 
                        <a href={links_config.fun117_link_github} target="_blank" className='ml-1 bg-transparent hover:text-white/[0.64] transition duration-200'>
                            Fun117
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
