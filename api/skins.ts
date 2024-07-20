import { getSkins } from "../src/u-he/u-he-webservice";

export async function GET(request: Request) {
  const skins = await getSkins();
  return new Response(JSON.stringify(skins), {
    headers: [["Content-Type", "application/json"]],
  });
}
