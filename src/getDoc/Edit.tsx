import ConfigButton from "./components/ConfigButton";
import Menu from "./components/Menu";
import changeComponent from "./utils/changeComponent";
import getID, { isCID } from "./utils/getId";
import React, { useEffect, useState } from "react";
import styles from "./styles/Edit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSave,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import GetDoc from "./GetDoc";
import { useRouter } from "next/router";
import Modal from "./containers/NewCompModal";
import { FormModal } from "@components/Modal";

type props = { type: string; options: any };

export default function Edit({
  doc,
  options,
  saveDoc,
  nodes,
}: {
  nodes: any;
  options?: {
    title: string;
    category: string;
  };
  doc?: any;
  saveDoc: (doc: any) => void;
}) {
  const router = useRouter();
  const [pages, setPage] = useState({
    type: "doc",
    options: {
      id: "CID71632832",
      children: [
        {
          type: "page",
          options: {
            id: "CID63726726",
          },
          children: [],
        },
      ],
    },
  } as any);

  useEffect(() => {
    doc && setPage(doc);
  }, [doc, options]);

  const [modalData, setModalData] = useState<any>();
  const [modalType, setModalType] = useState<"add" | "edit" | "" | "addChild">(
    ""
  );
  const [lastElement, setlastElement] = useState<any>();
  const [componente, setComponent] = useState<any>();

  const getNode = (selection?: HTMLElement): HTMLElement | undefined =>
    selection &&
    (isCID(selection?.id)
      ? selection
      : getNode(selection.parentElement as HTMLElement));

  const getLowLvlComp = (JSONComponent: props, expectedID: string) => {
    let component;
    if (JSONComponent.options?.id === expectedID) {
      return JSONComponent;
    }
    JSONComponent.options?.children?.forEach((e: props) => {
      const lowLvlCompo = getLowLvlComp(e, expectedID);
      if (lowLvlCompo) {
        component = lowLvlCompo;
      }
    });
    return component;
  };

  const getJSONComponent = (
    page: any[],
    node: HTMLElement
  ): props | undefined => {
    let component;
    page?.find((JSONComponent: props) => {
      const lowLvlComp = getLowLvlComp(JSONComponent, node.id);
      if (lowLvlComp) {
        component = lowLvlComp;
      }
    });
    return component;
  };

  const getCoords = (event: React.MouseEvent<HTMLDivElement>) => {
    const selection = event?.target as any;
    const node = getNode(selection);
    let component: props;

    component =
      node && (getJSONComponent(pages?.options?.children, node) as any);
    setComponent(component);

    setMenuConfig({
      pages: pages,
      coords: {
        y: event.pageY,
        x: event.clientX,
      },
      component,
    });
  };

  useEffect(() => {
    if (
      lastElement?.options?.id !== modalData?.options?.id ||
      modalType === "edit"
    ) {
      setlastElement(modalData);
      if (modalType === "edit" && modalData) {
        changeComponent(pages, modalData);
      } else if (modalType === "addChild") {
        changeComponent(pages, componente, { newChild: modalData });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData, lastElement, modalType]);
  type JSONComp = {
    options: {
      id: string;
    };
    type: string;
  };

  const deleteComponentCB = (component: JSONComp) => {
    changeComponent(pages, component, { delete: true });
    setPage({ ...pages });
  };

  const [menuConfig, setMenuConfig] = useState(
    {} as {
      pages: any;
      coords: {
        x: number;
        y: number;
      };
      component?: any;
    }
  );

  const [shareModalState, setShareModalState] = useState(false);
  const [shareModalData, setShareModalData] = useState({});

  useEffect(() => {
    console.log(shareModalState);
  }, [shareModalState]);

  return (
    <>
      <header>
        <nav className={styles.navar}>
          <ul>
            <li className={styles["doc-info"]}>
              <FontAwesomeIcon
                onClick={() => {
                  router.back();
                }}
                icon={faChevronLeft}
              />
              <span className={styles["doc-name"]}>
                {options?.title || pages?.options?.title}
              </span>
            </li>

            <li className={styles.options}>
              <span>
                <FontAwesomeIcon
                  size="lg"
                  icon={faSave}
                  onClick={() => saveDoc(pages)}
                />
              </span>
              <span>
                <FontAwesomeIcon
                  onClick={() => setShareModalState(true)}
                  size="lg"
                  icon={faShare}
                />
                <FormModal
                  setModalState={setShareModalState}
                  modalState={shareModalState}
                  schema={[{ texto: "text" }]}
                  title="Publicar documento"
                  setData={setShareModalData}
                />
              </span>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.separator}></div>
      <main id="doc-container" className={styles.docs}>
        {menuConfig && (
          <Menu
            setModalType={setModalType}
            deleteComponentCB={deleteComponentCB}
            setModalData={setModalData}
            {...menuConfig}
          />
        )}
        {pages && (
          <div className={"edit"} onClick={getCoords}>
            <GetDoc component={pages} nodes={nodes} />
          </div>
        )}
        <ConfigButton setComponent={setPage} component={pages} />
      </main>
    </>
  );
}
