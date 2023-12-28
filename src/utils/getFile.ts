/* eslint-disable react-hooks/exhaustive-deps */
import { Privacity } from "@prisma/client";
import "server-only";
// import { client } from "src/service/client";
export const getDefaultFile = (id: string) => {
  return {
    file: {
      externalId: id,
      title: "Nuevo documento",
      privacity: Privacity.PRIVATE,
      content: {
        type: "document",
        options: {
          children: [
            {
              type: "section",
              options: {},
            },
          ],
        },
      },
    },
  };
};

const fetchFile = async (id: string) => {
  // const res = await fetch(`${process.env.BACKEND_URL}/files/${id}`);
  //  
  // if (!res.ok) throw new Error("Failed to fetch data");
  // const contentLength = res.headers.get("Content-Length");
  // if (contentLength && contentLength !== "0") {
  //   const data = await res.json();
  //    
  // } else return null;
};

export default function getFile(id: string) {
  // const localFile = localStorage.getItem("doc-" + id);
  const defaultFile = getDefaultFile(id);
  // const dbFile = await fetchFile(id);
  // if(dbFile) return dbFile
  return defaultFile;
  // else return defaultFile
}
