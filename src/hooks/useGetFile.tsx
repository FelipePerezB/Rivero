/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { auth, currentUser, useUser } from "@clerk/nextjs";
import Button from "@components/Button";
import { File, Types } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { NoteWithComponent } from "src/app/documents/edit/models/component";
// import { NoteWithComponent } from "src/app/subjects/edit/models/component";
import api from "src/app/utils/api";
// import toast from "react-hot-toast";
import { GetFileDocument, Privacity } from "src/gql/graphql";
import { DocumentJSON, IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";

export const getDefaultFile = (id: string) => {
  return {
    type: Types.DOCUMENT,
    file: {
      externalId: id,
      name: "Nuevo documento",
      privacity: Privacity.Private,
      content: {
        type: "document",
        id: generateRandomId(IdLenght.sm),
        options: {
          children: [
            {
              type: "section",
              id: generateRandomId(IdLenght.sm),
              options: {
                number: 1,
                children: [
                  {
                    type: "title",
                    id: generateRandomId(IdLenght.sm),
                    options: {
                      text: "Título 1",
                      size: "h1",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  } as NoteWithComponent;
};

// const getToast = (
//   setFile: React.Dispatch<React.SetStateAction<DocumentJSON>>,
//   dbFile: DocumentJSON,
//   localFile: string
// ) =>
//   toast((t) => (
//     <div>
//       <span>Se encontraron 2 versiones diferentes</span>
//       <span className="flex gap-2">
//         <Button
//           onClick={() => {
//             setFile(dbFile);
//             w.dismiss(t.id);
//           }}
//         >
//           Sincronizar
//         </Button>
//         <Button
//           color="white"
//           onClick={() => {
//             setFile(JSON.parse(localFile));
//             toast.dismiss(t.id);
//           }}
//         >
//           Usar versión local
//         </Button>
//       </span>
//     </div>
//   ));

export default async function useGetFile(id: string) {
  let defaultFile = getDefaultFile(id);
  try {
    const { getToken } = auth();
    const token = await getToken();
    const { data } = (await api("files/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })) as { data: File };
    if (data.externalId) {
      defaultFile.file = {
        ...data,
        content: JSON.parse(data.content),
      };
    }
  } catch (error) {
    console.log(error);
  }
  // const [file, setFile] = useState<DocumentJSON>(defaultFile);

  // useEffect(() => {
  //   const localFile = localStorage.getItem("doc-" + id);
  //   if (localFile) setFile(JSON.parse(localFile));
  //   if (!data?.file?.externalId || error) return;
  //   const dbFile = {
  //     file: { ...data.file, content: JSON.parse(data.file.content) },
  //   };
  //   if (!localFile) toast.success("Documento cargado correctamente");
  //   else if (
  //     JSON.stringify(JSON.parse(localFile).file.content) !==
  //     JSON.stringify(dbFile.file.content)
  //   )
  //     getToast(setFile, dbFile, localFile);
  //   else {
  //     toast.success("Documento cargado correctamente");
  //   }
  // }, [data, id]);
  return defaultFile;
}
