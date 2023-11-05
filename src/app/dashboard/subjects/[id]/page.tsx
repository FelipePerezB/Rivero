import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import { Privacity } from "@prisma/client";
import React from "react";
import DeleteBtn from "src/app/components/admin/delete-btn/delete-btn";
import UpdateForm from "src/app/components/admin/update-form/update-form";
import ItemsBox from "src/app/components/items-box/items-box";
import SearchModal from "src/app/components/modal/search-modal";
import { NoteWithFile } from "src/app/subjects/models/note";
import api from "src/app/utils/api";
import CreateEvaluationBtn from "./[topic]/components/create-evaluation-btn/create-evaluation-btn";

export default async function SubjectDashboardPage({
  searchParams,
  params: { id: subject },
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  const { data: evaluations } = (await api(
    `notes/evaluations?subject=${subject}`
  )) as { data: NoteWithFile[] };
  // const { subjects } = (await api(`subjects`, {}, ["subjects"])) as {
  //   subjects: Subject[];
  // };
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Evaluaciones</h2>
        <CreateEvaluationBtn subject={String(subject)} />
      </div>
      <ItemsBox>
        {evaluations?.map(({ File: { id, name } }) => (
          <NavigationCard
            key={`evaluation-${id}`}
            href={`?modal=modify&id=${id}&name=${name}`}
          >
            {name}
          </NavigationCard>
        ))}
      </ItemsBox>
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
            <DeleteBtn endpoint={`notes/${searchParams?.id}`} size="md" />
          }
        />
      </SearchModal>
      {/* <Toaster /> */}
    </>
  );
}
