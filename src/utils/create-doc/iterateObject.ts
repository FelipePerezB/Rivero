import { Component } from "src/pages/docs/edit/[id]";

const iterateObj = (
  expectedId: string,
  obj: Component,
  callback?: (obj: Component, parent: Component) => void,
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
      const options = obj?.options;
      const children = options?.children;
      if (children && Array.isArray(children)) {
        let result;
        children.forEach((child) => {
          console.log(children)
          
          const childResult = iterateObj(expectedId, child, callback, depth);
          if (childResult) {
            result = childResult;
            callback && callback(childResult, obj);
            return result
          }
        });
      }
    }
  }
};

export default iterateObj;
