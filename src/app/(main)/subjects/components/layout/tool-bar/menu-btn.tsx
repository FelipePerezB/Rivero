import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";

export default function MenuBtn({ imageUrl }: { imageUrl?: string }) {
  return (
    <Item title="Menú">
      <Link href={"?sidebar=nav"}>
        {imageUrl ? (
          <div className="rounded-full overflow-hidden">
            <Image width={25} height={25} alt="abrir menu" src={imageUrl} />
          </div>
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </Link>
    </Item>
  );
}
