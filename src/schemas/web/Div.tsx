import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
import styles from '../styles/web.module.css'

export default function Div({
  children,
  gap = "0px",
  id,
}: {
  gap?: string;
  children: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  return (
    <CustomComponent id={id} style={{}}> 
      <div className={styles.div}>
      {children.map((component, i) => (
          <GetWebNode key={id + i} component={component} />
        ))}
      </div>
    </CustomComponent>
  );
}
