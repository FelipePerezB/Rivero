import Link from "next/link";
import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartSimple,
  faChevronRight,
  faHome,
  faPlus,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Role } from "@prisma/client";
import SearchSidebar from "../sidebar/search-sidebar";
import NavLinks from "./nav-links";

export default async function NavSidebar() {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.log(error);
  }
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const role = user?.publicMetadata?.role as string | undefined;
  const organization = user?.publicMetadata?.organizationId as
    | string
    | undefined;
  return (
    <SearchSidebar id="nav">
      {firstName && (
        <section>
          <Link
            className="flex items-center gap-3  p-2 hover:bg-slate-100 rounded-md"
            href={"/profile"}
          >
            {imageUrl && (
              <Image
                width={100}
                height={100}
                alt="Perfil"
                className="w-10 h-10 rounded-full"
                src={imageUrl}
              />
            )}
            <div className="flex flex-col">
              <span className="text-lg">{`${firstName} ${lastName ?? ""}`}</span>
              <span className="text-xs border w-max p-0.5 rounded font-mediun">
                {role ?? Role.STUDENT}
              </span>
            </div>
          </Link>
          <hr className="my-2" />
        </section>
      )}
      <section>
        <NavLinks size="md"/>
        <div className="w-full absolute bottom-8 p-2">
          <span className="flex w-max items-center gap-2 hover:text-red-500">
            <FontAwesomeIcon className="w-4 h-4" icon={faSignOut} />
            <SignOutButton />
          </span>
        </div>
      </section>
    </SearchSidebar>
  );
}
