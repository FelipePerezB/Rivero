"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NoteWithComponent } from "src/app/documents/edit/models/component";
import { DocumentJSON } from "src/models/document.model";

export default function useGetLocalDocs(number: number = 10) {
  const [savedDocs, setSavedDocs] = useState<NoteWithComponent["file"][]>([]);
  useEffect(() => {
    if (savedDocs?.length) return;
    const docs = [];
    for (
      let index = 0;
      index < localStorage.length && docs.length < number;
      index++
    ) {
      const key = localStorage.key(index);
      console.log(key);
      const doc = key?.includes("document-") && localStorage.getItem(key);
      console.log(doc);
      if (doc) {
        let jsonDoc = JSON.parse(doc);
        if (jsonDoc.file) jsonDoc = jsonDoc.file;
        const newDoc = {
          ...jsonDoc,
          content: {
            ...jsonDoc.content,
            options: {
              ...jsonDoc.content.options,
              children: [jsonDoc?.content.options?.children[0]],
            },
          },
        };
        const isSaved = savedDocs
          .map((doc) => doc.externalId)
          .includes(newDoc.externalId);
        if (isSaved) return;
        docs.push(newDoc);
      }
    }
    setSavedDocs([...docs]);
  }, []);
  return savedDocs;
}
