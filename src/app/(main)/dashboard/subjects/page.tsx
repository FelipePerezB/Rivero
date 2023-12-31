import React from "react";
import api from "src/utils/api";
import { Toaster } from "react-hot-toast";
import { SubjectWithTopic } from "src/app/(main)/subjects/models/subject";
import ItemsBox from "@components/containers/items-box/items-box";
import NavigationCard from "@components/cards/NavigationCard";
import capFirst from "src/utils/capFirst";
import SearchModal from "@components/modal/search-modal";
import UpdateForm from "@components/admin/update-form/update-form";
import { Privacity } from "@prisma/client";
import CreateBtnWithName from "@components/admin/create-btn/create-btn-with-name";


export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { subjects } = (await api("subjects", {}, ["subjects"])) as {
    subjects: SubjectWithTopic[];
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h2 className={"text-2xl font-bold pb-0.5"}>Asignaturas</h2>
        <CreateBtnWithName endpoint="subjects"/>
      </div>
      <ItemsBox>
        {subjects?.map(({ name, id, Topics , privacity}) => {
          const firstTopic = Topics?.at(0)?.id;
          return (
            <NavigationCard
              key={"subject-card-" + id}
              href={
                firstTopic
                  ? `subjects/${id}/${firstTopic}`
                  : `?modal=modify&id=${id}&name=${name}&privacity=${privacity}`
              }
            >
              <div className="flex gap-2.5 items-center">
                <span>{capFirst(name)}</span>
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
          // id={searchParams?.id}
          name={searchParams?.name}
          privacity={(searchParams?.privacity as Privacity) ?? undefined}
          // secondaryBtn={<CreateTopicBtn subjectId={Number(searchParams?.id)} />}
        />
      </SearchModal>
      <Toaster />
    </>
  );
}
