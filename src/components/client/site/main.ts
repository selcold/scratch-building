// src/components/frontend/site/index.ts

"use client";

import {
  getDecryptedSessionId,
  setEncryptedUsername,
} from "@/components/server/cookie";

// Text Copy
export const TextCopyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
};

// DARK MODE
export function DarkModeGET() {
  const cookie_dark = getDecryptedSessionId("dark");
  if (cookie_dark) {
    if (cookie_dark === "true") {
      return "true";
    }
  }
  return "false";
}
export function DarkModeSET() {
  const html = document.querySelector("html");
  if (html) {
    const cookie_dark = getDecryptedSessionId("dark");
    if (cookie_dark) {
      if (cookie_dark === "false") {
        html.classList.remove("dark");
      } else {
        html.classList.add("dark");
      }
    } else {
      setEncryptedUsername("dark", "false", 36500);
    }
  } else {
    console.log("html not found");
  }
}
export function DarkModeChange(mode: string) {
  setEncryptedUsername("dark", mode, 36500);
  window.location.reload();
}
