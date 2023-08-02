import React from "react";
import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetPdfNode from ".";
import GetWebNode from ".";

export default function Columns({
  gap,
  margin,
  childrens,
  id,
}: {
  gap?: string;
  margin?: string;
  childrens: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  return (
    <CustomComponent id={id} style={{}}>
      <section id={id} style={{ gap, margin }} className={styles.separator}>
        {childrens.map((component, i) => (
          <GetWebNode key={id + i} component={component} />
        ))}
      </section>
    </CustomComponent>
  );
}
