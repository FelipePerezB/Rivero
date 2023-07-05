import React, { ReactElement, ReactNode } from "react";
import styles from "../styles/reportTemplate.module.css";
import DocInfo from "./DocInfo";
import getComponent from "../utils/getComponent";
import CustomComponent from "./CustomComponent";

export default function Page({
  id,
  childrens,
  index,
}: {
  id: string;
  index: number;
  childrens: ReactElement[];
}) {
  return (
    <CustomComponent active={false} id={id} style={{}}>
      <div
        // style={{ }}
        id={"page-" + index}
        className={styles.page}
      >
        {/* {isFirstPage && <DocInfo/>} */}
        {/* {children} */}
        {childrens.map(({ type, options }: any) => (
          <>{getComponent(type, options)}</>
        ))}
      </div>
    </CustomComponent>
  );
}
