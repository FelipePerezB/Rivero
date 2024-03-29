export default async function getTemplate(
  access_token: string,
  templateId: string
) {
  console.log(templateId);
  const endpoint = `https://api.aspose.cloud/v5.0/omr/GenerateTemplate/GetGenerateTemplate?id=${templateId}`;

  const data = await fetch(endpoint, {
    // cache: "force-cache"
    next: { revalidate: 1800 },
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());

  console.log(data);
  return { data };
}
