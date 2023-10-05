import { Privacity, Types } from "src/gql/graphql";
import { Component } from "src/pages/docs/edit/[id]";

export type File = {
  privacity: Privacity;
  externalId: string;
  title: string;
  content: Component;
};

export type DocumentJSON = {
  file: File;
  type?: Types;
  subject?: string;
  subtopic?: string;
  topic?: string;
};

export enum IdLenght {
  sm = 4,
  lg = 32,
}
