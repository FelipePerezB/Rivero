import { IconDefinition, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.css";
import Card from "@components/Card";

export default function AccordionCard({
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
        <Card data={headData} styled={false}>
          <div className={styles.head}>
            {head}
            <FontAwesomeIcon
              id="chevron-icon"
              className={styles.chevron}
              icon={faChevronUp}
            />
          </div>
        </Card>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.children} ref={bodyRef}>
        {children}
      </div>
    </section>
  );
}
