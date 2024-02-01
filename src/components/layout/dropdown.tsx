"use client";
import { SignOutButton } from "@clerk/nextjs";
import Card from "@components/cards/Card";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";

export default function Dropdown({
  className,
  children,
  options,
}: {
  className?: string;
  children: ReactNode;
  options?: ReactNode[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`${className} relative cursor-pointer`}
      onClick={handleToggle}
    >
      {children}
      {isOpen ? (
        <div className="absolute bg-white top-full right-1 pt-2 z-50">
          <Card>
            <span className="flex w-max items-center gap-2 hover:text-red-500">
              <FontAwesomeIcon className="w-4 h-4" icon={faSignOut} />
              <SignOutButton />
            </span>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
