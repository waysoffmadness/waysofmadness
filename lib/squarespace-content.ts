import path from "path";
import { readFile, readdir } from "fs/promises";

const CONTENT_DIR = path.join(process.cwd(), "content", "squarespace");

const STATIC_PAGE_NAMES = new Set([
  "home",
  "about",
  "projects",
  "co-creations",
  "xprints",
  "contact",
  "header",
  "icons",
]);

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function processSquarespaceHtml(html: string): string {
  return html
    // Remove Squarespace's custom loader attribute that blocks native loading
    .replace(/\s*data-loader="sqs"/gi, "")
    // Remove data-load="false" that prevents loading
    .replace(/\s*data-load="false"/gi, "")
    // Remove sizes="0" which prevents images from loading
    .replace(/\s*sizes="0"/gi, "")
    // Inject video iframes from data-html attributes
    .replace(
      /<div class="sqs-video-wrapper"([^>]*?)data-html="([^"]+)"([^>]*)><\/div>/gi,
      (match, before, dataHtml, after) => {
        const iframe = decodeHtmlEntities(dataHtml);
        return `<div class="sqs-video-wrapper"${before}${after}>${iframe}</div>`;
      }
    );
}

export async function loadSquarespaceHtml(name: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${name}.html`);
    const html = await readFile(filePath, "utf8");
    return processSquarespaceHtml(html);
  } catch {
    return null;
  }
}

export async function listSquarespaceSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_DIR);
    return entries
      .filter((entry) => entry.endsWith(".html"))
      .map((entry) => entry.replace(/\.html$/, ""))
      .filter((entry) => !STATIC_PAGE_NAMES.has(entry))
      .sort();
  } catch {
    return [];
  }
}

export async function loadSquarespaceHeader(): Promise<string | null> {
  return loadSquarespaceHtml("header");
}

export async function loadSquarespaceIcons(): Promise<string | null> {
  return loadSquarespaceHtml("icons");
}
