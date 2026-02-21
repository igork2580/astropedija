import { type NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sign1: string; sign2: string }> },
) {
  const { sign1, sign2 } = await params;
  return proxyGet(request, `/api/v1/charts/compatibility/${sign1}/${sign2}`);
}
