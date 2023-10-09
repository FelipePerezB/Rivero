import { Component } from "../models/component";
import iterateObj from "./iterateObj";

export type onDeleteProps = {
  id: string;
  page: Component;
};

const onDelete = ({ id, page }: onDeleteProps) => {
  iterateObj(id, page, (obj, parent) => {
    parent.options.children = parent.options.children?.filter(
      (child) => child.id !== obj.id
    );
  });
};

export default onDelete;
