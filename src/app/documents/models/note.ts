import { File, Note } from "@prisma/client";

export interface NoteWithFile extends Note {
  File: File;
}