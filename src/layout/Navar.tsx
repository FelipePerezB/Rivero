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
      <ul className="fixed z-30 top-0 w-full bg-gray-800 flex justify-between items-center p-3 text-white">
        <li
          className="flex cursor-pointer gap-2 text-xl items-center font-semibold"
          onClick={() => router.back()}
        >
          {title && (
            <>
              {canBack && <FontAwesomeIcon size="xs" icon={faChevronLeft} />}
              <h1>{title}</h1>
            </>
          )}
        </li>
        <li className="text-white">
          <CircleButton onClick={() => setVisibility(true)}>
            <FontAwesomeIcon size="lg" icon={faBars} />
          </CircleButton>
        </li>
      </ul>
    </nav>
  );
}
