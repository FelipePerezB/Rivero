/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@styles/Card.module.css";
import Link from "next/link";

export default function Card({
  children,
  data,
  styled = true,
  className = "",
  href,
}: {
  className?: string;
  styled?: boolean;
  children?: ReactNode;
  data?: {
    title: string;
    icon: ReactNode;
  };
  href?: string;
}) {
  const Card = (
    <div
      className={`${
        styled ? styles["main-info"] : styles["main-info--simple"]
      }`}
    >
      <section className={`${styles.content} ${className}`}>
        {children && children}
        {data && <span className={styles.title}>{data.title}</span>}
      </section>
    </div>
  );
  return href ? <Link href={href}>{Card}</Link> : Card;
}
