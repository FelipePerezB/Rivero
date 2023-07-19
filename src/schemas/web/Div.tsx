import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";
import styles from '../styles/web.module.css'

export default function Div({
  childrens,
  gap = "0px",
  id,
}: {
  gap?: string;
  childrens: {
    type: string;
    options: any;
  }[];
  id: string;
}) {
  const style =
    gap &&
    ({
      display: "grid",
      gap: gap,
    } as any)
    
  return (
    <CustomComponent id={id} style={{}}> 
      <div style={style} className={styles.div}>
      {childrens.map((component, i) => (
          <GetWebNode key={id + i} component={component} />
        ))}
      </div>
    </CustomComponent>
  );
}
