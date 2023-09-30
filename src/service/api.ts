const api = async (url: string, init?: RequestInit) =>
  await fetch(`https://rivero-backend.vercel.app/${url}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
export default api;
