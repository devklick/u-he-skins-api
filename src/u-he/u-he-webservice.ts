import { SkinItem } from "./u-he-webservice.types";
import { parseUheSkinsHtml } from "./u-he-webservice.util";

const urls = {
  skins: "https://u-he.com/PatchLib/skins.html",
} as const;

export async function getSkins(): Promise<Array<SkinItem>> {
  const response = await fetch(urls.skins);
  const html = await response.text();
  return await parseUheSkinsHtml(html);
}
