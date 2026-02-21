import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/proxy";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return proxyGet(request, `/api/v1/share/${slug}`);
}
