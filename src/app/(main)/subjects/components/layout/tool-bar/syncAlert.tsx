import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SyncAlert({ isLocalFile }: { isLocalFile: boolean }) {
  return isLocalFile ? (
    <FontAwesomeIcon
      title="Sin conexión"
      className="h-4 w-4 text-red-500 animate-pulse cursor-pointer"
      icon={faWarning}
    />
  ) : (
    <></>
  );
}
