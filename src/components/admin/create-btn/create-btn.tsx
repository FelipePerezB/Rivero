'use client'
// import Button from "@components/buttons/button/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import create from "./create";
import Button, { ButtonAttrs } from "../../common/buttons/button/button";

export default function CreateBtn({
  endpoint,
  name,
  values,
  color,
  size = "sm",
}: {
  color?: ButtonAttrs['color'],
  endpoint: string;
  name?: string;
  values: { [key: string]: unknown };
  size?: "md" | "sm";
}) {
  // const router = useRouter();

  return (
    <Button
      onClick={() => {
        create(endpoint, values);
        // router.back();
      }}
      color={color}
      size={size == "md" ? "sm" : "xs"}
    >
      Crear {name}
      {!!(size === "sm") && (
        <FontAwesomeIcon
          icon={faPlus}
          className={size === "sm" ? "h-2 w-2" : "h-3 w-3"}
        />
      )}
    </Button>
  );
}
