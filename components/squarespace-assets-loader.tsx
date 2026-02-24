"use client";

import { useEffect } from "react";

function loadOnce(href: string, loaded: Set<string>, tag: "link" | "script") {
  if (!href || loaded.has(href)) return;
  loaded.add(href);
  if (tag === "link") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  } else {
    const script = document.createElement("script");
    script.src = href;
    script.async = true;
    document.body.appendChild(script);
  }
}

export function SquarespaceAssetsLoader() {
  useEffect(() => {
    const loaded = new Set<string>();

    const loadCssList = (attr: string | null) => {
      if (!attr) return;
      try {
        const list = JSON.parse(attr) as string[];
        list.forEach((href) => loadOnce(href, loaded, "link"));
      } catch {
        // ignore
      }
    };

    const loadScriptList = (attr: string | null) => {
      if (!attr) return;
      try {
        const list = JSON.parse(attr) as string[];
        list.forEach((href) => loadOnce(href, loaded, "script"));
      } catch {
        // ignore
      }
    };

    document.querySelectorAll<HTMLElement>("[data-block-css]").forEach((el) => {
      loadCssList(el.getAttribute("data-block-css"));
    });

    document
      .querySelectorAll<HTMLElement>("[data-block-scripts]")
      .forEach((el) => {
        loadScriptList(el.getAttribute("data-block-scripts"));
      });
  }, []);

  return null;
}
