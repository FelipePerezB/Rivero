import { IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";
import fileTemplate from "./file";

export default function documentTemplate(id: string) {
  const content = {
    type: "document",
    id: generateRandomId(IdLenght.sm),
    options: {
      children: [
        {
          type: "section",
          id: generateRandomId(IdLenght.sm),
          options: {
            number: 1,
            children: [
              {
                type: "title",
                id: generateRandomId(IdLenght.sm),
                options: {
                  text: "Título 1",
                  size: "h1",
                },
              },
            ],
          },
        },
      ],
    },
  };
  return fileTemplate({ id, content, name: "Nuevo documento" });
}
