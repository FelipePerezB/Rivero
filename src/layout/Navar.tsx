import React from "react";
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
import CircleButton from "@components/button/circle-button/circle-button";

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
    <nav className="w-full">
      <ul className="fixed top-0 w-full justify-between items-center p-3 text-white">
        <svg
          id="wave"
          className="fixed top-0 left-0"
          viewBox="0 0 1440 270"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="var(--primary-color)"
            d="M0,27L80,49.5C160,72,320,117,480,130.5C640,144,800,126,960,103.5C1120,81,1280,54,1440,67.5C1600,81,1760,135,1920,130.5C2080,126,2240,63,2400,45C2560,27,2720,54,2880,81C3040,108,3200,135,3360,157.5C3520,180,3680,198,3840,207C4000,216,4160,216,4320,180C4480,144,4640,72,4800,49.5C4960,27,5120,54,5280,63C5440,72,5600,63,5760,67.5C5920,72,6080,90,6240,117C6400,144,6560,180,6720,171C6880,162,7040,108,7200,108C7360,108,7520,162,7680,180C7840,198,8000,180,8160,148.5C8320,117,8480,72,8640,76.5C8800,81,8960,135,9120,166.5C9280,198,9440,207,9600,175.5C9760,144,9920,72,10080,40.5C10240,9,10400,18,10560,36C10720,54,10880,81,11040,99C11200,117,11360,126,11440,130.5L11520,135L11520,270L11440,270C11360,270,11200,270,11040,270C10880,270,10720,270,10560,270C10400,270,10240,270,10080,270C9920,270,9760,270,9600,270C9440,270,9280,270,9120,270C8960,270,8800,270,8640,270C8480,270,8320,270,8160,270C8000,270,7840,270,7680,270C7520,270,7360,270,7200,270C7040,270,6880,270,6720,270C6560,270,6400,270,6240,270C6080,270,5920,270,5760,270C5600,270,5440,270,5280,270C5120,270,4960,270,4800,270C4640,270,4480,270,4320,270C4160,270,4000,270,3840,270C3680,270,3520,270,3360,270C3200,270,3040,270,2880,270C2720,270,2560,270,2400,270C2240,270,2080,270,1920,270C1760,270,1600,270,1440,270C1280,270,1120,270,960,270C800,270,640,270,480,270C320,270,160,270,80,270L0,270Z"
          ></path>
        </svg>
        {/* <li className="flex cursor-pointer gap-2 text-lg items-center">
          {title && (
            <>
              {canBack && (
                <FontAwesomeIcon
                  onClick={() => router.back()}
                  size="xs"
                  icon={faChevronLeft}
                />
              )}
              <h1>{title}</h1>
            </>
          )}
        </li> */}
        <li className="fixed left-0">
          <CircleButton onClick={() => setVisibility(true)}>
            <FontAwesomeIcon size="lg" icon={faBars} />
          </CircleButton>
        </li>
      </ul>
    </nav>
  );
}
