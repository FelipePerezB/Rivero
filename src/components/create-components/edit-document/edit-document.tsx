import Button from "@components/Button";
import Buttons from "@components/button/buttons/Buttons";
import CircleButton from "@components/button/circle-button/circle-button";
import OptionsInput from "@components/inputs/OptionsInput/OptionsInput";
import StandardInput from "@components/inputs/StandardInput/StandardInput";
import Modal from "@components/modals/modal/Modal";
import {
  faBars,
  faFile,
  faFilePdf,
  faGear,
  faPrint,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Sidevar from "src/layout/Sidevar";
import capFirst from "src/utils/capFirst";
import Options from "@components/Options";

export type configAttrs = {
  title: string;
  privacity: "private" | "public";
};

const ConfigForm = ({ privacity }: { privacity: configAttrs["privacity"] }) => (
  <>
    <OptionsInput
      value={privacity}
      onChange={() => {}}
      name="Privacidad"
      options={["private", "public"]}
    />
    <StandardInput
      value="https:/rivero.academy/view/asiushiuhasiuhsdquhqwibqwiduhdw8qhubu"
      attrs={{ readOnly: true }}
      name="Link del documento"
    />
    <StandardInput
      value="AAAAA"
      attrs={{ readOnly: true }}
      name="Nuevo código del documento"
    />
    <Buttons>
      <Button onClick={print}>Descargar</Button>
      <Button color="white">Copiar</Button>
    </Buttons>
  </>
);

const InformationForm = () => <></>;

const Navar = ({
  title,
  setVisibility,
  setModalState,
}: {
  title: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  return (
    <nav className="fixed z-20 top-0 left-0 w-full h-max border-b shadow-sm bg-white print:hidden">
      <ul className="flex items-center justify-between h-full px-6 py-1.5">
        <li className="flex flex-col">
          <span className="text-lg font-bold">{title && capFirst(title)}</span>
          <div className="flex gap-2">
            <span className="text-xs cursor-pointer active:text-blue-500">
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
  config: { title, privacity } = {
    privacity: "private",
    title: "Nuevo documento",
  },
  children,
}: {
  config: configAttrs;
  children: ReactNode;
}) {
  const options = ["Configuración", "Permisos"];
  const [modalState, setModalState] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [option, setOption] = useState(options[0]);
  return (
    <div className="p-4 pt-16 max-w-2xl mx-auto print:max-w-none print:p-0">
      <Navar {...{ setModalState, setVisibility, title }} />
      {children}
      <div>
      <Modal title="Compartir" {...{ modalState, setModalState }}>
        <Options {...{ setOption, option, options }}></Options>
        {option === "Configuración" && <ConfigForm {...{ privacity }} />}
        {option == "Permisos" && <InformationForm />}
      </Modal>

      </div>
      <Sidevar {...{ setVisibility, visibility }} />
    </div>
  );
}
