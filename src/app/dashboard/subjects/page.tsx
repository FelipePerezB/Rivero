import Button from "@components/Button";
import NavigationCard from "@components/cards/navigationCard/NavigationCard";
import { SubjectWithTopic } from "@components/containers/subjectsCards/SubjectsCards";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Privacity } from "@prisma/client";
import Link from "next/link";
import React from "react";
import UpdateForm from "src/app/components/admin/update-form/update-form";
import ItemsBox from "src/app/components/items-box/items-box";
import SearchModal from "src/app/components/modal/search-modal";
import api from "src/app/utils/api";
import capFirst from "src/utils/capFirst";
import CreateTopicBtn from "./[id]/[topic]/components/create-topic-btn/create-topic-btn";
import CreateSubjectBtn from "./components/create-subject-btn";
import { Toaster } from "react-hot-toast";

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };
  const canEdit = searchParams?.mode === "edit";
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h2 className={"text-2xl font-bold pb-0.5"}>Asignaturas</h2>
        <div className="flex gap-3">
          <CreateSubjectBtn />
          <Button prefetch href={!canEdit ? "?mode=edit" : "?"} color="white">
            {!canEdit ? "Modificar" : "Dejar de modificar"} <FontAwesomeIcon className="h-2.5 w-2.5" icon={faPen} />
          </Button>
        </div>
      </div>
      <ItemsBox>
        {subjects?.map(({ name, id, Topics }) => {
          const firstTopic = Topics?.at(1)?.id;
          return (
            <NavigationCard
              key={"subject-card-" + id}
              href={
                canEdit || !firstTopic
                  ? `?modal=modify&id=${id}&name=${name}`
                  : `subjects/${id}/${firstTopic}`
              }
            >
              <div className="flex gap-2.5 items-center">
                <span>{capFirst(name)}</span>
                {!!canEdit && (
                  <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                )}
              </div>
            </NavigationCard>
          );
        })}
      </ItemsBox>
      <SearchModal
        title="Modificar asignatura"
        searchParams={searchParams}
        id="modify"
      >
        <UpdateForm
          endpoint={`subjects/${searchParams?.id}`}
          id={searchParams?.id}
          name={searchParams?.name}
          privacity={(searchParams.PRIVATE as Privacity) ?? undefined}
          secondaryBtn={<CreateTopicBtn subjectId={Number(searchParams?.id)} />}
        />
      </SearchModal>
      <Toaster />
    </>
  );
}
