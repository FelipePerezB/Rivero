import { currentUser } from "@clerk/nextjs";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Role } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Navar() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  return (
    <header className="print:hidden z-40 sticky top-0 left-0">
      <nav className="flex items-center justify-between py-3 px-5 bg-white text-black border-b">
        <span></span>
        <Link
          prefetch={true}
          className="flex gap-3 items-center"
          href={role !== Role.STUDENT ? "?sidebar=nav" : "/profile"}
        >
          {user?.imageUrl ? (
            <div className="rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={26}
                height={26}
                alt="abrir menu"
                src={user?.imageUrl ?? ""}
              />
            </div>
          ) : (
            <FontAwesomeIcon className="w-4 h-4" icon={faBars} />
          )}
        </Link>
      </nav>
    </header>
  );
}