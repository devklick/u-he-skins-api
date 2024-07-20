export const config = {
  runtime: "nodejs",
};

export function GET(request: Request) {
  return new Response(`Skins says hello from ${process.env.VERCEL_REGION}`);
}
