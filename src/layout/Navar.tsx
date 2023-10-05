import React, { ReactNode } from "react";
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
  navBtns,
}: {
  navBtns?: ReactNode[];
  setVisibility: any;
  title?: string | ReactNode;
}) {
  const router = useRouter();
  const canBack = router.asPath.split("/").length > 2;

  return (
    <nav className="w-full">
      <ul className="fixed z-30 top-0 w-full flex justify-between items-center p-3 border-b border-gray-300">
        <li
          className="flex cursor-pointer gap-2 text-xl items-center font-bold"
          onClick={() => router.back()}
        >
          {title && (
            <>
              {canBack && <FontAwesomeIcon size="xs" icon={faChevronLeft} />}
              <h1>{title}</h1>
            </>
          )}
        </li>
        <li className="flex gap-2 items-cente">
          {navBtns?.map((btn) => btn)}
          <CircleButton>
            <FontAwesomeIcon size="lg" icon={faMoon} />
          </CircleButton>
          <CircleButton onClick={() => setVisibility(true)}>
            <FontAwesomeIcon size="lg" icon={faBars} />
          </CircleButton>
        </li>
      </ul>
    </nav>
  );
}
