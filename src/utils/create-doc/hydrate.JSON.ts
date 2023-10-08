// import { Component } from "src/pages/docs/edit/[id]";

import { ComponentObj } from "src/app/components/edit-wraper/edit-wraper";
import generateRandomId from "../generateRandomId";

// Agrega ids al JSON de configuración del documento
export function hydrateJSON(
  initialId: string,
  obj: ComponentObj,
  parentId?: string,
  index?: number
): ComponentObj {
  const options = obj?.options;
  if (options) {
    let newId;
    if (typeof index === "number") {
      newId = index;
    } else if (!parentId && initialId) {
      newId = initialId.substring(0, 4);
    } else {
      newId = generateRandomId(4)
    }
    // El id se genera en base a los ids de los elementos padres
    const id = parentId ? `${parentId}-${newId}` : String(newId);
    Object.assign(obj, { id: `${id}` });

    // Si el elemento tiene hijos le asigna ids de forma recursiva
    if (options?.children && Array.isArray(options.children)) {
      options.children.forEach((child, i) => {
        Object.assign(child, hydrateJSON(initialId, child, id, i));
      });
    }
  }
  return obj;
}
