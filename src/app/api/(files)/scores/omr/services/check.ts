// curl --location 'https://api.aspose.cloud/v5.0/omr/RecognizeTemplate/PostRecognizeTemplate' \
// --header 'Accept: text/plain' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...doQ6a6Nt2JlbO3fEGg' \
// --data '{
// 	"omrFile": "ewoJIlZlcnNpb24iOiAiMS4wIiwKCSJOYW1lIjogIk15V...CSJJc0dlbmVyYXRlZCI6IHRydWUKfQ==",
// 	"outputFormat": "CSV",
// 	"recognitionThreshold": 35
// }'

export default async function check(
  access_token: string,
  omzFile: string,
  base64Image: string
) {
  const endpoint = `https://api.aspose.cloud/v5.0/omr/RecognizeTemplate/PostRecognizeTemplate`;
  const checkId = await fetch(endpoint, {
    cache: "no-store",
    method: "POST",
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Images: [base64Image],
      omrFile: omzFile,
      outputFormat: "JSON",
      recognitionThreshold: 35,
    }),
  }).then((data) => data.text());

  return checkId;
}
