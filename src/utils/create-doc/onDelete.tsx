// import { Component } from "src/pages/docs/edit/[id]";
// import { Component } from "src/app/subjects/edit/models/component";
import { Component } from "src/app/documents/edit/models/component";
import iterateObj from "./iterateObject";

export type onDeleteProps = {
  id: string, page: Component
} 

const onDelete = ({id, page}: onDeleteProps) => {
  iterateObj(id, page, (obj, parent) => {
    parent.options.children = parent.options.children?.filter(
      (child) => child.id !== obj.id
    );
  });
};

export default onDelete