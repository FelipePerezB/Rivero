export default async function api(
  endpoint: string,
  init?: RequestInit,
  tags?: string[]
) {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${url}/api/${endpoint}`, {
    ...init,
    next: {
      tags,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
