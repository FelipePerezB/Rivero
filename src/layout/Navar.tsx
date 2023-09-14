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
      <div id="wave" style={{ height: "150px", overflow: "hidden" }}>
        <svg
          // id="wave"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M-0.33,79.23 C181.94,97.93 313.43,26.08 501.35,92.02 L500.00,-0.00 L-0.00,-0.00 Z"
            style={{ stroke: "none", fill: "var(--primary-color)" }}
          ></path>
        </svg>
      </div>
      {/* <svg
        id="wave"
        // style="transform:rotate(180deg); transition: 0.3s"
        viewBox="0 0 1440 420"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(33, 106, 217, 1)" offset="0%"></stop>
            <stop stopColor="rgba(33, 106, 217, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          // style="transform:translate(0, 0px); opacity:1"
          fill="url(#sw-gradient-0)"
          d="M0,294L80,259C160,224,320,154,480,154C640,154,800,224,960,217C1120,210,1280,126,1440,126C1600,126,1760,210,1920,266C2080,322,2240,350,2400,322C2560,294,2720,210,2880,161C3040,112,3200,98,3360,140C3520,182,3680,280,3840,329C4000,378,4160,378,4320,371C4480,364,4640,350,4800,350C4960,350,5120,364,5280,308C5440,252,5600,126,5760,126C5920,126,6080,252,6240,294C6400,336,6560,294,6720,273C6880,252,7040,252,7200,273C7360,294,7520,336,7680,294C7840,252,8000,126,8160,63C8320,0,8480,0,8640,49C8800,98,8960,196,9120,203C9280,210,9440,126,9600,140C9760,154,9920,266,10080,259C10240,252,10400,126,10560,119C10720,112,10880,224,11040,287C11200,350,11360,364,11440,371L11520,378L11520,420L11440,420C11360,420,11200,420,11040,420C10880,420,10720,420,10560,420C10400,420,10240,420,10080,420C9920,420,9760,420,9600,420C9440,420,9280,420,9120,420C8960,420,8800,420,8640,420C8480,420,8320,420,8160,420C8000,420,7840,420,7680,420C7520,420,7360,420,7200,420C7040,420,6880,420,6720,420C6560,420,6400,420,6240,420C6080,420,5920,420,5760,420C5600,420,5440,420,5280,420C5120,420,4960,420,4800,420C4640,420,4480,420,4320,420C4160,420,4000,420,3840,420C3680,420,3520,420,3360,420C3200,420,3040,420,2880,420C2720,420,2560,420,2400,420C2240,420,2080,420,1920,420C1760,420,1600,420,1440,420C1280,420,1120,420,960,420C800,420,640,420,480,420C320,420,160,420,80,420L0,420Z"
        ></path>
      </svg> */}
      <ul>
        <li>
          {title && (
            <h1 className={styles.title}>
              {canBack && (
                <FontAwesomeIcon
                  onClick={() => router.back()}
                  size="xs"
                  icon={faChevronLeft}
                />
              )}
              {title}
            </h1>
          )}
        </li>
        <li className={styles.options}>
          {/* <UserButton /> */}
          {/* <FontAwesomeIcon className={styles.light} size="xl" icon={faMoon} /> */}
          <FontAwesomeIcon size="lg" icon={faBars} />
        </li>
      </ul>
    </nav>
  );
}
