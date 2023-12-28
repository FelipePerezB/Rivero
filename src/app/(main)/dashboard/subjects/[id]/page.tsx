import { Privacity } from "@prisma/client";
import React from "react";
import DeleteBtn from "@components/admin/delete-btn/delete-btn";
import UpdateForm from "@components/admin/update-form/update-form";
import SearchModal from "@components/modal/search-modal";
import api from "src/utils/api";
// import CreateEvaluationBtn from "./[topic]/components/create-evaluation-btn/create-evaluation-btn";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";

export default async function SubjectDashboardPage({
  searchParams,
  params: { id: subject },
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  // const { data: evaluations } = (await api(
  //   `notes/evaluations?subject=${subject}`
  // )) as { data: NoteWithFile[] };
  // const { subjects } = (await api(`subjects`, {}, ["subjects"])) as {
  //   subjects: Subject[];
  // };
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Evaluaciones</h2>
        {/* <CreateEvaluationBtn subject={String(subject)} /> */}
      </div>
      {/* <ItemsBox>
        {evaluations?.map(({ File: { id, name } }) => (
          <NavigationCard
            key={`evaluation-${id}`}
            href={`?modal=modify&id=${id}&name=${name}`}
          >
            {name}
          </NavigationCard>
        ))}
      </ItemsBox> */}
      <SearchModal
        title="Modificar evaluación"
        searchParams={searchParams}
        id="modify"
      >
        <UpdateForm
          endpoint={`files/${searchParams?.id}`}
          id={String(searchParams?.id)}
          name={searchParams?.name}
          privacity={(Privacity.PRIVATE as Privacity) ?? undefined}
          secondaryBtn={
            <DeleteBtn endpoint={`lessons/${searchParams?.id}`} size="md" />
          }
        />
      </SearchModal>
      {/* <Toaster /> */}
    </>
  );
}
