import { type NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; sign: string }> },
) {
  const { type, sign } = await params;
  return proxyGet(request, `/api/v1/horoscopes/${type}/${sign}`);
}
