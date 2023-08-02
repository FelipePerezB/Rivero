import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "../styles/web.module.css";
import GetWebNode from ".";

export type useContextState = {
  setState: (data: any) => void;
  state: {
    answers: any;
    doc: { childrens: any[] };
    expectedAns: any;
  };
};

export const ComponentContext = createContext({});
export default function Doc({
  title,
  subtitle,
  childrens,
}: {
  title: string;
  subtitle: string;
  childrens: {
    type: string;
    options: any;
  }[];
}) {
  const defaultState = {
    answers: {},
    doc: { childrens, title, subtitle },
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
          {childrens?.map((component, i) => {
            return (
              <GetWebNode
                key={"page-" + i}
                component={{
                  type: component.type,
                  options: {
                    ...component.options,
                    docInfo: { title, subtitle },
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
