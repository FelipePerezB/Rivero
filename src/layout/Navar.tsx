import React from "react";
import styles from "@styles/Navar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartSimple,
  faBars,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navar({
  setVisibility,
  title,
}: {
  setVisibility: any;
  title?: string;
}) {
  return (
    <nav className={styles.navar}>
      <div></div>
      <ul>
        <li>{title && <h1>{title}</h1>}</li>
        <li
          onClick={() => {
            setVisibility(true);
          }}
        >
          <FontAwesomeIcon color="var(--black)" size="xl" icon={faBars} />
        </li>
      </ul>
    </nav>
  );
}
