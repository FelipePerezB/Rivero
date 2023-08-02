import React from "react";
import createSchema from "./utils/createSchema";
// import getComponent from "./utils/getComponent";

export default function GetDoc({
  nodes,
  component,
}: {
  nodes: any;
  component: { type: string; options: any };
}) {
  const getComponent = createSchema(nodes); 
  return <>{getComponent(component?.type, component?.options)}</>;
}