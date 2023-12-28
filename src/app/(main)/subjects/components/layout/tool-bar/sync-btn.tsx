import React from "react";
import toast from "react-hot-toast";
import { LessonWithComponent } from "src/app/documents/edit/models/component";
import { removeIdFromObject } from "src/app/documents/edit/utils/removeId";
import api from "src/utils/api";

export default function SyncBtn({
  settings,
}: {
  settings?: LessonWithComponent["file"];
}) {
  const sync = async () => {
    const { privacity, content, name, externalId } = settings ?? {};
    // const token = await getToken();
    toast.promise(
      api("files/" + externalId, {
        // headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({
          name,
          content: JSON.stringify(removeIdFromObject(content)),
          privacity,
        }),
      }),
      {
        error: "Error al sincronizar",
        loading: "Sincronizando",
        success: "¡Sincronizado correctamente!",
      }
    );
  };
  return (
    <span
      onClick={sync}
      className="text-xs cursor-pointer active:text-blue-500"
    >
      Sincronizar
    </span>
  );
}
