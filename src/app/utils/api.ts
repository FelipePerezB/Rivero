export default async function api(endpoint: string, init?: RequestInit) {
  // console.log(init);
  const res = await fetch("http://localhost:3000/api/" + endpoint, {
    // cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
