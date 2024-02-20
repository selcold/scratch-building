'use client';

import Badge from "@/components/badge-ui/ui/badge-ui";

type ModsList = {
    createdBy: string;
    version: string;
    release_time: string;
    last_change_time: string;
    content_list: {
        group: string;
        description: string;
        creator: string;
        content: {
            name: string;
            description: string;
            creator: string;
            projectId: string;
            tags?: {
                name: string;
                color: string;
            }[];
        }[];
    }[];
};
export const ModsGetListHtml = async () => {
    let modsListGroupHtml: JSX.Element[] = [];

    // fetchで取得したデータをmodsListHtmlに追加
    const response = await fetch('/db/mods.json');
    const sub_obj_modsList = await response.json() as ModsList;

    if (sub_obj_modsList !== null) {
        var obj_modsList_content_list = sub_obj_modsList.content_list;

        obj_modsList_content_list.forEach((__obj_modsList_content_list, index) => {
            var obj_modsList_content = __obj_modsList_content_list.content;

            modsListGroupHtml.push(
                <div key={__obj_modsList_content_list.group} className="fadeUpTrigger bg-zinc-800 max-w-[800px] mt-[20px] mb-[20px] ml-auto mr-auto p-[20px] md:rounded-[10px] shadow-md">
                    <div>
                        <h2 className=' font-bold text-2xl'>{__obj_modsList_content_list.group}</h2>
                        <p className='mb-[10px]' dangerouslySetInnerHTML={{ __html: __obj_modsList_content_list.description }} />
                    </div>
                    <ul className='flex flex-wrap justify-start p-7 gap-2'>
                        {obj_modsList_content.map((__obj_modsList_content) => {
                            return (
                                <li key={__obj_modsList_content.projectId} className='box-border bg-zinc-800 border-zinc-500 border-[2px] rounded-[10px] w-[225px] p-2 hover:shadow-zinc-500/20 hover:scale-[1.04] active:shadow-zinc-900/10 active:scale-[0.9] shadow-lg transition duration-300 ease-in-out'>
                                    <a className="cursor-pointer" href={`https://scratch.mit.edu/projects/${__obj_modsList_content.projectId}`} target="_block">
                                        <div className='select-none pointer-events-none'>
                                            <img src={`https://uploads.scratch.mit.edu/get_image/project/${__obj_modsList_content.projectId}_480x360.png`} className='rounded-[5px] w-full h-auto'/>
                                        </div>
                                        <div className='w-full p-1'>
                                            <div className='flex flex-wrap justify-center mr-auto break-all'>
                                                <h1 className='text-2xl'>{__obj_modsList_content.name}</h1>
                                                {__obj_modsList_content.tags ? (
                                                    <span className='ml-1 mr-auto mt-auto mb-auto flex justify-center'>
                                                        <Badge mode={__obj_modsList_content.tags["0"].color}>{__obj_modsList_content.tags["0"].name}</Badge>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <p>{__obj_modsList_content.description}</p>
                                        </div>
                                        <div>
                                            <p>{`by ${__obj_modsList_content.creator}`}</p>
                                        </div>
                                    </a>
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
