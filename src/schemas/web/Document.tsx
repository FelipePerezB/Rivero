import React from "react";
import styles from "../styles/web.module.css";
import GetWebNode from ".";

export default function Doc({
  childrens,
}: {
  childrens: {
    type: string;
    options: any;
  }[];
}) {
  return (
    <div id="doc-container" className={styles.docs}>
      <div className={styles.doc} id="doc">
        {childrens?.map((component, i) => {
          return <GetWebNode key={"page-" + i} component={component} />;
        })}
      </div>
    </div>
  );
}
