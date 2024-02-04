export default async function getToken() {
  const clientId = process.env.ASPOSE_CLIENT_ID;
  const clientSecret = process.env.ASPOSE_CLIENT_SECRET;
  console.log(clientId, clientSecret);
  if (!clientId || !clientSecret) return { data: {} };
  const data = await fetch("https://api.aspose.cloud/connect/token", {
    method: "POST",
    next: {
      revalidate: 1800,
    },

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  }).then((data) => data.json());

  return { data };
}
