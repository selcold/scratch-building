// utils/cleanText.ts

import {
  blockedPatterns,
  whitelistedPatterns,
} from "@/components/configs/blockedDomains";
import { ScratchCommentsConfig } from "../../scratchComments.config";

export type TypeBlockedPatterns = string[];
export type TypeWhitelistedPatterns = string[];

// URLを正規化して、末尾のスラッシュを削除する関数
const normalizeUrl = (url: string): string => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

// カスタムパターンにマッチするかどうかを確認
const isBlockedPattern = (url: string): boolean => {
  const normalizedUrl = normalizeUrl(url);

  // ホワイトリストにマッチするかどうかを確認
  const isWhitelisted = whitelistedPatterns.some((pattern) => {
    const regexPattern = new RegExp(
      "^" + pattern.replace(/\*/g, ".*").replace(/\//g, "\\/")
    );
    return regexPattern.test(normalizedUrl);
  });

  // ホワイトリストにマッチするならブロックしない
  if (isWhitelisted) {
    return false;
  }

  // ブロックリストにマッチするか確認
  return blockedPatterns.some((pattern) => {
    const regexPattern = new RegExp(
      "^" + pattern.replace(/\*/g, ".*").replace(/\//g, "\\/")
    );
    return regexPattern.test(normalizedUrl);
  });
};

// URLフィルタリング関数
const filterUrls = (text: string): string => {
  if (ScratchCommentsConfig) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    return text.replace(urlRegex, (url: string) => {
      const normalizedUrl = normalizeUrl(url);
      return isBlockedPattern(normalizedUrl)
        ? `<span class="text-red-500">(Access Denied)</span>`
        : `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${normalizedUrl}</a>`;
    });
  } else {
    return text;
  }
};

export { filterUrls };
