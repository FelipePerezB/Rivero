import {
  faBars,
  faBoxOpen,
  faChevronLeft,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import NavSidebar from "./nav-sidebar";

export default function Navar() {
  return (
    <>
    <nav className="z-40 fixed top-0 left-0 flex items-center justify-between w-screen  py-3 px-5 bg-[#142433] text-white">
      <span className="flex items-center gap-1">
        <FontAwesomeIcon className="h-3.5 w-3.5" icon={faChevronLeft} />
        <h2 className="text-lg font-semibold ">Inicio</h2>
      </span>
      <ul className="flex gap-4 h-full justify-center items-center">
        <FontAwesomeIcon className="h-4 w-4" icon={faMoon} />
        <Link href={'?sidebar=nav'}>
          <FontAwesomeIcon className="h-4 w-4" icon={faBars} />
        </Link>
      </ul>
    </nav>
    </>
  );
}
