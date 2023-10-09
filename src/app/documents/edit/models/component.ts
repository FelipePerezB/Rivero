import { File, Note } from "@prisma/client";

export interface ComponentOptions {
  children?: Component[];
  [key: string]: unknown;
}

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}

type fileWithoutContent = Omit<File, "content">;

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}

export interface NoteWithComponent extends Note {
  file: fileWithoutContent & { content: Component };
}
