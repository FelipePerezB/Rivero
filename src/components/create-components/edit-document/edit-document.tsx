import Button from "@components/Button";
import Buttons from "@components/button/buttons/Buttons";
import CircleButton from "@components/button/circle-button/circle-button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import Modal from "@components/modals/modal/Modal";
import { faBars, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Sidevar from "src/layout/Sidevar";
import Options from "@components/Options";
import { Component } from "src/pages/docs/edit/[id]";
import { useRouter } from "next/router";
import { hydrateJSON } from "src/utils/create-doc/hydrate.JSON";
import {
  Privacity,
  RemoveFileDocument,
  UpsertFileDocument,
} from "src/gql/graphql";
import { DocumentJSON } from "src/models/document.model";
import { client } from "src/service/client";
import toast from "react-hot-toast";

export type configAttrs = {
  title: string;
  id: string;
  privacity: Privacity;
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
  privacity,
  document,
  setSettings,
}: {
  document?: Component;
  privacity: Privacity;
  setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
}) => {
  const optimizedContent = removeIdFromJson(JSON.stringify(document));
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  return (
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
        onChange={({ content }) => setContent(content)}
      />
      <Buttons>
        <Button onClick={()=>print()}>Descargar</Button>
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
  );
};

const Navar = ({
  settings,
  setSettings,
  setVisibility,
  setModalState,
}: {
  setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
  settings: DocumentJSON;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    file: { externalId, title, content, privacity },
    subject,
    subtopic,
    topic,
  } = settings ?? { file: {} };
  const { user } = useUser();
  const router = useRouter();

  const onRemove = async () => {
    toast.promise(
      client
        .mutate({
          mutation: RemoveFileDocument,
          variables: {
            where: {
              externalId,
            },
          },
        })
        .then(() => {
          localStorage.removeItem("doc-" + externalId);
          router.push("/edit");
        }),
      {
        error: "No se ha logrado eliminar",
        loading: "Eliminando...",
        success: "¡Eliminado!",
      }
    );
  };

  const remove = async () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span>¿Seguro que quiere eliminar el documento?</span>
        <Button
          onClick={() => {
            onRemove();
            toast.dismiss(t.id);
          }}
          color={"red"}
        >
          Eliminar
        </Button>
      </div>
    ));
  };

  const onSave = () => {
    externalId &&
      content?.type &&
      localStorage.setItem(
        "doc-" + externalId,
        JSON.stringify({
          subject,
          subtopic,
          topic,
          file: {
            content: removeIdFromObject(content),
            externalId,
            title,
            privacity,
          },
        })
      );
    toast.success("¡Guardado localmente!");
  };

  const upsert = async () => {
    toast.promise(
      client.mutate({
        mutation: UpsertFileDocument,
        variables: {
          where: { externalId },
          create: {
            Author: {
              connect: {
                externalId: user?.id,
              },
            },
            content: JSON.stringify(removeIdFromObject(content)),
            privacity,
            title,
            externalId,
          },
          update: {
            content: {
              set: JSON.stringify(removeIdFromObject(content)),
            },
            privacity: {
              set: privacity,
            },
            title: {
              set: title,
            },
          },
        },
      }),
      {
        error: "Error al sincronizar",
        loading: "Sincronizando",
        success: "¡Sincronizado correctamente!",
      }
    );
  };

  return (
    <nav className="fixed z-20 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
      <ul className="flex items-center justify-between h-full px-6 py-1.5">
        <li className="flex flex-col">
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: `${title}` }}
            onBlur={({ target }) =>
              setSettings({
                ...settings,
                file: { ...settings.file, title: target.innerText },
              })
            }
            className="text-lg font-bold"
          ></div>
          <div className="flex gap-2">
            <span
              onClick={onSave}
              className="text-xs cursor-pointer active:text-blue-500"
            >
              Guardar
            </span>
            <span
              onClick={upsert}
              className="text-xs cursor-pointer active:text-blue-500"
            >
              Sincronizar
            </span>
          </div>
        </li>
        <li className="flex items-center gap-2.5 md:gap-5">
          <div
            onClick={remove}
            className=" cursor-pointer flex items-center gap-1"
          >
            <CircleButton>
              <FontAwesomeIcon
                className="flex items-center"
                size="lg"
                icon={faTrash}
              />
            </CircleButton>
            <span className="hidden md:inline-block">Eliminar</span>
          </div>
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
  settings,
  children,
  document,
  setSettings,
}: {
  settings: DocumentJSON;
  setSettings: React.Dispatch<React.SetStateAction<DocumentJSON>>;
  document?: Component;
  children: ReactNode;
}) {
  const options = ["Configuración"];
  const [modalState, setModalState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [option, setOption] = useState(options[0]);
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar {...{ setModalState, setVisibility, settings, setSettings }} />
      {children}
      <div>
        <Modal title="Compartir" {...{ modalState, setModalState }}>
          <Options {...{ setOption, option, options }}></Options>
          {option === "Configuración" && (
            <ConfigForm
              privacity={settings?.file?.privacity}
              setSettings={setSettings}
              document={settings?.file?.content}
            />
          )}
        </Modal>
      </div>
      <Sidevar {...{ setVisibility, visibility }} />
    </div>
  );
}
