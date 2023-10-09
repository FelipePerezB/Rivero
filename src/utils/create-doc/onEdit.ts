import { Component } from "src/pages/docs/edit/[id]";
import iterateObj from "./iterateObject";

export type onEditProps = {
  id: string;
  page: Component;
  newProps: { [key: string]: unknown };
};

const onEdit = ({id, newProps, page}: onEditProps) => {
  iterateObj(
    id,
    page,
    (obj) => (obj.options = { ...obj.options, ...newProps })
  );
};

export default onEdit;