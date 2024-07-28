import axios from "axios";
import { SkinItem } from "../types/response-types";
import { parseUheSkinsHtml } from "./u-he-webservice.util";

const urls = {
  skins: "https://u-he.com/PatchLib/skins.html",
} as const;

export async function getSkins(): Promise<Array<SkinItem>> {
  const response = await axios.get(urls.skins);
  const html = response.data.toString("utf-8");
  return await parseUheSkinsHtml(html);
}
