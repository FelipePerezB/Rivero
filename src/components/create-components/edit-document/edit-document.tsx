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
import { useUser } from "@clerk/nextjs";
import Sidevar from "src/layout/Sidevar";
import capFirst from "src/utils/capFirst";
import Options from "@components/Options";
import { Component } from "src/pages/docs/edit/[id]";
import { useRouter } from "next/router";
import { hydrateJSON } from "src/utils/create-doc/hydrate.JSON";

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
  config: { privacity },
  document,
  setDocument,
}: {
  document?: Component;
  config: configAttrs;
  setDocument: React.Dispatch<React.SetStateAction<Component | undefined>>;
}) => {
  const optimizedContent = removeIdFromJson(JSON.stringify(document));
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <OptionsInput
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
      />
      <Buttons>
        <Button onClick={print}>Descargar</Button>
        <Button
          onClick={() => setDocument(hydrateJSON(JSON.parse(content)))}
          color="white"
        >
          Reemplazar
        </Button>
      </Buttons>
    </>
  );
};

const Navar = ({
  id,
  title,
  document,
  setVisibility,
  setModalState,
}: {
  id: string;
  document?: Component;
  title: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const onSave = () => {
    id &&
      document?.type &&
      localStorage.setItem(
        "doc-" + id,
        JSON.stringify(removeIdFromObject(document))
      );
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
      <ul className="flex items-center justify-between h-full px-6 py-1.5">
        <li className="flex flex-col">
          <span className="text-lg font-bold">{title && capFirst(title)}</span>
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
            <CircleButton>
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
            </CircleButton>
            <span className="hidden md:inline-block">Menu</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};


export default function EditDocumentLayout({
  config: { title, privacity, content, id } = {
    id: "",
    privacity: "private",
    title: "Nuevo documento",
    content: {
      type: "document",
      options: {},
    },
  },
  children,
  document,
  setDocument,
}: {
  setDocument: React.Dispatch<React.SetStateAction<Component | undefined>>;
  document?: Component;
  config: configAttrs;
  children: ReactNode;
}) {
  const options = ["Configuración"];
  const [modalState, setModalState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [option, setOption] = useState(options[0]);
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar {...{ setModalState, setVisibility, title, document, id }} />
      {children}
      <div>
        <Modal title="Compartir" {...{ modalState, setModalState }}>
          <Options {...{ setOption, option, options }}></Options>
          {option === "Configuración" && (
            <ConfigForm
              {...{
                config: { content, privacity, title, id },
                document,
                setDocument,
              }}
            />
          )}
        </Modal>
      </div>
      <Sidevar {...{ setVisibility, visibility }} />
    </div>
  );
}
