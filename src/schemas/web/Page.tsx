import React, { ReactElement, ReactNode } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
import getID from "src/getDoc/utils/getId";

export default function WebPage({
  id,
  childrens,
  index,
  number,
  docInfo,
}: {
  number: number;
  docInfo?: {
    title: string;
    subtitle: string;
  };
  id: string;
  index: number;
  childrens: {
    options: any;
    type: string;
  }[];
}) {
  return (
    <CustomComponent id={id} style={{ bor: "2px solid black" }}>
      <div className={styles.page} id={"page-" + index}>
        {number === 1 && (
          <GetWebNode
            component={{
              type: "DocInfo",
              options: { id: getID(), ...docInfo },
            }}
            key={id + "-doc-info"}
          />
        )}
        {childrens?.map((component, i) => {
          return <GetWebNode component={component} key={id + i} />;
        })}
      </div>
    </CustomComponent>
  );
}
