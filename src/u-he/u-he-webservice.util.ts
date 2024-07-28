import * as cheerio from "cheerio";

import { SkinItem, SrcItem } from "../types/response-types";

const baseImgUrl = "https://u-he.com/PatchLib/";

const knownDeviceUrlMap = new Map([
  ["A.C.E.", "https://u-he.com/products/ace/"],
  ["Bazille", "https://u-he.com/products/bazille/"],
  ["Diva", "https://u-he.com/products/diva/"],
  ["Hive", "https://u-he.com/products/hive/"],
  ["Hive 2", "https://u-he.com/products/hive/"],
  ["MFM2", "https://u-he.com/products/mfm2/"],
  ["Podolski", "https://u-he.com/products/podolski/"],
  ["Presswerk", "https://u-he.com/products/presswerk/"],
  ["Repro", "https://u-he.com/products/repro/"],
  ["Repro-1", "https://u-he.com/products/repro/"],
  ["Triple Cheese", "https://u-he.com/products/triplecheese/"],
  ["Tyrell N6", "https://u-he.com/products/tyrelln6/"],
  ["Uhbik-A/D", "https://u-he.com/products/uhbik/"],
  ["Zebra²", "https://u-he.com/products/zebra-legacy/"],
  ["Zebralette", "https://u-he.com/products/zebralette/"],
]);

export async function parseUheSkinsHtml(
  html: string
): Promise<Array<SkinItem>> {
  const $ = cheerio.load(html, { decodeEntities: true });
  const items = Array<SkinItem>();

  // find the body of the table and process each row within it
  $("tbody")
    .children("tr")
    .each((_, elem) => {
      const row = parseRow($, elem);
      if (row) items.push(row);
    });

  return items;
}

function parseRow(
  $: cheerio.CheerioAPI,
  elem: cheerio.Element
): SkinItem | null {
  // Get the header and data from within the row
  const children = $(elem).children("th,td");
  if (!children.length) return null;

  const name = $(children[0]).text();
  if (!name) throw new Error(`No name found`);

  const author = parseAuthor($, $(children[1]));
  if (!author) throw new Error(`No ${author} found`);

  const device = parseDevice($, $(children[2]));
  if (!device) throw new Error(`No ${device} found`);

  // TODO: some of the descriptions contain markup for
  // preview and download links. Consider trying to extract this
  // markup and add it to the previews or downloads array
  const description = $(children[3]).text();
  if (!description) throw new Error(`No ${description} found`);

  const previews = parseSrcItems($, $(children[4]));
  if (!previews) throw new Error(`No ${previews} found`);

  const downloads = parseSrcItems($, $(children[5]));
  if (!downloads) throw new Error(`No ${downloads} found`);

  return {
    name,
    author,
    device,
    previews,
    description,
    downloads,
  };
}

function parseAuthor(
  $: cheerio.CheerioAPI,
  content: cheerio.Cheerio<cheerio.Element>
): SrcItem {
  const items = parseSrcItems($, content);
  if (items.length !== 1)
    throw new Error(
      `Expected to find exactly one author, found ${items.length}`
    );
  return items[0];
}

function parseDevice(
  $: cheerio.CheerioAPI,
  content: cheerio.Cheerio<cheerio.Element>
): SrcItem {
  const name = $(content).text();
  const url = knownDeviceUrlMap.get(name);
  return { name, url };
}

function parseSrcItems(
  $: cheerio.CheerioAPI,
  content: cheerio.Cheerio<cheerio.Element>
): Array<SrcItem> {
  if (!content) throw new Error("No src items content");
  const result = Array<SrcItem>();
  $(content)
    .children("a")
    .each((_, e) => {
      let url = $(e).attr("href");
      if (!url?.startsWith("http")) url = baseImgUrl + url;
      const name = $(e).text();
      result.push({ name, url });
    });

  // If there were no anchor tags, lets just use the text value as the name
  if (!result.length) {
    result.push({ name: $(content).text(), url: undefined });
  }

  return result;
}
