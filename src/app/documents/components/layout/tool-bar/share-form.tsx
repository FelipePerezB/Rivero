'use client'
import Button from "@components/Button";
import Options from "@components/Options";
import Buttons from "@components/button/buttons/Buttons";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import { Privacity } from "@prisma/client";
import React, { useState } from "react";
import OptionsInput from "src/app/components/edit-wraper/components/inputs/options";
import { hydrateJSON } from "src/app/documents/edit/utils/hydrateJSON";
import { removeIdFromJson } from "src/app/documents/edit/utils/removeId";
import { DocumentJSON } from "src/models/document.model";

export default function ShareForm({
    privacity,
    document,
    setSettings,
  }: {
    document?: any;
    privacity: Privacity;
    setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
  }) {
  const options = ["Configuración"];
  const [option, setOption] = useState(options[0]);
    // const optimizedContent = removeIdFromJson(document);
  const [content, setContent] = useState("");
  const id = document?.id;
  return (
    <>
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
            </Buttons>
          </>
      )}
    </>
  );
}


// const ConfigForm = ({
//   privacity,
//   document,
//   setSettings,
// }: {
//   document?: Component;
//   privacity: Privacity;
//   setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
// }) => {
//   const optimizedContent = removeIdFromJson(JSON.stringify(document));
//   const [content, setContent] = useState("");
//   const id = document?.id;
//   return (
//     <>
//       <OptionsInput
//         value={privacity}
//         dataKey="privacity"
//         onChange={({ privacity }) =>
//           setSettings((settings) => ({
//             ...settings,
//             file: {
//               ...settings.file,
//               privacity,
//             },
//           }))
//         }
//         name="Privacidad"
//         options={Object.values(Privacity)}
//       />
//       <StandardInput
//         value={`https:/rivero.academy/view/${id}`}
//         attrs={{ readOnly: true }}
//         name="Link del documento"
//       />
//       <StandardInput
//         value={optimizedContent}
//         name="Código del documento"
//         dataKey="content"
//         onChange={({ content }) => setContent(content)}
//       />
//       <Buttons>
//         <Button onClick={() => print()}>Descargar</Button>
//         <Button
//           onClick={() =>
//             setSettings((settings) => ({
//               ...settings,
//               file: {
//                 ...settings.file,
//                 content: hydrateJSON(JSON.parse(content)),
//               },
//             }))
//           }
//           color="white"
//         >
//           Reemplazar
//         </Button>
//       </Buttons>
//     </>
//   );
// };