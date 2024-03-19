// /src/components/frontend/elements/contents.tsx

'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { contents_json } from "../../../../contents/contentsObj";
import { CardContents, ModCard, ModCardContent, ModCardFooter, ModCardHeader } from "./card";
import Link from "next/link";
import { contentObj_modsAll } from "../../../../contents/contentObj_mods";
import Image from "next/image";
import Badge from "@/components/badge-ui/ui/badge-ui";
import { Input } from "@/components/ui/input";
import { _locales, _localesContent, _localesText } from "../site/_locales";
import { contentObj_gamesAll } from "../../../../contents/contentObj_games";
import { _cfgImages } from "@/components/configs/siteLinks";

export function ContentsSET({ contentTitle }: { contentTitle: string }) {
    const contentsObj = contents_json;
    const selectedContents = contentsObj[contentTitle];

    return (
        <>
            {selectedContents && selectedContents.map((content: any, index: number) => (
            <CardContents durationPls={ 50 * index} key={index}>
                <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content.description }} />
                </CardHeader>
                {content.actions ? (
                    <CardFooter className="flex flex-wrap gap-2">
                    {content.actions?.map((action: any, index: number) => (
                        <Button
                            variant={action.variant} 
                            onClick={() => {
                                if (action.onclick) {
                                    eval(action.onclick);
                                }
                            }}
                            key={index}
                        >
                            {action.url ? (
                                <Link href={action.url} target={action.target || '_self'}>
                                    {_locales(action.label)}
                                </Link>
                            ):(
                                _locales(action.label)
                            )}
                        </Button>
                    ))}
                    </CardFooter>
                ):(
                    <></>
                )}
            </CardContents>
            ))}
        </>
    );
};

export function ContentsGET_ModAll({ mode }: { mode: "all" | "list" }) {
    const contentObj_all = contentObj_modsAll.mods;
    const contentObj_list = contentObj_modsAll.list;

    const [select_search, set_select_search] = React.useState<string>("All");
    const [select_mod_type, set_select_mod_type] = React.useState<string>("All");
    const [select_version, set_select_version] = React.useState<string>("All");
    const [select_project_type, set_select_project_type] = React.useState<string>("All");

    // 検索結果が空の場合に表示するメッセージ
    const notFoundMessage = (
        <div className="flex justify-center items-center h-full text-gray-500">
            <p>{_locales('No matching MODs found.')}</p>
        </div>
    );

    // フィルタリングされたMODを取得する関数
    const getFilteredMods = () => {
        return contentObj_all.filter((mod: any) => {
            const searchMatch = select_search === "All" || mod.title.toLowerCase().includes(select_search.toLowerCase());
            const modTypeMatch = select_mod_type === "All" || mod.mod_type === select_mod_type;
            const versionMatch = select_version === "All" || mod.version === +select_version;
            const typeMatch = select_project_type === "All" || mod.project_type === select_project_type;
            return searchMatch && modTypeMatch && versionMatch && typeMatch;
        });
    };

    // フィルタリングされたMODを取得
    const filteredMods = getFilteredMods();

    if( mode === "list" ){
        return (
            <div className="flex flex-col gap-2">
                {contentObj_list.map((list: any, index: number) => (
                <CardContents durationPls={ 50 * index} key={index}>
                    <CardHeader>
                        <CardTitle>{_localesContent(list.title,list.title_en)}</CardTitle>
                        <CardDescription className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: _localesContent(list.description,list.description_en) }}/>
                    </CardHeader>
                    <CardContent className="flex flex-wrap justify-start py-3 px-7 gap-2">
                        {contentObj_all.map((mod: any, index: number) => (
                            <ModCard key={index} projectId={+_localesContent(mod.project_id,mod.project_id_en)} className={`${mod.project_type === list.group_type ? `` : `hidden`}`}>
                            {mod.project_type === list.group_type ? (
                            <>
                                <ModCardHeader>
                                    <Image
                                    src={`https://uploads.scratch.mit.edu/get_image/project/${_localesContent(mod.project_id,mod.project_id_en)}_480x360.png`}
                                    alt="mod image"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto rounded-md"
                                    />
                                </ModCardHeader>
                                <ModCardContent>
                                    <CardTitle>{_localesContent(mod.title,mod.title_en)}</CardTitle>
                                    <CardDescription>{_localesContent(mod.description,mod.description_en)}</CardDescription>
                                </ModCardContent>
                                <ModCardFooter>
                                    {mod.tags?.map((tag: any, index: number) => (
                                    <span key={index}>
                                        {tag.display && tag.display === "none" ? (
                                            <></>
                                        ):(
                                            <Badge mode={tag.color}>{_locales(tag.label)}</Badge>
                                        )}
                                    </span>
                                    ))}
                                </ModCardFooter>
                            </>
                            ): <></> }
                            </ModCard>
                        ))}
                    </CardContent>
                </CardContents>
            ))}
            </div>
        )
    }

    return (
        <CardContents durationPls={0}>
            <CardHeader>
                <section className="flex flex-row flex-wrap gap-3">
                    <Input type="text" placeholder={_locales('Search for MODs')} onChange={(e) => set_select_search(e.target.value)} />
                    <Select onValueChange={set_select_mod_type}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={_locales('Select a mod type')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Mod type</SelectLabel>
                                <SelectItem value="All">{_locales('All')}</SelectItem>
                                <SelectItem value="Default">{_locales('Default')}</SelectItem>
                                <SelectItem value="Official">{_locales('Official')}</SelectItem>
                                <SelectItem value="Prerequisite">{_locales('Prerequisite')}</SelectItem>
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={set_select_version}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={_locales('Select a version')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>version</SelectLabel>
                                <SelectItem value="All">{_locales('All')}</SelectItem>
                                <SelectItem value="7">v7</SelectItem>
                                <SelectItem value="6">v6</SelectItem>
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={set_select_project_type}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={_locales('Select a type')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>type</SelectLabel>
                                <SelectItem value="All">{_locales('All')}</SelectItem>
                                <SelectItem value="SBMOD">SBMOD</SelectItem>
                                <SelectItem value="SBAPI">SBAPI</SelectItem>
                                <SelectItem value="SBAddons">SB Addons</SelectItem>
                                <SelectItem value="SBaddonAPI">SB addon API</SelectItem>
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                </section>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 px-2">
                    {filteredMods.length === 0 ? notFoundMessage : (
                        filteredMods.map((mod: any, index: number) => (
                            <ModCard key={index} projectId={+_localesContent(mod.project_id,mod.project_id_en)}>
                                <ModCardHeader>
                                    <Image
                                    src={`https://uploads.scratch.mit.edu/get_image/project/${_localesContent(mod.project_id,mod.project_id_en)}_480x360.png`}
                                    alt="mod image"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto rounded-md"
                                    />
                                </ModCardHeader>
                                <ModCardContent>
                                    <CardTitle>{_localesContent(mod.title,mod.title_en)}</CardTitle>
                                    <CardDescription>{_localesContent(mod.description,mod.description_en)}</CardDescription>
                                </ModCardContent>
                                <ModCardFooter>
                                    {mod.tags?.map((tag: any, index: number) => (
                                    <span key={index}>
                                        {tag.display && tag.display === "none" ? (
                                            <></>
                                        ):(
                                            <Badge mode={tag.color}>{_locales(tag.label)}</Badge>
                                        )}
                                    </span>
                                    ))}
                                </ModCardFooter>
                            </ModCard>
                        ))
                    )}
                </div>
            </CardContent>
        </CardContents>
    )
};

export function ContentsGET_GameAll({ mode }: { mode: "release" | "alpha" }) {
    const contentObj_all = mode === "release" ? contentObj_gamesAll.release : contentObj_gamesAll.alpha;

    const [select_search, set_select_search] = React.useState<string>("All");
    const [select_version, set_select_version] = React.useState<string>("All");

    // 検索結果が空の場合に表示するメッセージ
    const notFoundMessage = (
        <div className="flex justify-center items-center h-full text-gray-500">
            <p>{_locales('No matching Games found.')}</p>
        </div>
    );

    const getFilteredContents = () => {
        return contentObj_all.filter((content: any) => {
            const searchMatch = select_search === "All" || content.version_name.toLowerCase().includes(select_search.toLowerCase());
            const versionMatch = select_version === "All" || content.version === +select_version;
            return searchMatch && versionMatch;
        });
    };
    const filteredContents = getFilteredContents();

    if(mode === "alpha"){
        return (
            <CardContents durationPls={0}>
                <CardHeader>
                    <section className="flex flex-row flex-wrap gap-3">
                        <Input type="text" placeholder={_locales('Search for Games')} onChange={(e) => set_select_search(e.target.value)} />
                        <Select onValueChange={set_select_version}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={_locales('Select a version')}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>version</SelectLabel>
                                    <SelectItem value="All">{_locales('All')}</SelectItem>
                                    <SelectItem value="7">v7</SelectItem>
                                    <SelectItem value="6">v6</SelectItem>
                                    <SelectItem value="5">v5</SelectItem>
                                    <SelectItem value="4">v4</SelectItem>
                                    <SelectItem value="3">v3</SelectItem>
                                    <SelectItem value="2">v2</SelectItem>
                                    </SelectGroup>
                            </SelectContent>
                        </Select>
                    </section>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 px-2">
                        {filteredContents.length === 0 ? notFoundMessage : (
                            filteredContents.map((content: any, index: number) => (
                                <ModCard key={index}>
                                    <ModCardHeader>
                                        <Image
                                        src={_cfgImages.links_projects_alpha_480x360}
                                        alt="game image"
                                        width={480}
                                        height={360}
                                        className="w-full h-auto rounded-md"
                                        />
                                    </ModCardHeader>
                                    <ModCardContent>
                                        <CardTitle>v{content.version_name}</CardTitle>
                                    </ModCardContent>
                                    <ModCardFooter className="flex flex-wrap gap-2">
                                        <Button>
                                            <Link href={_localesContent(content.play_url,content.play_url_en)} target="_blank">
                                            {_locales('Play')}
                                            </Link>
                                        </Button>
                                        {content.actions ? (
                                            <>
                                                {content.actions?.map((action: any, index: number) => (
                                                    <Button
                                                        variant={action.variant} 
                                                        onClick={() => {
                                                            if (action.onclick) {
                                                                eval(action.onclick); // onclick関数が定義されている場合は実行
                                                            }
                                                        }}
                                                        key={index}
                                                    >
                                                        {action.url ? (
                                                            <Link href={action.url} target={action.target || '_self'}>
                                                                {action.label}
                                                            </Link>
                                                        ):(
                                                            action.label
                                                        )}
                                                    </Button>
                                                ))}
                                            </>
                                        ): <></> }
                                    </ModCardFooter>
                                </ModCard>
                            ))
                        )}
                    </div>
                </CardContent>
            </CardContents>
        )
    }

    return (
        <CardContents durationPls={0}>
            <CardHeader>
                <section className="flex flex-row flex-wrap gap-3">
                    <Input type="text" placeholder={_locales('Search for Games')} onChange={(e) => set_select_search(e.target.value)} />
                    <Select onValueChange={set_select_version}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={_locales('Select a version')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>version</SelectLabel>
                                <SelectItem value="All">{_locales('All')}</SelectItem>
                                <SelectItem value="7">v7</SelectItem>
                                <SelectItem value="6">v6</SelectItem>
                                <SelectItem value="5">v5</SelectItem>
                                <SelectItem value="4">v4</SelectItem>
                                <SelectItem value="3">v3</SelectItem>
                                <SelectItem value="2">v2</SelectItem>
                                </SelectGroup>
                        </SelectContent>
                    </Select>
                </section>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 px-2">
                    {filteredContents.length === 0 ? notFoundMessage : (
                        filteredContents.map((content: any, index: number) => (
                            <ModCard key={index}>
                                <ModCardHeader>
                                    <Image
                                    src={`https://uploads.scratch.mit.edu/get_image/project/${_localesContent(content.project_id,content.project_id_en)}_480x360.png`}
                                    alt="game image"
                                    width={480}
                                    height={360}
                                    className="w-full h-auto rounded-md"
                                    />
                                </ModCardHeader>
                                <ModCardContent>
                                    <CardTitle>v{content.version_name}</CardTitle>
                                </ModCardContent>
                                <ModCardFooter className="flex flex-wrap gap-2">
                                    <Button>
                                        <Link href={`https://scratch.mit.edu/projects/${_localesContent(content.project_id,content.project_id_en)}/`} target="_blank">
                                        Scratch
                                        </Link>
                                    </Button>
                                    {content.actions ? (
                                        <>
                                            {content.actions?.map((action: any, index: number) => (
                                                <Button
                                                    variant={action.variant} 
                                                    onClick={() => {
                                                        if (action.onclick) {
                                                            eval(action.onclick); // onclick関数が定義されている場合は実行
                                                        }
                                                    }}
                                                    key={index}
                                                >
                                                    {action.url ? (
                                                        <Link href={action.url} target={action.target || '_self'}>
                                                            {action.label}
                                                        </Link>
                                                    ):(
                                                        action.label
                                                    )}
                                                </Button>
                                            ))}
                                        </>
                                    ): <></> }
                                </ModCardFooter>
                            </ModCard>
                        ))
                    )}
                </div>
            </CardContent>
        </CardContents>
    )
}