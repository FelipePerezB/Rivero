import { Component } from "../models/component";

const iterateObj = (
  expectedId: string,
  obj: Component,
  callback?: (obj: Component) => void,
  depth: number = 0
): Component | undefined => {
  const componentId = obj?.id as string;
  if (componentId) {
    const expectedIdChunks = expectedId.split("-");
    const ObjIdChunks = componentId.split("-");
    if (expectedIdChunks[depth] === ObjIdChunks[depth]) {
      console.log(componentId);
      if (componentId === expectedId) {
        callback && callback(obj);
        return obj;
      }
      const options = obj?.options;
      const children = options?.children;
      if (children && Array.isArray(children)) {
        let result;
        children.forEach((child) => {
          const childResult = iterateObj(expectedId, child, callback, depth);
          if (childResult) {
            result = childResult;
            return result;
          }
        });
      }
    }
  }
};

export default iterateObj;
