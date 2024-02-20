'use client';

import Badge from "@/components/badge-ui/ui/badge-ui";
import links_config from "../../public/db/data/links_config";

type PlayJsonList = {
    createdBy: string;
    version: string;
    release_time: string;
    last_change_time: string;
    content_list: {
        group: string;
        mode: string;
        content: {
            date: string;
            version: string;
            description: string;
            creator: string;
            projectId?: string;
            image_url?: string;
            links?: {
                name: string;
                url: string;
                target: string;
            }[];
        }[];
    }[];
};
export const PlayGetListHtml = async () => {
    let modsListGroupHtml: JSX.Element[] = [];

    // fetchで取得したデータをmodsListHtmlに追加
    const response = await fetch('/db/play.json');
    const sub_obj_modsList = await response.json() as PlayJsonList;

    if (sub_obj_modsList !== null) {
        var obj_modsList_content_list = sub_obj_modsList.content_list;

        obj_modsList_content_list.forEach((__obj_modsList_content_list, index) => {
            var obj_modsList_content = __obj_modsList_content_list.content;

            modsListGroupHtml.push(
                <div key={__obj_modsList_content_list.group} className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
                    <div>
                        <h2 className=' font-bold text-2xl'>{__obj_modsList_content_list.group}</h2>
                    </div>
                    <ul className='flex flex-wrap justify-start p-7 gap-2'>
                        {obj_modsList_content.map((__obj_modsList_content) => {
                            return (
                                <li key={__obj_modsList_content.version} className='flex flex-col box-border bg-zinc-800 border-zinc-500 border-[2px] rounded-[10px] w-[225px] p-2 hover:shadow-zinc-500/20 hover:scale-[1.04] active:shadow-zinc-900/10 active:scale-[0.9] shadow-lg transition duration-300 ease-in-out'>
                                    {__obj_modsList_content.projectId ? (
                                        <>
                                            <div className='select-none pointer-events-none'>
                                                <img src={`https://uploads.scratch.mit.edu/get_image/project/${__obj_modsList_content.projectId}_480x360.png`} className='rounded-[5px] w-full h-auto'/>
                                            </div>
                                            <div className="flex flex-col justify-around box-border">
                                                <div className='w-full p-1'>
                                                    <div className='flex flex-wrap justify-center mr-auto break-all'>
                                                        <h1 className='font-bold text-2xl'>{__obj_modsList_content.version}</h1>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap justify-start gap-2 mt-2 mb-2 p-2">
                                                    <a href={`https://scratch.mit.edu/projects/${__obj_modsList_content.projectId}`} target="_block">
                                                        <button className="bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[18px] py-[10px] text-sm transition duration-300 ease-in-out">
                                                            Scratchでプレイ
                                                        </button>
                                                    </a>
                                                    {__obj_modsList_content.links && __obj_modsList_content.links.map((link, linkIndex) => (
                                                        <a key={linkIndex} href={link.url} target={link.target ? link.target : "_self"} rel="noopener noreferrer">
                                                            <button className="bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[18px] py-[10px] text-sm transition duration-300 ease-in-out">
                                                                {link.name}
                                                            </button>
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="text-zinc-500">
                                                    <p>{`${__obj_modsList_content.date}`}</p>
                                                    <p>{`by ${__obj_modsList_content.creator}`}</p>
                                                </div>
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div className='select-none pointer-events-none'>
                                                {__obj_modsList_content.image_url ? (
                                                    <img src={__obj_modsList_content.image_url} className='rounded-[5px] w-full h-auto'/>
                                                ):(
                                                    <div className='flex justify-center items-center bg-zinc-950 rounded-[5px] w-[205px] h-[153px]'>
                                                        <h1 className="text-center font-bold">Not Found</h1>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-around box-border">
                                                <div className='w-full p-1'>
                                                    <div className='flex flex-wrap justify-center mr-auto break-all'>
                                                        <h1 className='font-bold text-2xl'>{__obj_modsList_content.version}</h1>
                                                    </div>
                                                    <p dangerouslySetInnerHTML={{ __html: __obj_modsList_content.description }}/>
                                                </div>
                                                <div className="flex flex-wrap justify-start gap-2 mt-2 mb-2 p-2">
                                                    {__obj_modsList_content.links && __obj_modsList_content.links.map((link, linkIndex) => (
                                                        <a key={linkIndex} href={link.url} target={link.target ? link.target : "_self"} rel="noopener noreferrer">
                                                            <button className="bg-blue-500 hover:shadow-blue-500/20 hover:scale-105 active:shadow-blue-900/10 active:scale-95 shadow-lg rounded-lg m-auto px-[18px] py-[10px] text-sm transition duration-300 ease-in-out">
                                                                {link.name}
                                                            </button>
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="text-zinc-500">
                                                    <p>{`${__obj_modsList_content.date}`}</p>
                                                    <p>{`by ${__obj_modsList_content.creator}`}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });

        return modsListGroupHtml;
    } else {
        return false;
    }
};
