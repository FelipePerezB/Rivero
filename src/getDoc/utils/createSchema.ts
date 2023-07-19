import React from "react";
import getComponent from "./getComponent";

export default function createSchema(nodes: ((param: any) => void)[]) {
  return (type: string, options: any) => {
    const node = nodes.find((node)=>node.name.toLowerCase() === type.toLowerCase())
    return node && node(options)
  };
}
