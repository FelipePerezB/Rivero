import { Privacity } from "@prisma/client";
import {
  Component,
  LessonWithComponent,
} from "src/app/documents/edit/models/component";
import { hydrateJSON } from "src/app/documents/edit/utils/hydrateJSON";

export default function fileTemplate({
  content,
  id,
  name = "Nuevo archivo",
}: {
  id: string;
  content: Component;
  name?: string;
}) {
  return {
    externalId: id,
    name,
    privacity: Privacity.PRIVATE,
    content: hydrateJSON(content),
  } as LessonWithComponent["file"];
}
