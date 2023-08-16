import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import GetWebNode from ".";

export type useContextState = {
  setState: (data: any) => void;
  state: {
    answers: any;
    doc: {
      type: string;
      options: {
        children: any[];
        title: string;
        subtitle: string;
        docId: number;
      };
    };
    expectedAns: any;
  };
};

export const ComponentContext = createContext({});
export default function Doc({
  title,
  docId,
  subtitle,
  children,
}: {
  docId: number;
  title: string;
  subtitle: string;
  children: {
    type: string;
    options: any;
  }[];
}) {
  const defaultState = {
    answers: {},
    doc: { type: "doc", options: { children, title, subtitle, docId } },
    expectedAns: {},
  };

  const useInitialState = (): useContextState => {
    const [state, setState] = useState(defaultState);
    return { state, setState };
  };
  const initialState = useInitialState();

  return (
    <ComponentContext.Provider value={initialState}>
      <div id="doc-container" className={styles.docs}>
        <div className={styles.doc} id="doc">
          {children?.map((component, i) => {
            return (
              <GetWebNode
                key={"page-" + i}
                component={{
                  type: component.type,
                  options: {
                    ...component.options,
                    docInfo: { title, subtitle, docId },
                    number: i + 1,
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </ComponentContext.Provider>
  );
}
