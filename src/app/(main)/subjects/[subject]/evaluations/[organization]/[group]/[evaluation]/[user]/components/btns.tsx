import { currentUser } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import { faChartSimple, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import React from "react";
import RecognizeFileForm from "./recognize-file-form";

export default async function SendFileForm({
  evaluation,
  user: userId,
}: {
  user: string;
  evaluation: string;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  return role && role !== Role.STUDENT ? (
    <>
      <RecognizeFileForm userId={userId} evaluationId={evaluation}>
        <div className="flex md:justify-between md:flex-row flex-col gap-sm">
          <p>Sube una foto de la hoja de respuesta:</p>
          <div className="flex gap-md">
            <div className="relative w-28 h-full inline-block before:bg-blue-500 before:text-white before:flex before:items-start before:justify-center before:[content:'Seleccionar'] before:absolute before:top-0 before:left-0 before:rounded-sm before:w-full before:h-full before:pt-0.5 before:shadow">
              <input
                type="file"
                name="image"
                accept="png"
                className="opacity-0 w-full h-full inline-block"
              />
            </div>
            <Button color="white" type="submit">
              Enviar imagen
              <FontAwesomeIcon icon={faPaperPlane} className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </RecognizeFileForm>
    </>
  ) : (
    <>
      <div className="flex md:justify-between md:flex-row flex-col gap-sm">
        <p>Revisa tus resultados de la evaluación:</p>
        <Button href="#stats">
          Estadisticas
          <FontAwesomeIcon icon={faChartSimple} className="h-3 w-3" />
        </Button>
      </div>
    </>
  );
}
