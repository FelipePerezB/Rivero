/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "@styles/Edit.module.css";
import Layout from "src/layout/Layout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfigButton from "@components/ConfigButton";
import { useRouter } from "next/router";
import DocCard from "@components/DocCard";
import Link from "next/link";
import Recomendations from "@components/Recomendations";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import makeRandomId from "src/utils/getRandomId";

export default function EditPage() {
  const router = useRouter();
  const savedDocs = useGetLocalDocs();
  const [filteredDocs, setFilteredDocs] = useState(savedDocs);

  return (
    <Layout title="Editar">
      <label className={styles["search-container"]}>
        <input
          onChange={({ target }) => {
            setFilteredDocs(
              savedDocs?.filter((component) =>
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
      <Recomendations>
        {savedDocs.map((doc) => (
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
      </Recomendations>
      {/* <ConfigButton
        callback={() => {
          const newId = makeRandomId(32);
          router.push("edit/" + newId);
        }}
        icon={faPlus}
      /> */}
    </Layout>
  );
}
