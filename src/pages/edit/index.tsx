/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "@styles/Edit.module.css";
import Layout from "src/layout/Layout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfigButton from "@components/ConfigButton";
import { useRouter } from "next/router";
import DocCard from "@components/DocCard";
import Link from "next/link";

export default function EditPage() {
  const router = useRouter();

  const makeRandomId = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const [savedDocs, setSavedDocs] = useState<any[]>([]);

  useEffect(() => {
    const docs = []
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      console.log(index)
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
        docs.push(newDoc)

      }
    }
    setFilteredDocs([...docs]);
    // savedDocs.push(docs);
  }, []);

  const [filteredDocs, setFilteredDocs] = useState(savedDocs);
  const data = [...savedDocs]

  // console.log(savedDocs)
  return (
    <Layout>
      <h1>Documentos</h1>
      <label className={styles["search-container"]}>
        <input
          onChange={({ target }) => {;
            setFilteredDocs(
              data?.filter((component) =>
                component?.options?.title
                  ?.toUpperCase()
                  ?.includes(target.value.toUpperCase())
              )
            );
          }}
          className={styles.search}
          placeholder="Búsqueda..."
        />
      </label>
      <ul className={styles.documents}>
        {filteredDocs.map((doc) => (
          <>
            {doc?.options?.title && (
              <Link
                key={doc?.options?.title + "-save-doc"}
                href={"/edit/" + doc?.options?.externalId}
              >
                <DocCard doc={doc} />
              </Link>
            )}
          </>
        ))}
      </ul>
      <ConfigButton
        callback={() => {
          const newId = makeRandomId(32);
          router.push("edit/" + newId);
        }}
        icon={faPlus}
      />
    </Layout>
  );
}
