import { IdLenght } from "src/models/document.model";
import generateRandomId from "src/utils/generateRandomId";
import fileTemplate from "./file";

export default function practiceTemplate(id: string) {
  const content = {
    type: "practice",
    id: generateRandomId(IdLenght.sm),
    options: {
      maxTime: String(60 * 3),
      children: [
        {
          type: "question",
          id: generateRandomId(IdLenght.sm),
          options: {
            question: "¿Cual es la respuesta dw la pregunta 1?",
            alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
            expectedAns: "Alternativa 2",
            number: 1,
          },
        },
        {
          type: "question",
          id: generateRandomId(IdLenght.sm),
          options: {
            question: "¿Cual es la respuesta dw la pregunta 2?",
            alternatives: "Alternativa 1, Alternativa 2, Alternativa 3",
            expectedAns: "Alternativa 2",
            number: 2,
          },
        },
      ],
    },
  };
  return fileTemplate({ id, content, name: "Práctica" });
}
