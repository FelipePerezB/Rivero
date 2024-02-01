import { currentUser } from "@clerk/nextjs";
import {
  faChartSimple,
  faChevronRight,
  faFireFlameCurved,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Option } from "./nav-option";
import { Role } from "@prisma/client";

type sizes = "sm" | "md";

export default async function NavLinks({ size = "sm" }: { size: sizes }) {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.log(error);
  }

  const role = user?.publicMetadata?.role as string | undefined;
  const organization = user?.publicMetadata?.organizationId as
    | string
    | undefined;
  const showOrganization =
    (organization && role !== Role.STUDENT) || role === Role.ADMIN;

  return (
    <menu
      className={` ${
        size === "md"
          ? "flex flex-col gap-2.5"
          : "md:flex hidden gap-4 overflow-x-auto"
      }`}
    >
      {role !== Role.STUDENT && (
        <Option
          size={size}
          icon={faHome}
          link="home"
          name="Asignaturas"
          paths={["/home", "/subjects", "/practice"]}
        />
      )}
      {!!showOrganization && (
        <Option
          size={size}
          icon={faChartSimple}
          paths={["organizations"]}
          link={
            role === Role.ADMIN
              ? "organizations"
              : `organizations/${organization}`
          }
          name="Institución"
        />
      )}
      {role === Role.ADMIN ? (
        <Option
          size={size}
          icon={faPlus}
          paths={["/documents"]}
          link="documents/edit"
          name="Documentos"
        />
      ) : (
        <></>
      )}
      {/* <Option paths={["/home", "/subjects"]} link="home" name="Asignaturas" />
      <Option link="" name="Evaluaciones" />
      <Option paths={['/organizations']} link="" name="Organización" />
      <Option paths={['/documents']} link="" name="Documentos" /> */}
    </menu>
  );
}
