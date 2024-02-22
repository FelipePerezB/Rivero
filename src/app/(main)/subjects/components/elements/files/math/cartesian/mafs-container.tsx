"use client";
import { Mafs } from "mafs";
import React, { ReactNode } from "react";
import styles from "../../../../styles/linechart.module.css";

export default function MafsContainer({
  children,
  isPreview,
  id,
}: {
  children: ReactNode;
  isPreview: boolean;
  id: string;
}) {
  return isPreview ? (
    <div className={`${styles.linechart} h-[6em] w-[6em] text-[1em]`} >
      <Mafs
        height={50}
        // viewBox={{ x: getViewBox(rangeX), y: getViewBox(rangeY) }}
        width={50}
      >
        {children}
      </Mafs>
    </div>
  ) : (
    <React.Fragment data-component={id}>{children}</React.Fragment>
  );
}
