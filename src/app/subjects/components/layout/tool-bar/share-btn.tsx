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

export default function ShareBtn({
  settings,
  setSettings,
}: {
  settings: NoteWithComponent;
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
}) {
  const [state, setState] = useState(false);
  const options = ["Configuración"];
  const [option, setOption] = useState(options[0]);
  const fileCopy =  JSON.parse(JSON.stringify(settings.file.content))
  const optimizedContent = JSON.stringify(
    removeIdFromObject(fileCopy)
  );
  const id = settings.file?.externalId;
  const privacity = settings.file.privacity;
  return (
    <>
      <div
        onClick={() => setState(true)}
        className=" cursor-pointer flex items-center gap-1"
      >
        {/* <CircleButton>
          <FontAwesomeIcon className="flex items-center" icon={faShare} />
        </CircleButton> */}
        <span className="hidden md:inline-block">Share</span>
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
                  file: {
                    ...settings.file,
                    privacity,
                  },
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
              value={optimizedContent}
              name="Código del documento"
              dataKey="content"
              onBlur={(content) =>
                setSettings((settings) => ({
                  ...settings,
                  file: {
                    ...settings.file,
                    content: hydrateJSON(JSON.parse(content)),
                  },
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
