import SubjectsCards from "@components/containers/subjectsCards/SubjectsCards";
import React from "react";
import { GetSubjectsQuery } from "src/gql/graphql";
import ItemsBox from "../components/items-box/items-box";
import DocsCards from "@components/containers/docsCards/docs-cards";
import Link from "next/link";
import NavSidebar from "../components/navar/nav-sidebar";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: {
    modal: string;
  };
}) {
  console.log(searchParams);
  const subjects = {
    subjects: [
      {
        color: "#ec405d",
        id: "1",
        name: "Matemática M1",
        Topics: [
          { name: "Números" },
          { name: "Álgebra" },
          { name: "Geometría" },
          { name: "Estadística" },
        ],
      },
      { color: "#26DE79", id: "1", name: "Lenguaje" },
      { color: "#2f3334", id: "1", name: "Historia" },
      { color: "red", id: "1", name: "Matemática M2" },
      { color: "#58a6ff", id: "1", name: "Ciencias" },
    ],
  } as GetSubjectsQuery;

  return (
    <>
      <h2 className={"text-2xl font-bold pb-0.5"}>Asignaturas</h2>
      <ItemsBox>
        <SubjectsCards subjecsData={subjects} />
      </ItemsBox>
      <h2 className={"text-2xl font-bold pb-0.5 pt-1"}>Mis documentos</h2>
      <ItemsBox size="sm">
        <DocsCards />
      </ItemsBox>
      {/* <NavSidebar/> */}
    </>
  );
}
