import Button from "@components/common/buttons/button/button";
import StandardInput from "@components/form/StandardInput/StandardInput";
import { Privacity } from "@prisma/client";
import React, { useState } from "react";
import ClientModal from "@components/modal/client-modal";
import { NoteWithComponent } from "src/app/documents/edit/models/component";
import { hydrateJSON } from "src/app/documents/edit/utils/hydrateJSON";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";
import OptionsInput from "@components/form/OptionsInput/OptionsInput";
import Options from "@components/common/options";
import { Item } from "./tool-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const getOptimizedContent = (settings?: NoteWithComponent["file"]) => {
  if (!settings?.content) return "Error al cargar el documenti";
  const fileCopy = JSON.parse(JSON.stringify(settings?.content));
  const optimizedContent = JSON.stringify(removeIdFromObject(fileCopy));
  return optimizedContent;
};

export default function ShareBtn({
  settings,
  setSettings,
}: {
  settings?: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
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
        {/* <CircleButton>
        </CircleButton> */}
        {/* <span className="hidden md:inline-block">Share</span> */}
      </div>
      <ClientModal setState={setState} state={state} title="Compartir">
        <Options {...{ setOption, option, options }}></Options>
        {option === "Configuración" && (
          <>
            <OptionsInput
              value={privacity}
              dataKey="privacity"
              onChange={({ privacity }) =>
                setSettings((settings) => ({
                  ...settings,
                  privacity,
                }))
              }
              name="Privacidad"
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
            {/* <Buttons> */}
            <Button onClick={() => print()}>Descargar</Button>
          </>
        )}
      </ClientModal>
    </>
  );
}
