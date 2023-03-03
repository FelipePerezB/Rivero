import {
  faBook,
  faChartSimple,
  faHome,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "@styles/Var.module.css";
import { useRouter } from "next/router";

export default function Var({ state }: { state?: "only-nav" }) {
  const router = useRouter();
  const icons = [
    {
      link: "/",
      element: faHome,
    },
    {
      link: "/docs",
      element: faBook,
    },
    {
      link: "/ranking",
      element: faStar,
    },
    {
      link: "/stats",
      element: faChartSimple,
    },
  ];

  return (
    <>
      {state!=='only-nav' && (
        <ul className={styles.Var}>
          {icons.map((icon, i) => {      
            const link = '/' + router.pathname.split('/').at(1)
            const isActive = link === icon.link;
            return (
              <li key={icon.link + i}>
                <Link href={icon.link} passHref>
                  <FontAwesomeIcon
                    icon={icon.element}
                    className={isActive ? styles["icon--active"] : styles.icon}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
