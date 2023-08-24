import React, { ReactElement, ReactNode } from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
import getID from "src/getDoc/utils/getId";
import DocInfo from "./DocInfo";

export default function WebPage({
  id,
  children,
  index,
  number,
  docInfo,
  callbacks,
}: {
  callbacks: [];
  number: number;
  docInfo: {
    title: string;
    subtitle: string;
    docId: number;
  };
  id: string;
  index: number;
  children: {
    options: any;
    type: string;
  }[];
}) {
  return (
    <CustomComponent id={id} style={{ bor: "2px solid black" }}>
      <div className={styles.page} id={"page-" + index}>
        {number === 1 && (
          <DocInfo {...docInfo} callbacks={callbacks} id={id} />
          // <GetWebNode
          //   component={{
          //     type: "DocInfo",
          //     options: { id: getID(), ...docInfo },
          //   }}
          //   key={id + "-doc-info"}
          // />
        )}
        {children?.map((component, i) => {
          return <GetWebNode component={component} key={id + i} />;
        })}
      </div>
    </CustomComponent>
  );
}
