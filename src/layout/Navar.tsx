import React from "react";
import styles from "@styles/Navar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartSimple,
  faBars,
  faStar,
  faMoon,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Navar({
  setVisibility,
  title,
}: {
  setVisibility: any;
  title?: string;
}) {
  const router = useRouter();
  const canBack = router.asPath.split("/").length > 2;

  return (
    <nav className={styles.navar}>
      <div></div>
      <ul>
        <li>
          {title && (
            <h1 className={styles.title}>
              {canBack && <FontAwesomeIcon onClick={()=>router.back()} size="xs" icon={faChevronLeft} />}
              {title}
            </h1>
          )}
        </li>
        <li className={styles.options}>
          <UserButton />
          <FontAwesomeIcon className={styles.light} size="xl" icon={faMoon} />
          {/* <FontAwesomeIcon color="var(--black)" size="xl" icon={faBars} /> */}
        </li>
      </ul>
    </nav>
  );
}
