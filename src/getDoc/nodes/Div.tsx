import getComponent from "../utils/getComponent";
import React, { ReactElement } from "react";
import CustomComponent from "./CustomComponent";

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
  const styles =
    gap &&
    ({
      display: "grid",
      gap: gap,
    } as any);
  return (
    <CustomComponent active={false} id={id} style={{}}> 
      <div style={styles}>
        {childrens.map(({ type, options }) => getComponent(type, options))}
      </div>
    </CustomComponent>
  );
}
