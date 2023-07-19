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
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "./utils/api";
import { useRouter } from "next/router";
import GetDoc from "./GetDoc";

type props = { type: string; options: any };

export default function Edit({
  doc,
  options,
  saveDoc,
  nodes,
}: {
  nodes: any;
  options?: {
    // grade: string;
    title: string;
    category: string;
  };
  doc?: any;
  saveDoc: (doc: any) => void;
}) {
  // const data = {
  //   id: "7",
  //   name: "Sistema de ecuaciones",
  //   subtitle: "AAAAA",
  //   component: {
  //     type: "doc",
  //     options: {
  //       id: "CID812919622",
  //       childrens: [
  //         {
  //           type: "page",
  //           options: {
  //             id: "CID812819282",
  //             childrens: [
  //               {
  //                 type: "docInfo",
  //                 options: {
  //                   id: "CID812889282",
  //                   title: "SISTEMA DE ECUACIONES",
  //                   subtitle: "EJE: ALGEBRA",
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // };

  const [pages, setPage] = useState({
    type: "doc",
    options: {
      id: "CID71632832",
      childrens: [
        {
          type: "page",
          options: {
            id: "CID63726726",
          },
          childrens: [],
        },
      ],
    },
  } as any);

  useEffect(() => {
    if (options?.title) {
      setPage({
        type: "doc",
        options: {
          id: getID(),
          title: options?.title,
          subtitle: options?.category,
          childrens: [
            {
              type: "page",
              options: {
                id: getID(),
                childrens: [
                  {
                    type: "docinfo",
                    options: {
                      id: getID(),
                      title: options?.title.toUpperCase(),
                      subtitle: options?.category.toUpperCase(),
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    } else if (doc) setPage(doc);
  }, [doc, options]);
  // useEffect(() => {
  //   console.log(options);
  //   if (!doc?.id) {
  //     const a = {
  //       id: options?.id,
  //       name: options?.title,
  //       category: options?.category,
  //       component: {
  //         type: "doc",
  //         options: {
  //           id: getID(),
  //           childrens: [
  //             {
  //               type: "page",
  //               options: {
  //                 id: getID(),
  //                 childrens: [
  //                   {
  //                     type: "docInfo",
  //                     options: {
  //                       id: getID(),
  //                       title: options?.title.toUpperCase(),
  //                       subtitle: options?.category.toUpperCase(),
  //                     },
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     };
  //     api.put(`docs/8`, {
  //       content: a,
  //     });
  //     console.log(a)
  //     setPage(a.component);
  //   }
  // }, [options]);
  // const [doc, doc] = useState({} as any);
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
    JSONComponent.options?.childrens?.forEach((e: props) => {
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
      node && (getJSONComponent(pages?.options?.childrens, node) as any);
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

  return (
    <>
      <header>
        <nav className={styles.navar}>
          <ul>
            <li className={styles["doc-info"]}>
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className={styles["doc-name"]}>
                {options?.title || pages?.options?.title}
              </span>
            </li>

            <li className={styles.options}>
              <FontAwesomeIcon
                size="xl"
                icon={faSave}
                onClick={() => saveDoc(pages)}
              />
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.separator}></div>
      <main id="doc-container" className={styles.docs}>
        {menuConfig && (
          <Menu
            // addChild={addChild}
            deleteComponentCB={deleteComponentCB}
            setModalType={setModalType}
            modalType={modalType}
            setModalData={setModalData}
            {...menuConfig}
          />
          // <></>
        )}
        {pages && (
          <div className={"edit"} onClick={getCoords}>
            <GetDoc component={pages} nodes={nodes}/>
            {/* {getComponent(pages?.type, pages?.options)} */}
          </div>
        )}

        <ConfigButton setComponent={setPage} component={pages} />
      </main>
    </>
  );
}
