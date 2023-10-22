import { Component } from "../models/component";

export function removeIdFromObject(obj: Component) {
  if ("id" in obj) {
    obj.id = obj.id?.split("-").at(-1);
  }
  for (const child of obj.options.children || []) {
    removeIdFromObject(child);
  }
  return obj;
}

// export function removeIdFromJson(json: Component) {
//   removeIdFromObject(json);

//   return JSON.stringify(json);
// }
