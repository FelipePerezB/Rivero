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

export default function Navar({ setVisibility }: { setVisibility: any }) {
  return (
    <nav className={styles.navar}>
      <ul>
        <li
          onClick={() => {
            setVisibility(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} className={styles["navar__icon"]} />
        </li>
        <li>
          <Link className={styles.logo} href={"/"}>
            <FontAwesomeIcon
              icon={faChartSimple}
              className={styles["navar__icon"]}
            />
          </Link>
        </li>
        <li></li>
        {/* <li>
          <Link className={styles.stars} href={"/ranking"}>
              <span>50</span>
              <FontAwesomeIcon icon={faStar}/>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
