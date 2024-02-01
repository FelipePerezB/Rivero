"use client";
import Button, { ButtonAttrs } from "@components/common/buttons/button/button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export default function BackBtn({
  children,
  color,
}: {
  children: ReactNode;
  color?: ButtonAttrs["color"];
}) {
  const router = useRouter();
  return (
    <Button color={color} onClick={() => router.back()}>
      <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" /> {children}
    </Button>
  );
}
