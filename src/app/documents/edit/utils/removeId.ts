import { Component } from "../models/component";

function removeIdFromObject(obj: Component) {
  if ("id" in obj) {
    delete obj.id;
  }
  for (const child of obj.options.children || []) {
    removeIdFromObject(child);
  }
  return obj;
}

export function removeIdFromJson(jsonStr: string) {
  const jsonObj = JSON.parse(jsonStr);
  removeIdFromObject(jsonObj);

  return JSON.stringify(jsonObj);
}