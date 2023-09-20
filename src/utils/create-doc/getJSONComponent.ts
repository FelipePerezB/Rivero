import { Component } from "src/pages/docs/edit/[id]";

const getJSONComponent = (
  expectedId: string,
  obj: Component,
  depth: number = 0
): Component | undefined => {
  const componentId = obj?.id as string;
  if (componentId) {
    const expectedIdChunks = expectedId.split("-");
    const ObjIdChunks = componentId.split("-");
    if (expectedIdChunks[depth] === ObjIdChunks[depth]) {
      if (componentId === expectedId) {
        return obj;
      }
      const options = obj?.options
      const children = options?.children
      if (children && Array.isArray(children)) {
        let result;
        children.forEach((child) => {
          const childResult = getJSONComponent(expectedId, child);
          if (childResult) {
            result = childResult;
          }
        });
        return result;
      }
    }
  }
};

export default getJSONComponent