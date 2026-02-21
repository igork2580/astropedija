const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const INTERNAL_API_BASE = process.env.API_URL || API_BASE;

function getBaseUrl(isServer: boolean): string {
  return isServer ? INTERNAL_API_BASE : "";
}

export async function apiGet<T>(path: string, isServer = false): Promise<T> {
  const base = isServer ? INTERNAL_API_BASE : "";
  const url = isServer ? `${base}${path}` : `/api${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown, isServer = false): Promise<T> {
  const url = isServer ? `${INTERNAL_API_BASE}${path}` : `/api${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
