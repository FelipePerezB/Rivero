import React from "react";
import styles from "../styles/reportTemplate.module.css";
import getComponent from "../utils/getComponent";
import CustomComponent from "./CustomComponent";

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
    <CustomComponent active={false} id={id} style={{}}>
      <section id={id} style={{ gap, margin }} className={styles.separator}>
        {childrens.map(({ type, options }) => getComponent(type, options))}
      </section>
    </CustomComponent>
  );
}
