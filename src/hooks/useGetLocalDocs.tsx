/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useGetLocalDocs(number: number = 10) {
  const [savedDocs, setSavedDocs] = useState<
    {
      type: string;
      options: {
        docId: number;
        externalId: number;
        title: string;
      };
    }[]
  >([]);
  useEffect(() => {
    if (savedDocs?.length) return;
    const docs = [];
    for (
      let index = 0;
      index < localStorage.length && docs.length < number;
      index++
    ) {
      const key = localStorage.key(index);
      const doc = key?.includes("doc-") && localStorage.getItem(key);
      if (doc) {
        const jsonDoc = JSON.parse(doc);
        const newDoc = {
          ...jsonDoc,
          options: {
            ...jsonDoc.options,
            children: [jsonDoc.options.children[0]],
          },
        };
        const isSaved = savedDocs
          .map((doc) => doc.options.externalId)
          .includes(newDoc.options.externalId);
        if (isSaved) return;
        docs.push(newDoc);
      }
    }
    setSavedDocs([...docs]);
  }, []);
  return savedDocs;
}
