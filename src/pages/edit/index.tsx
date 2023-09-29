/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import styles from "@styles/Edit.module.css";
import Layout from "src/layout/Layout";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import ConfigButton from "@components/ConfigButton";
import { useRouter } from "next/router";
import DocCard from "@components/DocCard";
import Link from "next/link";
import Recomendations from "@components/Recomendations";
import useGetLocalDocs from "src/hooks/useGetLocalDocs";
import generateRandomId from "src/utils/generateRandomId";
import DocsCards from "@components/containers/docsCards/docs-cards";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import Button from "@components/Button";
import Options from "@components/Options";
import CircleButton from "@components/button/circle-button/circle-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditPage() {
  const router = useRouter();
  const savedDocs = useGetLocalDocs();
  const [filteredDocs, setFilteredDocs] = useState(savedDocs);
  const options = ["Apuntes", "Resumenes", "Prácticas", "Evaluaciones"];
  // const routes
  const [option, setOption] = useState("Apuntes");
  const routes = {
    Apuntes: "note",
    Resumenes: "summarie",
    Prácticas: "practice",
    Evaluaciones: "evaluation",
  };
  const createDoc = () => {
    router.push(`/docs/edit/${generateRandomId(32)}`);
  };

  return (
    <Layout title="Crear documentos">
      <div className="sticky z-10 left-0 top-12  flex gap-4 items-center bg-[var(--background-color)] border-b">
        <CircleButton>
          <FontAwesomeIcon onClick={createDoc} icon={faPlus} />
        </CircleButton>
        <Options {...{ option, setOption, options }}></Options>
      </div>
      {/* <div>
      <StandardInput name="Buscar" /> */}
      {/* <label className={styles["search-container"]}>
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
      </label> */}
      <Recomendations>
        <DocsCards docs={savedDocs} />
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
