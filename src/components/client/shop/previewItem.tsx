"use client";

import * as React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { contents_json } from "../../../../contents/contents";
import {
  CardContents,
  ModCard,
  ModCardContent,
  ModCardFooter,
  ModCardHeader,
} from "../elements/card";
import Link from "next/link";
import Image from "next/image";
import { _locales } from "../site/_locales";
import { shop_items } from "../../../../contents/shop";
import { FormatDate_yyyy_MM_dd } from "../site/formatDateTime";
import { ServerShopGET } from "./api";
import { Skeleton } from "@/components/ui/skeleton";

export interface _shop_items {
  deco: {
    [key: string]: {
      label: string;
      release_date: string;
      price: number;
      svg?: string;
    };
  };
  color: {
    [key: string]: {
      label: string;
      code: string; // Changed 'value' to 'code'
      release_date: string;
      price: number;
    };
  };
}

function ShopProfilePreviewGet_Bg({ req_color, req_deco }: { req_color: string; req_deco?: string; }) {
  return (
    <svg
      viewBox="0 0 405 253"
      width="405.21"
      height="253.00"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="w-[286px] h-[178.56px] md:w-[405.21px] md:max-w-full md:h-auto mx-auto align-middle"
    >
      {/* タブレット背景 */}
      <path id="svg_back" d="M383.24 247h-361.33c-8.77 0-15.9-7.13-15.9-15.91v-209.18c0-8.76 7.13-15.9 15.9-15.9h361.33c8.77 0 15.9 7.13 15.9 15.9v209.18c0 8.77-7.13 15.91-15.91 15.91z" fill="#B6B6C1" />
      <path id="svg_color" d="M15.30,246.61v-178.29c0,-25.25 20.54,-45.81 45.81,-45.81h282.86c25.26,0 45.81,20.55 45.81,45.81v178.29h-374.48z" fill={shop_items.color[req_color].code || `#9494a6`} stroke-width="0px" />
      <path id="svg_frame" d="M383.24 247h-361.33c-8.77 0-15.9-7.13-15.9-15.91v-209.18c0-8.76 7.13-15.9 15.9-15.9h361.33c8.77 0 15.9 7.13 15.9 15.9v209.18c0 8.77-7.13 15.91-15.91 15.91z" fill="none" stroke="#7B7D8C" stroke-width="12px" />
      {/* 情報線 */}
      <g id="lines" fill="none" stroke-linecap="round">
          <path id="svg_line_lightgray" d="M347.18,40.20h-214.61" stroke="#B5B5B5" stroke-width="25px" />
          <path id="svg_line_gray" d="M137.65519,63.43183h68.27828" stroke="#E1E1E1" stroke-width="7.5px" />
          <path id="svg_line_lime" d="M205.93,82.46h-68.27" stroke="#AAFF88" stroke-width="7.5px" />
          <path id="svg_line_orange" d="M224.68,82.46h31.62" stroke="#FFAB19" stroke-width="7.5px" />
          <path id="svg_line_white" d="M88.88,185.13h-33.29M88.88,157.07h-33.29M127.22,129.02h-71.63M55.58,100.97h113.61M258.80,40.20h-110.51" stroke="#E1E1E1" stroke-width="12.5px" />
          <path id="svg_line_green" d="M119.82,228.05h-75.76M147.24,228.05h42.29" stroke="#60BF69" stroke-width="20px" />
      </g>
    </svg>
  );
}

export function Client_ShopGET({
  mode,
}: {
  mode: "all" | "today" | "untilToday" | "latest";
}) {
  const [shopItems, set_shopItems] = React.useState<any>(null);
  const [shopItems_message, set_shopItems_message] =
    React.useState<string>("loading");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ServerShopGET(mode);
        set_shopItems(result);
        if (result.length > 0) {
          // console.log(result)
          const a = result["0"];
          if (a.request_mode) {
            // console.log(a.request_mode);
          } else {
            set_shopItems_message("successful");
          }
        } else {
          set_shopItems_message("successful");
        }
      } catch (error) {
        set_shopItems_message("error");
        console.error(`${_locales("Failed to retrieve store data")}:`, error);
      }
    };
    fetchData();
  }, []);

  // console.log(shopItems)

  return (
    <div className="flex flex-col gap-2">
      {shopItems_message === "loading" ? (
        <div className="flex flex-col gap-2 p-6 pt-0">
          <div className="flex flex-wrap gap-2 px-2">
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
          </div>
          <div className="flex flex-wrap gap-2 px-2">
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
            <Skeleton className="relative border w-[225px] min-h-[187px] h-full rounded-lg shadow-md select-none" />
          </div>
        </div>
      ) : shopItems_message === "error" ? (
        <>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{_locales("Error")}</AlertTitle>
            <AlertDescription>
              {_locales("Failed to retrieve store data")}
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          {mode === "today" || mode === "latest" ? (
            <>
              <CardContents durationPls={0}>
                <CardHeader>
                  <CardTitle>
                    {FormatDate_yyyy_MM_dd(shopItems.timestamp)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 px-2">
                    {shopItems &&
                      shopItems.value &&
                      shopItems.value.length > 0 &&
                      shopItems.value
                        .substring(1, shopItems.value.length - 1)
                        .split(",")
                        .map((value: string, index2: number) => {
                          // カラーコードからラベルを取得
                          let type = "";
                          if (value.startsWith("deco-")) {
                            type = "deco";
                          } else if (value.startsWith("color-")) {
                            type = "color";
                          }

                          let label = "";
                          if (type === "deco") {
                            label = shop_items.deco[value]?.label || "";
                          } else if (type === "color") {
                            label = shop_items.color[value]?.label || "";
                          }
                          let color = "";
                          if (type === "deco") {
                            color = "#9494a6";
                          } else if (type === "color") {
                            color = shop_items.color[value]?.code || "#9494a6";
                          }
                          let release_date = '';
                          if (type === "deco") {
                            release_date = shop_items.deco[value]?.release_date || '';
                          } else if (type === "color") {
                            release_date = shop_items.color[value]?.release_date || '';
                          }
                          let price = 0;
                          if (type === "deco") {
                            price = shop_items.deco[value]?.price || 0;
                          } else if (type === "color") {
                            price = shop_items.color[value]?.price || 0;
                          }
                          return (
                            <ModCard key={index2}>
                              <ModCardHeader>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className="w-full h-full overflow-hidden">
                                      {type === "color" ? (
                                        <ShopProfilePreviewGet_Bg
                                          req_color={value}
                                        />
                                      ) : (
                                        <>
                                          <ShopProfilePreviewGet_Bg
                                            req_color={`color-0`}
                                          />
                                        </>
                                      )}
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="flex flex-col justify-center p-4 md:p-5">
                                    {type === "color" ? (
                                      <ShopProfilePreviewGet_Bg
                                        req_color={value}
                                      />
                                    ) : (
                                      <>
                                        <ShopProfilePreviewGet_Bg
                                          req_color={`color-0`}
                                        />
                                        <h1 className="text-red-500">
                                          {_locales(
                                            "Decoration currently does not support preview."
                                          )}
                                        </h1>
                                      </>
                                    )}
                                    <CardTitle className="text-2xl">{label}</CardTitle>
                                    <CardTitle className="text-xl">🟡{price}</CardTitle>
                                    <CardTitle className="text-sm">{type === "color" ? `${_locales('color')}🎨` : `${_locales('decoration')}✨`}</CardTitle>
                                    <CardTitle className="text-sm">{_locales('Add')}：{release_date}</CardTitle>
                                  </DialogContent>
                                </Dialog>
                              </ModCardHeader>
                              <ModCardContent>
                                <CardTitle className="text-xl">{label}</CardTitle>
                                <CardTitle className="text-base">🟡{price}</CardTitle>
                                <CardTitle className="text-sm">{type === "color" ? `${_locales('color')}🎨` : `${_locales('decoration')}✨`}</CardTitle>
                                <CardTitle className="text-sm">{_locales('Add')}：{release_date}</CardTitle>
                              </ModCardContent>
                            </ModCard>
                          );
                        })}
                  </div>
                </CardContent>
              </CardContents>
            </>
          ) : (
            <>
              {shopItems &&
                shopItems.length > 0 &&
                shopItems
                  .slice()
                  .reverse()
                  .map((content: any, index: number) => (
                    <CardContents durationPls={0} key={index}>
                      <CardHeader>
                        <CardTitle>
                          {FormatDate_yyyy_MM_dd(content.timestamp)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 px-2 b">
                          {content.value &&
                            content.value.length > 0 &&
                            content.value
                              .substring(1, content.value.length - 1)
                              .split(",")
                              .map((value: string, index2: number) => {
                                // カラーコードからラベルを取得
                                let type = "";
                                if (value.startsWith("deco-")) {
                                  type = "deco";
                                } else if (value.startsWith("color-")) {
                                  type = "color";
                                }

                                let label = "";
                                if (type === "deco") {
                                  label = shop_items.deco[value]?.label || "";
                                } else if (type === "color") {
                                  label = shop_items.color[value]?.label || "";
                                }
                                let color = "";
                                if (type === "deco") {
                                  color = "#9494a6";
                                } else if (type === "color") {
                                  color =
                                    shop_items.color[value]?.code || "#9494a6";
                                }
                                let release_date = '';
                                if (type === "deco") {
                                  release_date = shop_items.deco[value]?.release_date || '';
                                } else if (type === "color") {
                                  release_date = shop_items.color[value]?.release_date || '';
                                }
                                let price = 0;
                                if (type === "deco") {
                                  price = shop_items.deco[value]?.price || 0;
                                } else if (type === "color") {
                                  price = shop_items.color[value]?.price || 0;
                                }
                                return (
                                  <ModCard key={index2}>
                                    <ModCardHeader>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <div className="w-full h-full overflow-hidden">
                                            {type === "color" ? (
                                              <ShopProfilePreviewGet_Bg
                                                req_color={value}
                                              />
                                            ) : (
                                              <>
                                                <ShopProfilePreviewGet_Bg
                                                  req_color={`color-0`}
                                                />
                                              </>
                                            )}
                                          </div>
                                        </DialogTrigger>
                                        <DialogContent className="flex flex-col justify-center p-4 md:p-5">
                                          {type === "color" ? (
                                            <ShopProfilePreviewGet_Bg
                                              req_color={value}
                                            />
                                          ) : (
                                            <>
                                              <ShopProfilePreviewGet_Bg
                                                req_color={`color-0`}
                                              />
                                              <h1 className="text-red-500">
                                                {_locales(
                                                  "Decoration currently does not support preview."
                                                )}
                                              </h1>
                                            </>
                                          )}
                                          <CardTitle className="text-2xl">{label}</CardTitle>
                                          <CardTitle className="text-xl">🟡{price}</CardTitle>
                                          <CardTitle className="text-sm">{type === "color" ? `${_locales('color')}🎨` : `${_locales('decoration')}✨`}</CardTitle>
                                          <CardTitle className="text-sm">{_locales('Add')}：{release_date}</CardTitle>
                                        </DialogContent>
                                      </Dialog>
                                    </ModCardHeader>
                                    <ModCardContent>
                                      <CardTitle className="text-xl">{label}</CardTitle>
                                      <CardTitle className="text-base">🟡{price}</CardTitle>
                                      <CardTitle className="text-sm">{type === "color" ? "カラー🎨" : "デコレーション✨"}</CardTitle>
                                      <CardTitle className="text-sm">追加：{release_date}</CardTitle>
                                    </ModCardContent>
                                  </ModCard>
                                );
                              })}
                        </div>
                      </CardContent>
                    </CardContents>
                  ))}
            </>
          )}
        </>
      )}
    </div>
  );
}


/**
  <Image
    src={`/images/scratch/scratch-building/profileView_bg.svg`}
    alt="image"
    width={480}
    height={360}
    className={`w-full h-auto rounded-md fill-[${color}]`}
  />
 */