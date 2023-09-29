import React, { ReactNode } from "react";
import styles from "@styles/Recomendations.module.css";
import Link from "next/link";

export default function Recomendations({
  children,
  title,
  link,
  filters,
  setState,
}: {
  children: ReactNode;
  title?: string;
  link?: string;
  filters?: {
    text: string;
    value: string;
  }[];
  setState?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const type = link && title ? "row" : "column";

  const handleClick = () => {
    const { value } = document.querySelector(
      'input[name="filter"]:checked'
    ) as HTMLInputElement;
    setState && setState(value);
  };

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
        {type === "column" && filters?.length && (
          <fieldset className={styles.filter}>
            {filters?.map(({ text, value }, i) => (
              <label key={"filter: " + value}>
                <input
                  onChange={handleClick}
                  defaultChecked={!i}
                  type="radio"
                  name="filter"
                  value={value}
                />
                <span>{text}</span>
              </label>
            ))}
          </fieldset>
        )}
        <div className="flex flex-wrap justify-center gap-3">{children}</div>
      </section>
    </>
  );
}
