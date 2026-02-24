#!/usr/bin/env python3
"""Fetch Squarespace page HTML and extract the main <article> content."""
from __future__ import annotations

import pathlib
import re
import sys
import urllib.request

BASE_URL = "https://www.naderbahsoun.com"

PAGES = {
    "home": "/",
    "about": "/about",
    "projects": "/projects",
    "work": "/work",
    "co-creations": "/co-creations",
    "xprints": "/xprints",
    "contact": "/contact",
    "archive-x": "/archive-x",
    "a-la-recherche-de-beyrouth": "/a-la-recherche-de-beyrouth",
    "alternative-beirut": "/alternative-beirut",
    "artevolution": "/artevolution",
    "bokja": "/bokja",
    "daftar-beirut": "/daftar-beirut",
    "fata17": "/fata17",
    "fuel-project": "/fuel-project",
    "i-was-naver": "/i-was-naver",
    "jal-el-bahr": "/jal-el-bahr",
    "msafreen": "/msafreen",
    "noctiluca": "/noctiluca",
    "shabah-el-rih": "/shabah-el-rih",
    "snakes-and-ladders": "/snakes-and-ladders",
    "southern-birds-project": "/southern-birds-project",
    "Stories": "/Stories",
    "the-bleed-zine": "/the-bleed-zine",
    "the-valley-of-sleep": "/the-valley-of-sleep",
    "three-decades-and-a-climax": "/three-decades-and-a-climax",
    "unhearable-voices": "/unhearable-voices",
    "w-adrian-pepe": "/w-adrian-pepe",
    "womena-beirut": "/womena-beirut",
    "womena-sound-of-saudi-3": "/womena-sound-of-saudi-3",
    "zoukak-theatre": "/zoukak-theatre",
}

ARTICLE_RE = re.compile(r"(<article class=\"sections\"[^>]*>.*?</article>)", re.S)
HEADER_RE = re.compile(r"(<header[^>]*>.*?</header>)", re.S)
ICONS_RE = re.compile(r"(<svg[^>]*data-usage=\"social-icons-svg\"[^>]*>.*?</svg>)", re.S)



def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read().decode("utf-8", "ignore")


def main() -> int:
    output_dir = pathlib.Path(__file__).resolve().parent.parent / "content" / "squarespace"
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        base_html = fetch(BASE_URL)
        header_match = HEADER_RE.search(base_html)
        icons_match = ICONS_RE.search(base_html)
        if header_match:
            (output_dir / "header.html").write_text(
                header_match.group(1).strip(), encoding="utf-8"
            )
            print(f"Saved {output_dir / 'header.html'}")
        else:
            print("No <header> found for base URL")
        if icons_match:
            (output_dir / "icons.html").write_text(
                icons_match.group(1).strip(), encoding="utf-8"
            )
            print(f"Saved {output_dir / 'icons.html'}")
        else:
            print("No social icons <svg> found for base URL")
    except Exception as exc:
        print(f"Failed to fetch base URL for header/icons: {exc}")

    for name, path in PAGES.items():
        url = f"{BASE_URL}{path}"
        try:
            html = fetch(url)
        except Exception as exc:
            print(f"Failed to fetch {url}: {exc}")
            continue

        match = ARTICLE_RE.search(html)
        if not match:
            print(f"No <article> found for {url}")
            continue

        content = match.group(1).strip()
        dest = output_dir / f"{name}.html"
        dest.write_text(content, encoding="utf-8")
        print(f"Saved {dest}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
