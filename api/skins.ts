import { getSkins } from "../src/u-he/u-he-webservice";

const cacheDuration = 1000 * 60 * 60 * 24 * 7; // 1 week

export async function GET(request: Request) {
  const skins = await getSkins();
  return new Response(JSON.stringify(skins), {
    headers: [["Cache-Control", `public, s-maxage=${cacheDuration}`]],
  });
}
