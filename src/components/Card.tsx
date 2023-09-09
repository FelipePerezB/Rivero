/* eslint-disable react-hooks/exhaustive-deps */
import { IconDefinition, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@styles/Card.module.css";
import Link from "next/link";

export function SimpleCard({
  children,
  data,
  styled = true,
}: {
  styled?: boolean;
  children?: ReactNode;
  data?: {
    title: string;
    icon: ReactNode;
  };
}) {
  return (
    <div
      className={`${
        styled ? styles["main-info"] : styles["main-info--simple"]
      }`}
    >
      <div className={styles.content}>
        {children && children}
        {data && (
          <span>
            {/* <FontAwesomeIcon size="lg" icon={data.icon} /> */}
            <span className={styles.title}>{data.title}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function NavigateCard({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className={styles["navigate-card"]}>
        <SimpleCard>{children}</SimpleCard>
      </div>
    </Link>
  );
}

export default function Card({
  head,
  children,
  headData,
}: {
  headData?: {
    title: string;
    icon: ReactNode;
  };
  head?: ReactNode;
  children: ReactNode;
}) {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const $chevron = headRef.current?.querySelector(
      "#chevron-icon"
    ) as HTMLElement;
    if (!$chevron || !parentRef.current || !headRef.current) return;

    $chevron.style.transform = `rotate(${isOpen ? "180deg" : "90deg"})`;

    isOpen
      ? (parentRef.current.style.height = `calc(${headRef.current?.clientHeight}px + ${bodyRef.current?.clientHeight}px - 1px)`)
      : (parentRef.current.style.height = `calc(${headRef.current.clientHeight}px - 1px)`);
  }, [isOpen]);
  return (
    <section ref={parentRef} className={styles.option}>
      <div ref={headRef} onClick={() => setIsOpen(!isOpen)}>
        <SimpleCard data={headData} styled={false}>
          <div className={styles.head}>
            {head}
            <FontAwesomeIcon
              id="chevron-icon"
              className={styles["chevron"]}
              icon={faChevronUp}
            />
          </div>
        </SimpleCard>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.children} ref={bodyRef}>
        {children}
      </div>
    </section>
  );
}
