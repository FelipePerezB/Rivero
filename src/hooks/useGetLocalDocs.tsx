'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { DocumentJSON } from "src/models/document.model";

export default function useGetLocalDocs(number: number = 10) {
  const [savedDocs, setSavedDocs] = useState<DocumentJSON[]>([]);
  useEffect(() => {
    if (savedDocs?.length) return;
    const docs = [];
    for (
      let index = 0;
      index < localStorage.length && docs.length < number;
      index++
    ) {
      const key = localStorage.key(index);
      const doc = key?.includes("document-") && localStorage.getItem(key);
      if (doc) {
        const jsonDoc = JSON.parse(doc);
        const newDoc = {
          ...jsonDoc,
          file: {
            ...jsonDoc.file,
            content: {
              ...jsonDoc.file.content,
              options: {
                ...jsonDoc.file.content.options,
                children: [jsonDoc?.file?.content.options?.children[0]],
              },
            },
          },
        };
        const isSaved = savedDocs
          .map((doc) => doc.file.externalId)
          .includes(newDoc.file.externalId);
        if (isSaved) return;
        docs.push(newDoc);
      }
    }
    setSavedDocs([...docs]);
  }, []);
  return savedDocs;
}
