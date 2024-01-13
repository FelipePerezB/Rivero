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
  return (
    <menu
      className={` ${
        size === "md"
          ? "flex flex-col gap-2.5"
          : "md:flex hidden gap-4 overflow-x-auto"
      }`}
    >
      <Option
        size={size}
        icon={faHome}
        link="home"
        name="Asignaturas"
        paths={["/home", "/subjects", "/practice"]}
      />
      <Option
        size={size}
        icon={faFireFlameCurved}
        link=""
        name="Evaluaciones"
      />
      <Option
        size={size}
        icon={faChartSimple}
        link={
          role === Role.ADMIN
            ? "dashboard/organizations"
            : `dashboard/organizations/${organization}`
        }
        name="Dashboard"
      />
      {role === Role.ADMIN ? (
        <Option
          size={size}
          icon={faPlus}

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
