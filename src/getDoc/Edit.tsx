/* eslint-disable react-hooks/exhaustive-deps */
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
import { FormModal } from "@components/Modal";
import {
  CreateDocDocument,
  DocCreateInput,
  SubjectCreateNestedOneWithoutDocsInput,
  SubtopicCreateNestedOneWithoutDocsInput,
  TopicCreateNestedOneWithoutDocsInput,
  UpdateDocDocument,
} from "src/gql/graphql";
import { useMutation } from "@apollo/client";
import SwitchInput from "@components/inputs/SwitchInput/SwitchInput";

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
  const [pages, setPage] = useState(doc as any);

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
  const [shareModalData, setShareModalData] = useState(
    {} as {
      Privacidad?: "Public" | "Private";
      Subtopico?: string;
      Topico?: string;
    }
  );

  const [updateDoc, updateData] = useMutation(UpdateDocDocument, {
    fetchPolicy: "network-only",
  });

  const [createDoc, createData] = useMutation(CreateDocDocument, {
    fetchPolicy: "network-only",
  });

  const uploadDoc = (data: {
    subject?: string;
    topic?: string;
    subtopic?: string;
  }) => {
    const { subject, topic, subtopic } = data;
    const { privacity, title } = pages.options as {
      title?: string;
      subtitle?: string;
      subject?: string;
      sutopic?: string;
      privacity?: string;
      subtopic?: string;
    };
    if (!privacity || !title || !subject || !topic || !subtopic || !switchState)
      return;

    const Subject = {
      connect: {
        name: subject?.toLowerCase(),
      },
    } as SubjectCreateNestedOneWithoutDocsInput;
    const Topic = {
      connectOrCreate: {
        where: { name: topic?.toLowerCase() },
        create: {
          Subject,
          name: topic?.toLowerCase(),
        },
      },
    } as TopicCreateNestedOneWithoutDocsInput;

    const Subtopic = {
      connectOrCreate: {
        where: { name: subtopic?.toLowerCase() },
        create: {
          name: subtopic?.toLocaleLowerCase(),
          Subject,
          Topic,
        },
      },
    } as SubtopicCreateNestedOneWithoutDocsInput;

    const newDoc = {
      ...pages,
      options: {
        ...pages.options,
        subtopic,
        subject,
        privacity,
        type: "NOTES",
        title,
        externalId: router.query.id,
      },
    };
    const docData = {
      privacity: privacity?.toUpperCase(),
      Subject,
      Topic,
      externalId: router.query.id,
      Subtopic,
      Author: {
        connect: {
          id: 1,
        },
      },
      title,
      type: "NOTES",
      content: JSON.stringify(newDoc),
    } as DocCreateInput;

    createDoc({
      variables: {
        createDocInput: docData,
      },
    });
    createData.data?.createDoc.id &&
      setPage({
        ...pages,
        id: createData.data?.createDoc.id,
      });

    saveDoc(newDoc);
  };
  const [switchState, setSwitchState] = useState(false);

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
              <span onClick={() => setShareModalState(true)}>
                <FontAwesomeIcon size="lg" icon={faShare} />
              </span>
              <FormModal
                buttonName="Publicar"
                onSubmit={(data) => {
                  if (!pages?.options?.externalId) return;
                  if (pages?.options?.id) {
                    const dbId = pages.options.id;
                    updateDoc({
                      variables: {
                        updateDocId: Number(dbId),
                        updateDocInput: {
                          content: {
                            set: JSON.stringify(pages),
                          },
                        },
                      },
                    });
                    return;
                  } else uploadDoc(data);
                }}
                setModalState={setShareModalState}
                modalState={shareModalState}
                values={{
                  topic: pages?.options?.subtitle,
                }}
                schema={
                  switchState
                    ? [
                        { subject: "text" },
                        { topic: "text" },
                        { subtopic: "text" },
                      ]
                    : []
                }
                title="Publicar documento"
                setData={setShareModalData}
              >
                <SwitchInput
                  onChange={(data) => {
                    setSwitchState(data.oficial);
                  }}
                  value={false}
                  name="oficial"
                />
              </FormModal>
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
