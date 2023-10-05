/* eslint-disable react-hooks/exhaustive-deps */
import 'server-only'
import { GetFileDocument, GetFileQuery, Privacity } from "src/gql/graphql";
// import { client } from "src/service/client";
export const getDefaultFile = (id: string) => {
  return {
    file: {
      externalId: id,
      title: "Nuevo documento",
      privacity: Privacity.Private,
      content: {
        type: "document",
        options: {
          children: [
            {
              type: "page",
              options: {
                number: 1,
                children: [{ type: "title", options: { text: "AAA" } }],
              },
            },
          ],
        },
      },
    },
  };
};

const fetchFile = async (id: string) => {
  // const res = await fetch(`${process.env.BACKEND_URL}/files/${id}`);

  // console.log(res);
  // if (!res.ok) throw new Error("Failed to fetch data");
  // const contentLength = res.headers.get("Content-Length");
  // if (contentLength && contentLength !== "0") {
  //   const data = await res.json();
  //   console.log(data);
  // } else return null;
};

export default async function getFile(id: string) {
  // const localFile = localStorage.getItem("doc-" + id);
  const defaultFile = getDefaultFile(id);
  // const dbFile = await fetchFile(id);
  // if(dbFile) return dbFile
  return defaultFile
  // else return defaultFile
}
