import { auth } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import {
  faFileArrowDown,
  faFileExcel,
  faKey,
  faList,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { title } from "process";
import React, { Suspense } from "react";
import OptionsInput from "src/app/documents/edit/components/edit-wraper/components/inputs/options";
import SearchModal from "@components/modal/search-modal";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import api from "src/utils/api";
import { Toaster } from "react-hot-toast";
import { Score } from "@prisma/client";
// import GroupsList from "./[group]/components/groups-list";
import LargeSkeleton from "@components/layout/loading-skeleton/large-skeleton/large-skeleton";
import ScoresTable from "./components/scores-table/scores-table";
import GroupsList from "../components/groups-list";
import ScoresStats from "./components/scores-stats/scores-stats";
import RowSkeleton from "@components/layout/loading-skeleton/row-skeleton/row-skeleton";
import TableSkeleton from "@components/layout/loading-skeleton/table-skeleton/table-skeleton";
import AddScoreForm from "../components/form";
import SectionTitle from "@components/common/titles/section-title";
import Section from "@components/containers/section";
import OrganizationProtect from "@components/admin/protect/organization-protect";

export default async function EvaluationPage({
  searchParams,
  params: { evaluation, group, organization, subject },
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  console.log(evaluation);
  const { data: lesson } = (await api("lessons/" + evaluation, {}, [
    "evaluations/" + subject,
  ])) as { data: LessonWithFile };

  const { File } = lesson ?? {};

  return (
    <OrganizationProtect organizationId={organization}>
      <Section>
        <div className="flex flex-col md:flex-row  gap-sm  md:justify-between md:items-center mb-2">
          <SectionTitle
            title={File?.name}
            subTitle="Evalua los conocimientos de la asignatura"
          />
          <div className="flex gap-2">
            <Button href={"/documents/download/" + evaluation}>
              Descargar
              <FontAwesomeIcon className="h-3 w-3" icon={faFileArrowDown} />
            </Button>
            <Button
              color="white"
              href={"/documents/download/check/" + evaluation}
            >
              Claves
              <FontAwesomeIcon className="h-3 w-3" icon={faFileExcel} />
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <Suspense fallback={<LargeSkeleton />}>
          <GroupsList
            customPath={`/subjects/${subject}/evaluations/${organization}/[key]/${evaluation}`}
            group={group}
            organization={organization}
          />
        </Suspense>
        {group !== "all" && (
          <Suspense fallback={<TableSkeleton />}>
            <ScoresTable
              organization={organization}
              evaluation={evaluation}
              group={group}
            />
          </Suspense>
        )}
        <Suspense
          fallback={
            <section className="grid md:grid-cols-2 gap-4 p-6">
              <RowSkeleton />
              <RowSkeleton />
            </section>
          }
        >
          <ScoresStats
            organization={organization}
            evaluation={evaluation}
            group={group}
          />
        </Suspense>
      </Section>
      <SearchModal
        id="new-score"
        title="Nuevo puntaje"
        searchParams={searchParams}
      >
        <AddScoreForm id={searchParams?.id} fileId={evaluation} />
      </SearchModal>
    </OrganizationProtect>
  );
}
