import { type NextRequest } from "next/server";
import { proxyPost } from "@/lib/proxy";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const apiPath = `/api/v1/calculate/${path.join("/")}`;
  return proxyPost(request, apiPath);
}
