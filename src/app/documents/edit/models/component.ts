import { File, Lesson } from "@prisma/client";

export interface ComponentOptions {
  children?: Component[];
  [key: string]: unknown;
}

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}

type fileWithoutContent = Partial<Omit<File, "content">>;

export interface Component {
  type: string;
  id?: string;
  options: ComponentOptions;
}

export interface LessonWithComponent extends Partial<Lesson> {
  file: fileWithoutContent & { content: Component };
}
