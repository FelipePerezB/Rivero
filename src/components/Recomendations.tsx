import React, { ReactNode } from "react";
import styles from "@styles/Recomendations.module.css";
import Link from "next/link";

export default function Recomendations({
  children,
  title,
  link,
}: {
  children: ReactNode;
  title?: string;
  link?: string;
  filters?: {
    text: string;
    value: string;
  }[];
}) {
  const type = link && title ? "row" : "column";

  return (
    <>
      <section className="flex flex-col gap-2">
        {link && type === "row" && (
          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>
            <Link href={link} className={styles["see-more"]}>
              Ver todas
            </Link>
          </div>
        )}
        <div className={styles.children}>
          {children}
        </div>
      </section>
    </>
  );
}
