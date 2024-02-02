import Button from "@components/common/buttons/button/button";
import {
  faFileArrowDown,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LessonWithFile } from "src/app/(main)/subjects/models/lesson";
import api from "src/utils/api";
import GroupsLinks from "../components/groups-links";
import ScoresStats from "../../[group]/[evaluation]/components/scores-stats/scores-stats";
import Section from "@components/containers/section";
import SectionTitle from "@components/common/titles/section-title/section-title";

export default async function AllGroupsEvaluationPage({
  params: { evaluation, subject, organization },
}: {
  params: {
    organization: string;
    subject: string;
    evaluation: string;
  };
}) {
  const { data: lesssons } = (await api("lessons/" + evaluation, {}, [
    "evaluations/" + subject,
  ])) as { data: LessonWithFile };
  const { File } = lesssons ?? {};
  console.log(File)
  return (
    <>
    <Section>
      <SectionTitle title={File?.name} subTitle="Evalua los conocimientos de la asignatura"/>
   
        {/* <Button>
          Generar reporte
          <FontAwesomeIcon className="max-h-4 w-4" icon={faFileArrowDown} />
        </Button> */}
    </Section>
      <GroupsLinks
        evaluation={evaluation}
        subject={subject}
        organization={organization}
      />
      {/* <ScoresStats organization={organization} evaluation={evaluation} /> */}
      <div className="flex gap-2">
        <Button href={"/documents/download/" + evaluation}>
          Evaluación
          <FontAwesomeIcon className="h-3 w-3" icon={faFileArrowDown} />
        </Button>
        <Button color="white" href={"/documents/download/check/" + evaluation}>
          Claves <FontAwesomeIcon className="h-3 w-3" icon={faFileExcel} />
        </Button>
      </div>
    </>
  );
}
