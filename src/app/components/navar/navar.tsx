import { auth } from "@clerk/nextjs";
import CircleButton from "@components/button/circle-button/circle-button";
import {
  faBars,
  faBoxOpen,
  faChevronLeft,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Navar() {
  const {user} = auth();
  return (
    <nav className="z-40 fixed top-0 left-0 flex items-center justify-between w-screen  py-3 px-5 bg-[#142433] text-white">
      <span className="flex items-center gap-1">
        <FontAwesomeIcon className="h-3.5 w-3.5" icon={faChevronLeft} />
        <h2 className="text-lg font-semibold print:hidden">Inicio</h2>
      </span>
      <ul className="flex gap-4 h-full justify-center items-center">
        <FontAwesomeIcon className="h-4 w-4" icon={faMoon} />
        <Link href={"?sidebar=nav"}>
          {user?.imageUrl ? (
            <div className="rounded-full overflow-hidden">
              <Image
                width={25}
                height={25}
                alt="abrir menu"
                src={user?.imageUrl ?? ""}
              />
            </div>
          ) : (
            <FontAwesomeIcon className="w-4 h-4" icon={faBars} />
          )}
        </Link>
      </ul>
    </nav>
  );
}
