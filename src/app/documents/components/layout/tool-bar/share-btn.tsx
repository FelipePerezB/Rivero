import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import CircleButton from "@components/button/circle-button/circle-button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Privacity } from "@prisma/client";
import React, { useState } from "react";
import ClientModal from "src/app/components/modal/client-modal";
import { hydrateJSON } from "src/app/documents/edit/utils/hydrateJSON";
import { removeIdFromJson } from "src/app/documents/edit/utils/removeId";
import { DocumentJSON } from "src/models/document.model";

export default function ShareBtn({
  settings,
  setSettings,
}: {
  settings: DocumentJSON;
  setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
}) {
  const [state, setState] = useState(false);
  const options = ["Configuración"];
  const [option, setOption] = useState(options[0]);
  // const optimizedContent = removeIdFromJson((document));
  const [content, setContent] = useState("");
  const id = settings.file?.externalId;
  const privacity = settings.file.privacity;
  console.log(privacity)
  return (
    <>
      <div
        onClick={() => setState(true)}
        className=" cursor-pointer flex items-center gap-1"
      >
        <CircleButton>
          <FontAwesomeIcon className="flex items-center" icon={faShare} />
        </CircleButton>
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
              // value={optimizedContent}
              name="Código del documento"
              dataKey="content"
              onChange={({ content }) => setContent(content)}
            />
            <Buttons>
              <Button onClick={() => print()}>Descargar</Button>
              <Button
                onClick={() =>
                  setSettings((settings) => ({
                    ...settings,
                    file: {
                      ...settings.file,
                      content: hydrateJSON(JSON.parse(content)),
                    },
                  }))
                }
                color="white"
              >
                Reemplazar
              </Button>
            </Buttons>{" "}
          </>
        )}
      </ClientModal>
    </>
  );
}
