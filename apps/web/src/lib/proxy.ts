import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function proxyGet(
  request: NextRequest,
  apiPath: string,
): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${API_URL}${apiPath}${searchParams ? `?${searchParams}` : ""}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function proxyPost(
  request: NextRequest,
  apiPath: string,
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}${apiPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json(
        { error: "Backend returned non-JSON response", status: res.status },
        { status: 502 },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Proxy error" },
      { status: 500 },
    );
  }
}
