import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { Privacity } from "@prisma/client";
import React, { useState } from "react";
import ClientModal from "@components/modal/client-modal";
import { LessonWithComponent } from "src/app/documents/edit/models/component";
import { hydrateJSON } from "src/app/documents/edit/utils/hydrateJSON";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";
// import OptionsInput from "@components/form/OptionsInput/OptionsInput";
import Options from "@components/common/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import OptionsInput from "src/app/documents/edit/components/edit-wraper/components/inputs/options";
import RadioInput from "@components/form/radio-input";

const getOptimizedContent = (settings?: LessonWithComponent["file"]) => {
  if (!settings?.content || typeof settings?.content !== "object")
    return "Error al cargar el documento";
  const fileCopy = JSON.parse(JSON.stringify(settings?.content));
  const optimizedContent = JSON.stringify(removeIdFromObject(fileCopy));
  return optimizedContent;
};

export default function ShareBtn({
  settings,
  setSettings,
}: {
  settings?: LessonWithComponent["file"];
  setSettings: React.Dispatch<
    React.SetStateAction<LessonWithComponent["file"]>
  >;
}) {
  const [state, setState] = useState(false);
  const options = ["Configuración"];
  const [option, setOption] = useState(options[0]);

  const id = settings?.externalId;
  const privacity = settings?.privacity;
  return (
    <>
      <div
        onClick={() => setState(true)}
        className=" cursor-pointer flex items-center gap-1"
      >
        <Item title="Share">
          <FontAwesomeIcon className="flex items-center" icon={faShare} />
        </Item>
      </div>
      <ClientModal setState={setState} state={state} title="Compartir">
        <Options {...{ setOption, option, options }}></Options>
        {option === "Configuración" && (
          <>
            <RadioInput
              value={privacity}
              label="Privacidad"
              onChange={(privacity) => {
                setSettings((settings) => ({
                  ...settings,
                  privacity,
                }));
              }}
              name="privacity"
              options={Object.values(Privacity)}
            />
            <StandardInput
              value={`https:/rivero.academy/view/${id}`}
              attrs={{ readOnly: true }}
              name="Link del documento"
            />
            <StandardInput
              value={getOptimizedContent(settings)}
              name="Código del documento"
              dataKey="content"
              onBlur={(content) =>
                setSettings((settings) => ({
                  ...settings,
                  content: hydrateJSON(JSON.parse(content)),
                }))
              }
            />
            <Button onClick={() => print()}>Descargar</Button>
          </>
        )}
      </ClientModal>
    </>
  );
}
