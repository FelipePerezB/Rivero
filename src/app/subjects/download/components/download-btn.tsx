'use client'
import Button from "@components/Button";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DownloadBtn() {
  return (
    <Button
      onClick={() => window.print()}
      className="print:hidden fixed bottom-8 right-8 text-xl"
    >
      Descargar <FontAwesomeIcon className="w-4 h-4" icon={faFileDownload} />
    </Button>
  );
}
