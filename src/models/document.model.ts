// import { Component } from "src/app/subjects/edit/models/component";
import { Privacity, Types } from "@prisma/client";
import { Component } from "src/app/documents/edit/models/component";
// import { Component } from "src/pages/docs/edit/[id]";

export type File = {
  privacity: Privacity;
  externalId: string;
  name: string;
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
