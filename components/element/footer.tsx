'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import links_config from '../../public/assets/data/links_config';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t border-[#FFFFFF]/[0.16] bg-[#0B0F17] pt-20 pb-10 px-4  overflow-hidden  z-50" style={{backgroundColor:"var(--background-4)"}}>
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
                <div className="lg:w-[50%] flex flex-col justify-between ">
                    <div>
                        <a className="flex items-center space-x-2 flex-shrink-0  z-50" href={links_config.site_url_home}>
                            <img alt="Sglid" loading="lazy" width={10}  height={10} decoding="async" data-nimg={1} className="transition duration-300 transform blur-0 scale-100 h-5 w-5" style={{color:"transparent"}}
                                src={links_config.ScratchBuilding_logo_url}
                            />
                            <span className="text-lg text-white font-bold" style={{color:"var(--text-1)"}}>
                            {links_config.site_title}
                            </span>
                        </a>
                        <p className="text-[#FFFFFF]/[0.64] text-sm mt-2 max-w-sm font-normal" style={{color:"var(--text-1)"}}>
                        {links_config.site_description_short}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#FFFFFF]/[0.64] text-sm mt-2 max-w-sm font-normal" style={{color:"var(--text-1)"}}>
                            @Masaabu-YT
                        </p>
                        <div className="flex space-x-2">
                            <a href={links_config.masaabu_link_github} target="_blank"  rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] flex space-x-2 items-center" style={{color:"var(--text-1)"}}>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href={links_config.masaabu_link_youtube} target="_blank"  rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] flex space-x-2 items-center" style={{color:"var(--text-1)"}}>
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2  md:flex">
                    <div className="flex flex-col text-sm md:px-4 mb-4">
                        <a href={links_config.site_url_home} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white transition-all" style={{color:"var(--text-1)"}}>
                        ホーム
                        </a>
                        <a href={links_config.site_url_mods} rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white transition-all" style={{color:"var(--text-1)"}}>
                        MOD
                        </a>
                    </div>
                    <div className="flex flex-col text-sm md:px-4 mb-4">
                        <a href={links_config.github_link_source_code} target='_block' rel="noopener noreferrer" className="font-normal mt-4 text-white/[0.64] hover:text-white transition-all" style={{color:"var(--text-1)"}}>
                        ソースコード
                        </a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-20 pb-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#989AA6]/[0.5] to-transparent" />
                <div className="text-sm pt-4 text-center text-white/[0.64] flex items-center flex-wrap justify-center">
                    <p style={{color:"rgb(85, 87, 98)"}}>
                        Copyright &copy; 2023 - {currentYear} 
                        <a href={links_config.fun117_link_github} target="_blank" className='ml-1'>
                            Fun117
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
