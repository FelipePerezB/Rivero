import { ListTypeNode } from "graphql";
export type StandartInputAttrs = {
  attrs?: React.InputHTMLAttributes<[ListTypeNode, ListTypeNode]>;
  placeholder?: string;
  value?: string;
  name: string;
  dataKey?: string;
  onChange?: (value: { [key: string]: string }) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
};
