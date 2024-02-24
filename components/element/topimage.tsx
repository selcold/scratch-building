'use client'

import links_config from "../../public/db/data/links_config";

export const TopImage = ({ title }: { title?: string | null }) => {
    const defaultTitle = `${links_config.game_name}v${links_config.game_version}`;
    const Html_title = title ? title : defaultTitle;

    return (
        <>
            <div id='top_image' className="w-full relative z-1 min-h-[calc(100vh-20%)] flex" style={{background:`linear-gradient(rgb(19, 21, 31) -4.84%, rgb(29, 28, 47) 34.9%, rgb(32 38 54) 48.6%, rgb(40 48 62) 66.41%, rgb(61 85 98) 103.41%, rgb(81 124 140) 132.18%)`}}>
                <div className="absolute w-full h-full -z-1 bottom-0 left-0 pointer-events-none overflow-hidden bg-[#97b7d1]">
                    <img src={links_config.game_play_img} alt="Forest dark" className="w-full absolute bottom-0" />
                </div>
                <div className="backdrop-blur-sm backdrop-brightness-50 min-h-full w-full flex items-center justify-start">
                    <div className="mx-auto w-full max-w-screen-lg px-6 lg:px-10 py-6 lg:py-10 pt-10 lg:pt-24">
                        <div className='absolute bottom-2 left-2'>
                            <h1 className='mb-1'>{defaultTitle}</h1>
                            <a href={links_config.game_play_url} target='_block'>
                                <button className='button_border_1'>
                                {links_config.game_play_platform}でプレイ
                                </button>
                            </a>
                        </div>
                        <div className="w-full text-center mt-10 lg:mt-20">
                            <h1 className="text-white min-h-32 font-bold text-2xl md:text-5xl">{Html_title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}