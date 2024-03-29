import { Component } from "../models/component";
import iterateObj from "./iterateObj";

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
