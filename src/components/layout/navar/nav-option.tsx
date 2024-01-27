"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Option = ({
  size,
  paths,
  name,
  link,
  icon,
}: {
  size: "sm" | "md";
  paths?: string[];
  name: string;
  link: string;
  icon?: FontAwesomeIconProps["icon"];
}) => {
  const pathname = usePathname();
  const active = paths?.some((path) => pathname?.includes(`${path}`));
  const showIcons = size === "md";

  return (
    <li>
      <Link
        className={`flex w-full items-center justify-between hover:font-normal ${
          active
            ? "bg-slate-100 text-blue-600 hover:bg-slate-200"
            : "hover:bg-gray-100/70"
        }  px-2  rounded-md cursor-pointe 
        ${showIcons ? "py-2" : "py-1.5"}
        `}
        href={"/" + link}
      >
        <span className="flex items-center gap-2">
          {icon && !!showIcons && (
            <FontAwesomeIcon className="w-4 h-4" icon={icon} />
          )}
          {name}
        </span>
        {icon && !!showIcons && (
          <FontAwesomeIcon className="w-3 h-3" icon={faChevronRight} />
        )}
      </Link>
    </li>
  );
};
