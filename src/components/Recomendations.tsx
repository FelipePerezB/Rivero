import React, { ReactNode } from "react";
import styles from "@styles/Recomendations.module.css";
import Link from "next/link";

export default function Recomendations({
  children,
  title,
  link
}: {
  children: ReactNode;
  title: string;
  link: string
}) {
  return (
    <>
      <section>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <Link href={link} className={styles["see-more"]}>Ver todas</Link>
        </div>
        {children}
      </section>
    </>
  );
}
