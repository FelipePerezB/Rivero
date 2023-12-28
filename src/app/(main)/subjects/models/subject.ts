import { Lesson, Subject, Topic } from "@prisma/client";
import { LessonWithFile } from "./lesson";
import { Count } from "@prisma/client/runtime/library";

export interface SubjectWithTopic extends Subject {
  Topics: Topic[];
  Lessons: LessonWithFile[];
  _count: {
    Lesson: number
  }
}