// curl --location 'https://api.aspose.cloud/v5.0/omr/RecognizeTemplate/GetRecognizeTemplate?id=85bc0ca8-a76e-44f6-a7a3-e6263f7e24ee' \
// --header 'Accept: text/plain' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...doQ6a6Nt2JlbO3fEGg'

export default async function recognizeResults(
  access_token: string,
  id: string
) {
  const endpoint = `https://api.aspose.cloud/v5.0/omr/RecognizeTemplate/GetRecognizeTemplate?id=${id}`;
  const res = await fetch(endpoint, {
    // cache: "no-store",
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());

  return res;
}
