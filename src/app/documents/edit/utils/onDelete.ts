import iterateObj from "src/utils/create-doc/iterateObject";
import { Component, ComponentOptions } from "../models/component";
// import iterateObj from "./iterateObj";

export type onDeleteProps = {
  id: string;
  page: Component;
};

const onDelete = ({ id, page }: onDeleteProps) => {
  iterateObj(id, page, (obj, parent: Component) => {
    parent.options.children = parent.options.children?.filter(
      (child) => child.id !== obj.id
    );
  });
};

export default onDelete;
