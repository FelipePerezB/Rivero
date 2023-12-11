import { Subject, Topic } from "@prisma/client";
import { NoteWithFile } from "./note";

export interface SubjectWithTopic extends Subject {
  Topics: Topic[];
  Notes: NoteWithFile[];
}