import { JsonResponse } from "../src/types/response-types";
import { getSkins } from "../src/u-he/u-he-webservice";

export async function GET(_request: Request) {
  const skins = await getSkins();
  return new JsonResponse(skins);
}
