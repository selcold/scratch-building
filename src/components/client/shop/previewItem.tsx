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

function ShopProfilePreviewGet_Bg({ req_color }: { req_color: string }) {
  return (
    <svg
      width="405.21388"
      height="253.00593"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="w-[286px] h-[178.562px] md:w-[405.21388px] md:max-w-full md:h-auto mx-auto align-middle"
    >
      <g
        id="svg_1"
        fillRule="nonzero"
        strokeMiterlimit="10"
        strokeDashoffset="0"
      >
        {/* タブレット背景 */}
        <path
          id="svg_2"
          d="m383.24021,247.00592l-361.33246,0c-8.77227,0 -15.90775,-7.13243 -15.90775,-15.91084l0,-209.18733c0,-8.7692 7.1355,-15.90775 15.90775,-15.90775l361.33553,0c8.77227,0 15.90776,7.1386 15.90776,15.90775l0,209.18734c0,8.77841 -7.1386,15.91084 -15.91086,15.91084l0.00003,-0.00001z"
          fill="#b6b6c1"
          stroke="#7b7d8c"
          strokeWidth="12"
        />
        {/* カラー背景 */}
        <path
          id="svg_3"
          d="m15.30679,246.61684l0,-178.29877c0,-25.25407 20.54922,-45.81206 45.81206,-45.81206l282.8602,0c25.26291,0 45.8121,20.55816 45.8121,45.81206l0,178.2988l-374.48436,-0.00003z"
          fill={shop_items.color[req_color].code || `#9494a6`}
          strokeWidth="0"
        />
        {/* 情報線 */}
        <g id="svg_4" fill="none" strokeLinecap="round">
          <path
            id="svg_5"
            d="m119.82542,228.05656l-75.76501,0"
            stroke="#60bf69"
            strokeWidth="20"
          />
          <path
            id="svg_6"
            d="m147.24956,228.05656l42.29826,0"
            stroke="#60bf69"
            strokeWidth="20"
          />
          <path
            id="svg_7"
            d="m88.8895,185.13012l-33.29966,0"
            stroke="#e1e1e1"
            strokeWidth="12.5"
          />
          <path
            id="svg_8"
            d="m88.88949,157.07723l-33.29965,0"
            stroke="#e1e1e1"
            strokeWidth="12.5"
          />
          <path
            id="svg_9"
            d="m127.22606,129.02435l-71.63622,0"
            stroke="#e1e1e1"
            strokeWidth="12.5"
          />
          <path
            id="svg_10"
            d="m55.58984,100.97145l113.61057,0"
            stroke="#e1e1e1"
            strokeWidth="12.5"
          />
          <path
            id="svg_11"
            d="m205.93347,82.46021l-68.27828,0"
            stroke="#aaff88"
            strokeWidth="7.5"
          />
          <path
            id="svg_12"
            d="m347.18602,40.20602l-214.61784,0"
            stroke="#b5b5b5"
            strokeWidth="25"
          />
          <path
            id="svg_13"
            d="m137.65519,63.43183l68.27828,0"
            stroke="#e1e1e1"
            strokeWidth="7.5"
          />
          <path
            id="svg_14"
            d="m258.80173,40.20602l-110.51304,0"
            stroke="#e1e1e1"
            strokeWidth="12.5"
          />
          <path
            id="svg_15"
            d="m224.68201,82.46021l31.62068,0"
            stroke="#ffab19"
            strokeWidth="7.5"
          />
        </g>
        {/* 最前面枠 */}
        <path
          id="svg_16"
          d="m383.24021,247.00592l-361.33246,0c-8.77227,0 -15.90775,-7.13243 -15.90775,-15.91084l0,-209.18733c0,-8.7692 7.1355,-15.90775 15.90775,-15.90775l361.33553,0c8.77227,0 15.90776,7.1386 15.90776,15.90775l0,209.18734c0,8.77841 -7.1386,15.91084 -15.91086,15.91084l0.00003,-0.00001z"
          fill="none"
          stroke="#7b7d8c"
          strokeWidth="12"
        />
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
                          return (
                            <ModCard key={index2}>
                              <ModCardHeader>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Image
                                      src={`/images/scratch/scratch-building/profileView_bg.svg`}
                                      alt="image"
                                      width={480}
                                      height={360}
                                      className={`w-full h-auto rounded-md fill-[${color}]`}
                                    />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="flex flex-col justify-center p-4 md:p-5">
                                    {type === "color" ? (
                                      <ShopProfilePreviewGet_Bg
                                        req_color={value}
                                      />
                                    ) : (
                                      <>
                                        <h1>
                                          {_locales(
                                            "Decoration currently does not support preview."
                                          )}
                                        </h1>
                                      </>
                                    )}
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        {_locales("Close")}
                                      </AlertDialogCancel>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </ModCardHeader>
                              <ModCardContent>
                                <CardTitle>{label}</CardTitle>
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
                shopItems.map((content: any, index: number) => (
                  <CardContents durationPls={0} key={index}>
                    <CardHeader>
                      <CardTitle>
                        {FormatDate_yyyy_MM_dd(content.timestamp)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 px-2">
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
                              return (
                                <ModCard key={index2}>
                                  <ModCardHeader>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Image
                                          src={`/images/scratch/scratch-building/profileView_bg.svg`}
                                          alt="image"
                                          width={480}
                                          height={360}
                                          className={`w-full h-auto rounded-md fill-[${color}]`}
                                        />
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="flex flex-col justify-center p-4 md:p-5">
                                        {type === "color" ? (
                                          <ShopProfilePreviewGet_Bg
                                            req_color={value}
                                          />
                                        ) : (
                                          <>
                                            <h1>
                                              {_locales(
                                                "Decoration currently does not support preview."
                                              )}
                                            </h1>
                                          </>
                                        )}
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            {_locales("Close")}
                                          </AlertDialogCancel>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </ModCardHeader>
                                  <ModCardContent>
                                    <CardTitle>{label}</CardTitle>
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
