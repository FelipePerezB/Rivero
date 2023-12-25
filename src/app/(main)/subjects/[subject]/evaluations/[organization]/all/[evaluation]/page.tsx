import Button from "@components/common/buttons/button/button";
import {
  faFileArrowDown,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NoteWithFile } from "src/app/(main)/subjects/models/note";
import api from "src/utils/api";
import GroupsLinks from "../components/groups-links";
import ScoresStats from "../../[group]/[evaluation]/components/scores-stats/scores-stats";

export default async function AllGroupsEvaluationPage({
  params: { evaluation, subject, organization },
}: {
  params: {
    organization: string;
    subject: string;
    evaluation: string;
  };
}) {
  const { data: note } = (await api("notes/" + evaluation, {}, [
    "evaluations/" + subject,
  ])) as { data: NoteWithFile[] };
  const { File } = note[0] ?? {};
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl">{File?.name}</h1>
        <Button>
          Generar reporte
          <FontAwesomeIcon className="max-h-4 w-4" icon={faFileArrowDown} />
        </Button>
      </div>
      <GroupsLinks
        evaluation={evaluation}
        subject={subject}
        organization={organization}
      />
      <ScoresStats organization={organization} evaluation={evaluation} />
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
