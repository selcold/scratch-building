'use client'

import { Client_ShopGET } from "./previewItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { _locales } from "../site/_locales";
import { useSearchParams } from "next/navigation";

export function ShopPreviewGET() {
  const searchParams = useSearchParams();
  const param_tab = searchParams.get('tab');
  const tab_defaultValue = (param_tab === 'today' || param_tab === 'untilToday') ? param_tab : 'today';

  return (
    <>
      <Tabs
        defaultValue={tab_defaultValue}
        className="w-full shadow-lg animate-fade-up animate-once animate-duration-[350ms] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">{_locales("Today")}</TabsTrigger>
          <TabsTrigger value="untilToday">{_locales("untilToday")}</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Client_ShopGET mode="today"/>
        </TabsContent>
        <TabsContent value="untilToday">
          <Client_ShopGET mode="untilToday"/>
        </TabsContent>
      </Tabs>
    </>
  );
}
