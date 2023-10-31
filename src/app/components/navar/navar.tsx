import { currentUser } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Navar() {
  // const user = await currentUser();
  // const role = user?.publicMetadata?.role;
  return (
    <nav className="z-40 fixed top-0 left-0 flex items-center justify-between w-screen  py-3 px-5 bg-white text-black border-b">
      <span></span>
      {/* <Link
        prefetch={true}
        className="flex gap-3 items-center"
        href={role !== Role.STUDENT ? "?sidebar=nav" : "/profile"}
      >
        {user?.imageUrl ? (
          <div className="rounded-full overflow-hidden">
            <Image
              width={26}
              height={26}
              alt="abrir menu"
              src={user?.imageUrl ?? ""}
            />
          </div>
        ) : (
          <FontAwesomeIcon className="w-4 h-4" icon={faBars} />
        )}
      </Link> */}
    </nav>
  );
}
