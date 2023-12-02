import { useAuth, useUser } from "@clerk/nextjs";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import ShareBtn from "./share-btn";
import Link from "next/link";
import { Component, NoteWithComponent } from "src/app/documents/edit/models/component";
import toast from "react-hot-toast";
import api from "src/utils/api";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";
import ClientModal from "@components/modal/client-modal";
import Form from "src/app/documents/edit/components/form";

export default function Navar({
  name,
  settings,
  setSettings,
}: {
  name: string;
  settings: NoteWithComponent;
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent>>;
}) {
  const [modalState, setModalState] = useState(false);
  const document = settings.file.content;
  console.log(document);

  const updateDocument = (component: Component) => {
    // console.log({ ...settings, file: {...settings.file, content: component} })
    // console.log(settings)
    setSettings({ ...settings, file: {...settings.file, content: component} });
    setModalState(false);
  };

  const { user } = useUser();
  const { getToken } = useAuth();
  const sync = async () => {
    const {
      file: { privacity, content, name, externalId },
    } = settings;
    const token = await getToken();
    toast.promise(
      api("files/" + externalId, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({
          name,
          content: JSON.stringify(removeIdFromObject(content)),
          privacity,
        }),
      }),
      {
        error: "Error al sincronizar",
        loading: "Sincronizando",
        success: "¡Sincronizado correctamente!",
      }
    );
  };
  return (
    <>
      <nav className="fixed z-40 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
        <ul className="flex items-center justify-between h-full px-6 py-1.5">
          <li className="flex flex-col">
            <div
              contentEditable
              dangerouslySetInnerHTML={{ __html: `${name}` }}
              onBlur={({ target }) =>
                setSettings({
                  ...settings,
                  file: { ...settings.file, name: target.innerText },
                })
              }
              className="text-lg font-bold"
            ></div>
            <div className="flex gap-2">
              <span
                onClick={sync}
                className="text-xs cursor-pointer active:text-blue-500"
              >
                Sincronizar
              </span>
            </div>
          </li>
          <li className="flex items-center gap-2.5 md:gap-5">
            <button
              onClick={() => {
                setModalState(true);
              }}
            >
              <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
            </button>
            <ShareBtn setSettings={setSettings} settings={settings} />
            <div className="cursor-pointer flex items-center gap-1">
              <Link href={"?sidebar=nav"}>
                {user?.imageUrl ? (
                  <div className="rounded-full overflow-hidden">
                    <Image
                      width={25}
                      height={25}
                      alt="abrir menu"
                      src={user.imageUrl}
                    />
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </Link>
              <span className="hidden md:inline-block">Menu</span>
            </div>
          </li>
        </ul>
      </nav>
      {modalState && (
        <ClientModal
          setState={setModalState}
          state={modalState}
          title="Editar archivo"
        >
          <Form
            id={document.id}
            modalState={modalState}
            setModalState={setModalState}
            defaultValues={{...document.options}}
            type={document.type}
            onSave={updateDocument}
          />
          {/* <div>AA</div> */}
        </ClientModal>
      )}
    </>
  );
}
