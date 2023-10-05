/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import Button from "@components/Button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetFileDocument, Privacity } from "src/gql/graphql";
import { DocumentJSON } from "src/models/document.model";

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
                children: [],
              },
            },
          ],
        },
      },
    },
  };
};

const getToast = (
  setFile: React.Dispatch<React.SetStateAction<DocumentJSON>>,
  dbFile: DocumentJSON,
  localFile: string
) =>
  toast((t) => (
    <div>
      <span>Se encontraron 2 versiones diferentes</span>
      <span className="flex gap-2">
        <Button
          onClick={() => {
            setFile(dbFile);
            toast.dismiss(t.id);
          }}
        >
          Sincronizar
        </Button>
        <Button
          color="white"
          onClick={() => {
            setFile(JSON.parse(localFile));
            toast.dismiss(t.id);
          }}
        >
          Usar versión local
        </Button>
      </span>
    </div>
  ));

export default function useGetFile(id: string) {
  const { data, error } = useQuery(GetFileDocument, {
    variables: {
      where: { externalId: id },
    },
  });
  const defaultFile = getDefaultFile(id);
  const [file, setFile] = useState<DocumentJSON>(defaultFile);

  useEffect(() => {
    const localFile = localStorage.getItem("doc-" + id);
    if (localFile) setFile(JSON.parse(localFile));
    if (!data?.file?.externalId || error) return;
    const dbFile = {
      file: { ...data.file, content: JSON.parse(data.file.content) },
    };
    if (!localFile) toast.success("Documento cargado correctamente");
    else if (
      JSON.stringify(JSON.parse(localFile).file.content) !==
      JSON.stringify(dbFile.file.content)
    )
      getToast(setFile, dbFile, localFile);
    else {
      toast.success("Documento cargado correctamente");
    }
  }, [data, id]);
  return file;
}
