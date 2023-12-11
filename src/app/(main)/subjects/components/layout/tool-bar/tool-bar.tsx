import { useAuth, useUser } from "@clerk/nextjs";
import { faBars, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import ShareBtn from "./share-btn";
import Link from "next/link";
import {
  Component,
  NoteWithComponent,
} from "src/app/documents/edit/models/component";
import toast from "react-hot-toast";
import api from "src/utils/api";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";
import ClientModal from "@components/modal/client-modal";
import Form from "src/app/documents/edit/components/form";

export const Item = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="cursor-pointer flex items-center gap-1.5">
      <div title={title}>{children}</div>
      <span className="hidden md:inline-block">{title}</span>
    </div>
  );
};

export default function Navar({
  isLocalFile,
  name,
  settings,
  setSettings,
}: {
  isLocalFile: boolean;
  name: string;
  settings?: NoteWithComponent["file"];
  setSettings: React.Dispatch<React.SetStateAction<NoteWithComponent["file"]>>;
}) {
  const [modalState, setModalState] = useState(false);
  const document = settings?.content;

  const updateDocument = (component: Component) => {
    setSettings({ ...settings, content: component });
    setModalState(false);
  };

  const { user } = useUser();
  const { getToken } = useAuth();
  const sync = async () => {
    const { privacity, content, name, externalId } = settings ?? {};
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
    <div className="print:hidden z-40 sticky top-0 left-0">
      <nav className="w-full h-max border-b shadow-sm bg-white print:hidden">
        <ul className="flex items-center justify-between h-full px-6 py-1.5">
          <li className="flex flex-col">
            {settings && (
              <div className="flex gap-2 items-center">
                <div
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: `${name}` }}
                  onBlur={({ target }) =>
                    setSettings({ ...settings, name: target.innerText })
                  }
                  className="text-lg font-bold"
                ></div>
                {isLocalFile && (
                  <FontAwesomeIcon
                    title="Sin conexión"
                    className="h-4 w-4 text-red-500 animate-pulse cursor-pointer"
                    icon={faWarning}
                  />
                )}
              </div>
            )}
            <div className="flex gap-2">
              <span
                onClick={sync}
                className="text-xs cursor-pointer active:text-blue-500"
              >
                Sincronizar
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => {
                setModalState(true);
              }}
            >
              <Item title="Settings">
                <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
              </Item>
            </button>
            <ShareBtn setSettings={setSettings} settings={settings} />
            <Item title="Menú">
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
            </Item>
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
            id={document?.id}
            modalState={modalState}
            setModalState={setModalState}
            defaultValues={{ ...document?.options }}
            type={document?.type}
            onSave={updateDocument}
          />
          {/* <div>AA</div> */}
        </ClientModal>
      )}
    </div>
  );
}
