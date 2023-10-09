import Button from "@components/Button";
import Buttons from "@components/button/buttons/Buttons";
import CircleButton from "@components/button/circle-button/circle-button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import Modal from "@components/modals/modal/Modal";
import { faBars, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
// import { useUser } from "@clerk/nextjs";
import Sidevar from "src/layout/Sidevar";
import capFirst from "src/utils/capFirst";
import Options from "@components/Options";
import { Component, NoteWithComponent } from "../../models/component";
import { hydrateJSON } from "../../utils/hydrateJSON";
// import { File, Privacity } from "@prisma/client";
// import { NoteWithFile } from "src/hooTypeError: Cannot read properties of null (reading 'useContext')ks/useGetFile";

export type configAttrs = {
  title: string;
  id: string;
  privacity: "private" | "public";
  content: Component;
};
function removeIdFromObject(obj: Component) {
  if ("id" in obj) {
    delete obj.id;
  }
  for (const child of obj.options.children || []) {
    removeIdFromObject(child);
  }
  return obj;
}

function removeIdFromJson(jsonStr: string) {
  const jsonObj = JSON.parse(jsonStr);
  removeIdFromObject(jsonObj);

  return JSON.stringify(jsonObj);
}

const ConfigForm = ({
  settings: {
    file: { privacity, id },
  },
  document,
  setDocument,
}: {
  document?: Component;
  settings: NoteWithComponent;
  setDocument: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
}) => {
  const optimizedContent = removeIdFromJson(JSON.stringify(document));
  const [content, setContent] = useState("");
  return (
    <>
      {/* <OptionsInput
        value={privacity}
        onChange={() => {}}
        name="Privacidad"
        options={["private", "public"]}
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
        onChange={({ content }) => setContent(content)}
      /> */}
      <Buttons>
        <Button onClick={print}>Descargar</Button>
        <Button
          onClick={() =>
            setDocument((settings) => ({
              ...settings,
              file: {
                ...settings?.file,
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
  );
};

const Navar = ({
  file,
  document,
  setVisibility,
  setModalState,
}: {
  file: NoteWithComponent;
  document?: Component;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { user } = useUser();
  const onSave = () => {
    file.file.externalId &&
      document?.type &&
      localStorage.setItem(
        "doc-" + file.file.externalId,
        JSON.stringify(removeIdFromObject(document))
      );
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
      <ul className="flex items-center justify-between h-full px-6 py-1.5">
        <li className="flex flex-col">
          <span className="text-lg font-bold">
            {file.file.title && capFirst(file.file.title)}
          </span>
          <div className="flex gap-2">
            <span
              onClick={onSave}
              className="text-xs cursor-pointer active:text-blue-500"
            >
              Guardar
            </span>
            <span className="text-xs cursor-pointer active:text-blue-500">
              Sincronizar
            </span>
          </div>
        </li>
        <li className="flex items-center gap-2.5 md:gap-5">
          <div
            onClick={() => setModalState(true)}
            className=" cursor-pointer flex items-center gap-1"
          >
            <CircleButton>
              <FontAwesomeIcon
                className="flex items-center"
                size="lg"
                icon={faShare}
              />
            </CircleButton>
            <span className="hidden md:inline-block">Share</span>
          </div>
          <div
            onClick={() => setVisibility(true)}
            className="cursor-pointer flex items-center gap-1"
          >
            {/* <CircleButton>
              {user?.imageUrl ? (
                <div className="rounded-full overflow-hidden">
                  <Image
                    width={25}
                    height={25}
                    alt="abrir menu"
                    src={user?.imageUrl ?? ""}
                  />
                </div>
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </CircleButton> */}
            <span className="hidden md:inline-block">Menu</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default function EditDocumentLayout({
  settings,
  children,
  document,
  setSettings,
}: {
  setSettings: React.Dispatch<
    React.SetStateAction<NoteWithComponent>
  >;
  document?: Component;
  settings: NoteWithComponent;
  children: ReactNode;
}) {
  const options = ["Configuración"];
  const [modalState, setModalState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [option, setOption] = useState(options[0]);
  return (
    <div className="p-4 pt-16 w-screen  max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar {...{ setModalState, setVisibility, file: settings, document }} />
      {children}
      <div>
        <Modal title="Compartir" {...{ modalState, setModalState }}>
          <Options {...{ setOption, option, options }}></Options>
          {option === "Configuración" && (
            <ConfigForm
              setDocument={setSettings}
              settings={settings}
              document={document}
              // {...{
              //   settings,
              //   document,
              //   setDocument,
              // }}
            />
          )}
        </Modal>
      </div>
      <Sidevar {...{ setVisibility, visibility }} />
    </div>
  );
}
