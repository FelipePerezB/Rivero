import React, { ReactElement, ReactNode } from "react";
// import styles from "../styles/web.module.css";
import CustomComponent from "./CustomComponent";
import GetWebNode from ".";

export default function Page({
  id,
  childrens,
  index,
}: {
  id: string;
  index: number;
  childrens: {
    options: any;
    type: string;
  }[];
}) {

  return (
    <CustomComponent id={id} style={{}}>
      <div id={"page-" + index}>
        {childrens?.map((component, i) => {
          return <GetWebNode component={component} key={id + i} />;
        })}
      </div>
    </CustomComponent>
  );
}
