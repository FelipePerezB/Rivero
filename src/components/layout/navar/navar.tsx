import { SignOutButton, currentUser } from "@clerk/nextjs";
import {
  faBars,
  faChevronRight,
  faCompass,
  faDraftingCompass,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";
import { User } from "@clerk/nextjs/dist/types/server";
import Dropdown from "../dropdown";
import React, { ReactNode } from "react";

export default async function Navar() {
  let user: User | null | undefined;
  try {
    user = await currentUser();
  } catch (error) {}
  const role = user?.publicMetadata?.role;
  const Profile = () => (
    <>
      <span>{user?.firstName} </span>
      {user?.imageUrl ? (
        <div className="rounded-full overflow-hidden h-7 w-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full w-full"
            alt="abrir menu"
            src={user?.imageUrl ?? ""}
          />
        </div>
      ) : (
        <FontAwesomeIcon className="w-4 h-4" icon={faBars} />
      )}
    </>
  );

  const SmProfileWrapper = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) =>
    role === Role.STUDENT ? (
      <Dropdown className={className}>{children}</Dropdown>
    ) : (
      <Link className={className} href={"?sidebar=nav"}>
        {children}
      </Link>
    );
  const SmProfile = () => (
    <SmProfileWrapper className="gap-3 items-center md:hidden flex">
      <Profile />
    </SmProfileWrapper>
  );
  return (
    <header className="print:hidden z-40 sticky top-0 left-0">
      <nav className="flex items-center justify-between py-3 px-5 bg-white text-black border-b gap-8 font-light">
        <Link
          href={"/home"}
          className="flex text-lg text-blue-500 items-center gap-1.5 font-medium"
        >
          <FontAwesomeIcon className="h-4 w-4" icon={faDraftingCompass} />
          RIVERO
        </Link>
        <menu className="md:flex hidden gap-4 overflow-x-auto">
          <NavLinks size="sm" />
        </menu>
        <div>
          <div className="md:block hidden">
            <Dropdown>
              <div className="gap-3 items-center flex ">
                <Profile />
              </div>
            </Dropdown>
          </div>
          <SmProfile />
        </div>
      </nav>
    </header>
  );
}
