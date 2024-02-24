'use client'

import { PageLoading } from "../../components/element/pageLoading";
import { HeadCustom_config } from "../../components/site/headCustom";
import links_config from "../../public/db/data/links_config";

export default function Loading() {
    // headカスタム
	const Head_config = {
		"title":`loading | ${links_config.site_title}`,
	};
	HeadCustom_config(Head_config);
    return (
        <>
            <PageLoading/>
        </>
    );
}