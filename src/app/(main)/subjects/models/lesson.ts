import { File, Lesson } from "@prisma/client";

export interface LessonWithFile extends Lesson {
  File: File;
}