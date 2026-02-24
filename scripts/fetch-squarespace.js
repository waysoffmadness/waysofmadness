#!/usr/bin/env node
"use strict";

/**
 * Fetch Squarespace page HTML and extract the main <article> content.
 * Node version of the original Python helper (Python isn't available in this env).
 */

const fs = require("fs/promises");
const path = require("path");

const BASE_URL = "https://www.naderbahsoun.com";

const PAGES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  work: "/work",
  "co-creations": "/co-creations",
  xprints: "/xprints",
  contact: "/contact",
  "archive-x": "/archive-x",
  "a-la-recherche-de-beyrouth": "/a-la-recherche-de-beyrouth",
  "alternative-beirut": "/alternative-beirut",
  artevolution: "/artevolution",
  bokja: "/bokja",
  "daftar-beirut": "/daftar-beirut",
  fata17: "/fata17",
  "fuel-project": "/fuel-project",
  "i-was-naver": "/i-was-naver",
  "jal-el-bahr": "/jal-el-bahr",
  msafreen: "/msafreen",
  noctiluca: "/noctiluca",
  "shabah-el-rih": "/shabah-el-rih",
  "snakes-and-ladders": "/snakes-and-ladders",
  "southern-birds-project": "/southern-birds-project",
  Stories: "/Stories",
  "the-bleed-zine": "/the-bleed-zine",
  "the-valley-of-sleep": "/the-valley-of-sleep",
  "three-decades-and-a-climax": "/three-decades-and-a-climax",
  "unhearable-voices": "/unhearable-voices",
  "w-adrian-pepe": "/w-adrian-pepe",
  "womena-beirut": "/womena-beirut",
  "womena-sound-of-saudi-3": "/womena-sound-of-saudi-3",
  "zoukak-theatre": "/zoukak-theatre",
};

const ARTICLE_RE = /(<article class="sections"[^>]*>[\s\S]*?<\/article>)/i;
const HEADER_RE = /(<header[^>]*>[\s\S]*?<\/header>)/i;
const ICONS_RE = /(<svg[^>]*data-usage="social-icons-svg"[^>]*>[\s\S]*?<\/svg>)/i;

const OUTPUT_DIR = path.join(process.cwd(), "content", "squarespace");

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (WaysofMadness mirroring script)" },
  });
  if (!res.ok) {
    throw new Error(`${url} -> ${res.status} ${res.statusText}`);
  }
  return res.text();
}

async function saveFile(filename, content) {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, filename);
  await fs.writeFile(filePath, content, "utf8");
  console.log(`Saved ${filePath}`);
}

async function fetchHeaderAndIcons() {
  const html = await fetchText(BASE_URL);
  const headerMatch = HEADER_RE.exec(html);
  const iconsMatch = ICONS_RE.exec(html);
  if (headerMatch) await saveFile("header.html", headerMatch[1].trim());
  if (iconsMatch) await saveFile("icons.html", iconsMatch[1].trim());
}

async function main() {
  await fetchHeaderAndIcons();

  for (const [name, pathSuffix] of Object.entries(PAGES)) {
    const url = `${BASE_URL}${pathSuffix}`;
    try {
      const html = await fetchText(url);
      const match = ARTICLE_RE.exec(html);
      if (!match) {
        console.warn(`No <article> found for ${url}`);
        continue;
      }
      await saveFile(`${name}.html`, match[1].trim());
    } catch (err) {
      console.warn(`Failed to fetch ${url}: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
