import { Component } from "src/pages/docs/edit/[id]";
import generateRandomId from "../generateRandomId";

// Agrega ids al JSON de configuración del documento
export function hydrateJSON(
  obj: Component,
  parentId?: string
): Component {
  const options = obj?.options;
  if (options) {
    const newId = generateRandomId(4);
    // El id se genera en base a los ids de los elementos padres
    const id = parentId ? `${parentId}-${newId}` : newId;
    Object.assign(obj, { id: `${id}` });

    // Si el elemento tiene hijos le asigna ids de forma recursiva
    if (options?.children && Array.isArray(options.children)) {
      options.children.forEach((child) => {
        Object.assign(child, hydrateJSON(child, id));
      });
    }
  }
  return obj;
}