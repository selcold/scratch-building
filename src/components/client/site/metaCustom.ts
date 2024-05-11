// src/components/frontend/site/metaCustom.ts

"use client";

import { useEffect } from "react";

interface HeadConfig {
  title?: string;
}

export const HeadCustom_config = (req_config: HeadConfig) => {
  useEffect(() => {
    if (req_config.title) {
      if (document.title) {
        document.title = req_config.title;
      }
    }
  }, [req_config.title]);
};
